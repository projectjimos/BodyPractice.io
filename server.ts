import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazy/server-side
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

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Human Body Fundamentals API is running" });
  });

  // AI Anatomy Tutor Endpoint
  app.post("/api/tutor/chat", async (req, res) => {
    try {
      const { prompt, organContext, depthLevel, chatHistory } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getAi();
      const depthPrompts: Record<string, string> = {
        elementary: "Explain like I'm 10 years old. Use fun analogies, simple terms, and engaging enthusiasm.",
        middle: "Explain for a Middle School biology student. Balance clear terminology with intuitive real-world analogies.",
        highschool: "Explain for a High School AP Biology student. Include technical terms, cellular/physiological mechanisms, and structural functions.",
        college: "Explain with college-level biological precision, referencing biochemistry, tissue layers, and neurological/physiological pathways."
      };

      const systemInstruction = `You are BioBot, a friendly, passionate, and highly knowledgeable Human Anatomy and Physiology Tutor for students. 
${depthPrompts[depthLevel || "middle"] || depthPrompts["middle"]}
Current Organ/Topic Context: ${organContext || "General Human Body Fundamentals"}.
Formatting Guidelines:
- Use clear bullet points and bold terms for readability.
- When introducing a anatomical term, provide a quick pronunciation guide in parentheses if tricky (e.g. Occipital [ok-SIP-i-tul]).
- End responses with an interesting "Did You Know?" fun fact or a short thought-provoking question to encourage curiosity.`;

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
          temperature: 0.7,
        },
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error("Error in /api/tutor/chat:", error);
      res.status(500).json({ error: error.message || "Failed to query AI Tutor" });
    }
  });

  // Generate Custom Quiz Endpoint
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const { topic, difficulty } = req.body;
      const ai = getAi();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Generate a 5-question multiple choice quiz for students on the topic: "${topic || "Human Eye and Vision"}". Difficulty level: ${difficulty || "Medium"}.`,
        config: {
          systemInstruction: "You are an anatomy exam writer. Produce clear, educational questions that test understanding of structure, function, and physiological processes.",
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

  // Generate Fun Analogy Endpoint
  app.post("/api/explain/analogy", async (req, res) => {
    try {
      const { structureName, functionDescription } = req.body;
      const ai = getAi();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Provide 3 creative real-world analogies (e.g., comparing to everyday objects, technology, or buildings) to help students instantly understand the anatomical structure: "${structureName}" (Function: ${functionDescription}).`,
        config: {
          systemInstruction: "Create vivid, relatable analogies that build memorable visual mental models for biology students.",
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

  // Vite middleware for development
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
    console.log(`Human Body Fundamentals server running on http://localhost:${PORT}`);
  });
}

startServer();
