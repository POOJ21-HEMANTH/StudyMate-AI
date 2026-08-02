'use client';

import React from 'react';
import { Sparkles, Sun, Moon, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onLaunchApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme, onLaunchApp }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchApp}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--brand-primary)] to-indigo-500 flex items-center justify-center text-white shadow-glow">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-[var(--font-jakarta)]">
              StudyMate <span className="text-[var(--brand-primary)]">AI</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-purple-100 dark:bg-purple-950/80 text-[var(--brand-primary)] rounded-full border border-purple-200 dark:border-purple-800">
              Claude Sonnet 4
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-[var(--brand-primary)] transition-colors">Features</a>
          <a href="#tools" className="hover:text-[var(--brand-primary)] transition-colors">AI Study Tools</a>
          <a href="#testimonials" className="hover:text-[var(--brand-primary)] transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-[var(--brand-primary)] transition-colors">FAQ</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={onLaunchApp}
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onLaunchApp}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Launch Assistant
          </Button>
        </div>
      </div>
    </header>
  );
};
