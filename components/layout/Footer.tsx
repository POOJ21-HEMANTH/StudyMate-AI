'use client';

import React from 'react';
import { BookOpen, Github, Twitter, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                StudyMate AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The AI-powered study assistant built for college students using Anthropic Claude.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Study Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Notes Summarizer</li>
              <li>Quiz & MCQ Generator</li>
              <li>3D Flashcards</li>
              <li>Study Schedule Planner</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Specialized AI
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Explain Like I'm 5 (ELI5)</li>
              <li>Assignment Logic Helper</li>
              <li>Code Explainer (Py, Java, C++)</li>
              <li>Interview Preparation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Anthropic Claude
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Claude Sonnet 4</li>
              <li>Claude 3.5 Sonnet</li>
              <li>Claude 3 Haiku</li>
              <li>Server-Side API Security</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} StudyMate AI. Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for college students worldwide.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <div className="flex items-center gap-3 ml-2">
              <Github className="w-4 h-4 cursor-pointer hover:text-slate-800 dark:hover:text-white transition" />
              <Twitter className="w-4 h-4 cursor-pointer hover:text-slate-800 dark:hover:text-white transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
