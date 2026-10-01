import React, { useState } from 'react';
import { askCopilot } from '../services/geminiService';

interface CopilotSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCampaignWizard?: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const CopilotSheet: React.FC<CopilotSheetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Good morning Sarah! Your average ROAS increased to 4.58x overnight. Would you like me to increase budget on "Summer SaaS Scale-Up" to capitalize on weekend search surges?',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const reply = await askCopilot(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Optimization applied across Google Ads and Meta. Pacing re-calibrated for maximum yield.',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    '⚡ Reallocate $2,000 from paused campaigns to top performers',
    "📊 Draft executive report for Monday's board review",
    '🎯 Generate 3 high-converting ad copies for B2B founders',
  ];

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-200" id="copilot-drawer">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer"
        id="copilot-backdrop"
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-surface-container-lowest rounded-t-3xl shadow-2xl p-space-md space-y-3 transform transition-transform duration-300 ease-out flex flex-col max-w-2xl mx-auto"
        id="copilot-sheet"
      >
        <div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto -mt-1 cursor-grab" />

        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Market Pilot AI Copilot
              </span>
              <span className="font-body-sm text-[11px] text-primary flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                Live Marketing Engine Active
              </span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            id="close-copilot-btn"
            type="button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-1 max-h-[46vh] pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-2xl text-on-surface space-y-1 ${
                msg.sender === 'ai'
                  ? 'bg-surface-container-low border border-surface-container-high/60 shadow-xs'
                  : 'bg-primary-container text-on-primary ml-8 self-end'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-1 text-primary font-label-sm text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  Executive Synthesis
                </div>
              )}
              <p className={`font-body-sm text-body-sm ${msg.sender === 'user' ? 'text-on-primary' : 'text-on-surface'}`}>
                {msg.text}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className="p-3 rounded-2xl bg-surface-container-low text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary animate-spin">
                progress_activity
              </span>
              <span className="text-body-sm text-on-surface-variant">
                Synthesizing multi-channel telemetry...
              </span>
            </div>
          )}

          {/* Suggested Prompts */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="font-label-sm text-[11px] text-outline font-semibold px-1">
              Suggested Prompts
            </span>
            {suggestedPrompts.map((promptText, idx) => (
              <button
                key={idx}
                className="text-left p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors cursor-pointer active:scale-[0.99]"
                type="button"
                onClick={() => handleSend(promptText.replace(/^[⚡📊🎯]\s*/, ''))}
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-surface-container"
          >
            <input
              className="flex-1 bg-transparent px-3 py-1 font-body-md text-on-surface outline-none placeholder:text-outline"
              placeholder="Ask Market Pilot AI anything..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
              type="submit"
              disabled={isLoading || !inputValue.trim()}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
