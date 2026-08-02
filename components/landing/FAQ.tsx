'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which Anthropic Claude models does StudyMate AI support?',
      a: 'StudyMate AI supports Claude Sonnet 4 (default), Claude 3.5 Sonnet, and Claude 3 Haiku. You can switch models directly from the header dropdown at any time.',
    },
    {
      q: 'How does File Upload work with PDF, DOCX, and Image files?',
      a: 'You can drag-and-drop or select files directly in the chat or study tools. The application extracts text and image context securely and sends it with your prompt to Claude.',
    },
    {
      q: 'Does StudyMate AI work if I don\'t have an Anthropic API Key?',
      a: 'Yes! StudyMate AI features a built-in smart simulated streaming AI engine. If no ANTHROPIC_API_KEY is configured in your .env.local, you can test all features (chat, quizzes, flashcards, code explainer) offline out-of-the-box.',
    },
    {
      q: 'Is my chat history saved?',
      a: 'All chat sessions, quizzes, flashcards, and preferences are saved locally in your browser\'s LocalStorage. Your data remains private on your machine.',
    },
    {
      q: 'Is StudyMate AI compliant with academic integrity rules?',
      a: 'Absolutely. Features like Assignment Helper are specifically engineered to explain problem-solving logic and underlying theoretical frameworks without generating copy-paste solutions.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-[var(--brand-primary)] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
