'use client';

import React from 'react';
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  Layers,
  Target,
  Code2,
  Calculator,
} from 'lucide-react';

interface PromptCardsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const PromptCards: React.FC<PromptCardsProps> = ({ onSelectPrompt }) => {
  const cards = [
    {
      icon: BookOpen,
      title: 'Summarize my notes',
      desc: 'Distill lecture slides into concise bullet points & formulas',
      prompt: 'Summarize my lecture notes into concise bullet points, key definitions, and essential exam formulas.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: HelpCircle,
      title: 'Generate quiz questions',
      desc: 'Create Multiple Choice and True/False practice questions',
      prompt: 'Generate 5 Multiple Choice Quiz questions with detailed answer explanations on my study topic.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Lightbulb,
      title: 'Explain difficult concepts',
      desc: 'Break down complex academic theories using simple analogies',
      prompt: 'Explain the core principles of this concept step-by-step as if I were a beginner student.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Layers,
      title: 'Create flashcards',
      desc: 'Generate front/back flashcard study decks for active recall',
      prompt: 'Create 8 active recall flashcards with clear front questions and detailed back answers.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: Target,
      title: 'Help me study for exams',
      desc: 'High-yield exam review & key pitfalls to avoid',
      prompt: 'Help me prepare for my upcoming exam by listing the top high-yield topics and common test traps.',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: Code2,
      title: 'Explain code',
      desc: 'Line-by-line breakdown for Python, Java, C++, JS, and SQL',
      prompt: 'Analyze this code snippet, explain how it works line-by-line, and state time/space complexity.',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: Calculator,
      title: 'Solve math problems',
      desc: 'Step-by-step mathematical proof & equation breakdown',
      prompt: 'Break down the step-by-step mathematical solution and formula derivation for this problem.',
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)]">
          How can StudyMate AI assist your learning today?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select a quick prompt card or upload your study documents below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(card.prompt)}
              className="text-left p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800/80 hover:border-[var(--brand-primary)] hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${card.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-[var(--brand-primary)] transition-colors">
                  {card.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {card.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
