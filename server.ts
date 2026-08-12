import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not set.");
    }
    return new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "BodyPractice.io API is running" });
  });

  app.post("/api/tutor/chat", async (req, res) => {
    try {
      const { prompt, organContext, depthLevel, chatHistory } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getAi();
      const depthPrompts: Record<string, string> = {
        elementary: "Explain like I'm 10 years old. Use fun analogies and simple terms without sacrificing factual accuracy.",
        middle: "Explain for a middle-school biology student. Balance clear terminology with intuitive real-world analogies.",
        highschool: "Explain for a high-school biology student. Include appropriate technical terms and physiological mechanisms.",
        college: "Explain with college-level biological precision, including relevant tissue, biochemical, neurological, or physiological mechanisms."
      };

      const systemInstruction = `You are BioBot, the educational anatomy and physiology tutor for BodyPractice.io.
${depthPrompts[depthLevel || "middle"] || depthPrompts["middle"]}
Current Organ/Topic Context: ${organContext || "General Human Anatomy and Physiology"}.

Accuracy rules:
- Prioritize established human anatomy and physiology over entertaining trivia.
- Do not invent statistics, prevalence figures, records, exact speeds, exact forces, or "fun facts".
- Avoid absolute claims such as "the only," "always," or "never" unless they are genuinely established and relevant exceptions have been considered.
- Distinguish simplified teaching models from literal anatomy or physiology.
- If evidence is uncertain, variable, debated, age-dependent, or measurement-dependent, say so explicitly rather than guessing.
- Correct a false premise in the student's question before answering it.
- Do not present educational information as a diagnosis or personalized medical advice.

Formatting guidelines:
- Use clear bullets and bold terms when helpful.
- When introducing a difficult anatomical term, provide a brief pronunciation guide.
- A "Did You Know?" item is optional and should be included only when it is a well-established fact; otherwise end with a useful review question.`;

      const contents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          contents.push(`${msg.role === "user" ? "Student" : "Tutor"}: ${msg.content}`);
        }
      }
      contents.push(`Student: ${prompt}`);

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents.join("\n"),
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error("Error in /api/tutor/chat:", error);
      res.status(500).json({ error: error.message || "Failed to query AI Tutor" });
    }
  });

  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const { topic, difficulty } = req.body;
      const ai = getAi();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Generate a 5-question multiple choice quiz for students on the topic: "${topic || "Human Eye and Vision"}". Difficulty level: ${difficulty || "Medium"}.`,
        config: {
          systemInstruction: `You are an anatomy and physiology exam writer for BodyPractice.io.
Use established human anatomy and physiology only. Do not invent statistics, records, exact force/speed claims, or trivia. Avoid ambiguous questions and absolutes unless scientifically justified. If a topic has normal biological variation, phrase the question so that variation does not make more than one answer defensible. Explanations must be factually consistent with the marked answer.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctAnswerIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    funFact: { type: Type.STRING },
                  },
                  required: ["id", "question", "options", "correctAnswerIndex", "explanation"],
                },
              },
            },
            required: ["title", "description", "questions"],
          },
        },
      });

      const quizData = JSON.parse(response.text || "{}");
      res.json(quizData);
    } catch (error: any) {
      console.error("Error generating quiz:", error);
      res.status(500).json({ error: error.message || "Failed to generate quiz" });
    }
  });

  app.post("/api/explain/analogy", async (req, res) => {
    try {
      const { structureName, functionDescription } = req.body;
      const ai = getAi();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Provide 3 creative real-world analogies to help a student understand the anatomical structure: "${structureName}" (Function: ${functionDescription}).`,
        config: {
          systemInstruction: `Create memorable teaching analogies for human anatomy and physiology. Each analogy must be clearly presented as an analogy, not literal anatomy. Preserve the supplied biological function accurately, do not add invented measurements or medical claims, and briefly state where the analogy stops being exact.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analogies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    analogy: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING },
                  },
                  required: ["title", "analogy", "whyItWorks"],
                },
              },
            },
            required: ["analogies"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Error generating analogy:", error);
      res.status(500).json({ error: error.message || "Failed to generate analogy" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BodyPractice.io server running on http://localhost:${PORT}`);
  });
}

startServer();