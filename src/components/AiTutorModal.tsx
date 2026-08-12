import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, GraduationCap } from 'lucide-react';
import { ChatMessage, EducationDepth } from '../types';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  organContext?: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  organContext
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm **BioBot**, your AI Human Anatomy Tutor! 🧬\n\nI can explain any body part, physiological process, or weird body phenomenon! What would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [depthLevel, setDepthLevel] = useState<EducationDepth>('middle');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Send initial prompt if provided when opened
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          organContext: organContext || 'General Human Anatomy',
          depthLevel,
          chatHistory: messages.slice(-6)
        })
      });

      const data = await res.json();
      if (data.answer) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('Error talking to BioBot:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                BioBot AI Anatomy Tutor <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Context: <strong className="text-purple-300">{organContext || 'Human Body Fundamentals'}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Depth Selector Bar */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-purple-400" /> Target Depth:
          </span>
          <div className="flex gap-1">
            {[
              { id: 'elementary', label: '10y/o Fun' },
              { id: 'middle', label: 'Middle School' },
              { id: 'highschool', label: 'High School AP' },
              { id: 'college', label: 'College Bio' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setDepthLevel(lvl.id as EducationDepth)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  depthLevel === lvl.id
                    ? 'bg-purple-600 text-white font-bold shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className={`text-[9px] mt-1 text-right opacity-60 ${msg.role === 'user' ? 'text-purple-200' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-purple-400 font-medium bg-purple-950/30 p-3 rounded-xl border border-purple-500/20 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" /> BioBot is analyzing anatomical data...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggested Prompt Chips */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Try asking:</span>
          {[
            "Why do we blink?",
            "What happens during a brain freeze?",
            "Why does heart beat faster when scared?",
            "How do eyes see color?",
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask BioBot any question about the body..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
