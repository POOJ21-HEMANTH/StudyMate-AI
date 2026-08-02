'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  FileText,
  HelpCircle,
  Layers,
  Calendar,
  Baby,
  Edit3,
  Code2,
  Mic,
  Zap,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: 'Streaming Claude Chat & File Parsing',
      icon: MessageSquare,
      desc: 'Ask questions about PDF textbooks, DOCX slides, TXT files, and images in real time with auto-scroll and code syntax highlighting.',
      points: ['Support for PDF, DOCX, TXT, PNG, JPG', 'Suggested follow-up questions', 'Copy code & markdown formatting'],
      badge: 'Core Engine',
    },
    {
      title: 'Notes Summarizer',
      icon: FileText,
      desc: 'Paste lengthy chapter notes or lecture slides. Claude distills key formulas, bullet points, and definitions instantly.',
      points: ['Executive Summary mode', 'Formula extraction', 'Copy to clipboard or save to study notes'],
      badge: 'High Yield',
    },
    {
      title: 'Interactive Quiz Generator',
      icon: HelpCircle,
      desc: 'Generate customized Multiple Choice, True/False, and Short Answer quizzes with real-time score tracking and explanations.',
      points: ['Custom question counts', 'Instant grading & rationale', 'Wrong answer explanations'],
      badge: 'Active Recall',
    },
    {
      title: '3D Flip Flashcards',
      icon: Layers,
      desc: 'Transform any lecture topic into interactive 3D flip card decks. Tag cards as Mastered or Needs Review to optimize memory.',
      points: ['3D rotate animation', 'Mastery progress bar', 'Shuffle & active review mode'],
      badge: 'Memory Boost',
    },
    {
      title: 'Specialized AI Study Assistants',
      icon: Zap,
      desc: 'Dedicated tools for ELI5, Assignment Helper (plagiarism-free guidance), Multi-Language Code Explainer, and Interview Prep.',
      points: ['Explain Like I\'m 5 analogies', 'Code breakdown for Py, Java, C++, SQL', 'Behavioral & technical interview evaluation'],
      badge: 'Specialized',
    },
    {
      title: 'Study Schedule Planner',
      icon: Calendar,
      desc: 'Input exam dates, target subjects, and daily available study hours. AI builds a structured day-by-day checklist calendar.',
      points: ['Automated timeline generator', 'Subject prioritization', 'Progress tracking checklist'],
      badge: 'Productivity',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
            Everything You Need To Ace College
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)]">
            Supercharge Your Learning Curve
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Engineered with modern SaaS standards inspired by Notion AI, Perplexity, and Linear.
          </p>
        </div>

        {/* Grid of feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 hover:border-[var(--brand-primary)]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-[var(--brand-primary)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {feature.desc}
                  </p>
                </div>

                <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300">
                  {feature.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
