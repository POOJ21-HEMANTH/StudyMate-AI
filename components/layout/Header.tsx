'use client';

import React from 'react';
import {
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Home,
  User,
} from 'lucide-react';
import { ClaudeModel, ActiveTab } from '@/lib/types';
import { MODEL_NAMES } from '@/lib/anthropic';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  activeTab: ActiveTab;
  selectedModel: ClaudeModel;
  onSelectModel: (model: ClaudeModel) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  selectedModel,
  onSelectModel,
  darkMode,
  onToggleTheme,
  onGoHome,
}) => {
  const [modelDropdownOpen, setModelDropdownOpen] = React.useState(false);

  const tabTitles: Record<ActiveTab, { title: string; subtitle: string }> = {
    analytics: { title: 'Analytics Dashboard', subtitle: 'Overview of study activity, quizzes & usage' },
    chat: { title: 'AI Study Chat', subtitle: 'Powered by Claude Sonnet 4 with multi-format file analysis' },
    summarizer: { title: 'Notes Summarizer', subtitle: 'Extract key formulas, bullet points, & definitions' },
    quiz: { title: 'Interactive Quiz Generator', subtitle: 'Generate MCQs, True/False & Short Answer questions' },
    flashcards: { title: 'Flashcards Deck', subtitle: 'Interactive 3D flip card active recall practice' },
    planner: { title: 'Study Schedule Planner', subtitle: 'Custom day-by-day exam preparation calendar' },
    eli5: { title: 'Explain Like I\'m 5 (ELI5)', subtitle: 'Simplifies difficult academic concepts using analogies' },
    assignment: { title: 'Assignment Logic Helper', subtitle: 'Guides your homework approach without plagiarism' },
    code: { title: 'Multi-Language Code Explainer', subtitle: 'Analyzes Python, Java, C, C++, JS, and SQL code' },
    interview: { title: 'Interview Preparation', subtitle: 'Technical & behavioral questions with AI scoring' },
    revision: { title: 'Exam Revision Mode', subtitle: 'Last-minute high-yield cheat sheets & definitions' },
    settings: { title: 'Settings & Preferences', subtitle: 'Customize themes, font sizes, data exports, & models' },
  };

  const currentTabInfo = tabTitles[activeTab] || { title: 'StudyMate AI', subtitle: 'AI College Assistant' };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Title */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
          {currentTabInfo.title}
        </h2>
        <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
          {currentTabInfo.subtitle}
        </p>
      </div>

      {/* Controls Header */}
      <div className="flex items-center gap-3">
        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span>{MODEL_NAMES[selectedModel].name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {modelDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel p-2 shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Anthropic Engine
                </span>
              </div>
              {(Object.keys(MODEL_NAMES) as ClaudeModel[]).map((modelKey) => {
                const info = MODEL_NAMES[modelKey];
                const isSelected = selectedModel === modelKey;
                return (
                  <button
                    key={modelKey}
                    onClick={() => {
                      onSelectModel(modelKey);
                      setModelDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col gap-0.5 ${
                      isSelected
                        ? 'bg-[var(--brand-primary)] text-white shadow-glow'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{info.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                        {info.badge}
                      </span>
                    </div>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {info.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* API Ready Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>API Connected</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Landing Page Nav */}
        <button
          onClick={onGoHome}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Return to Landing Page"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
