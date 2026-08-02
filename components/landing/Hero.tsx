'use client';

import React from 'react';
import { ArrowRight, Sparkles, Shield, Zap, FileText, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-purple-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-primary)]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-[var(--brand-primary)] text-xs font-semibold border border-purple-200 dark:border-purple-800 shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Claude Sonnet 4 Engine for College Students</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-[var(--font-jakarta)] leading-[1.15]">
            Master Any College Subject with <span className="bg-gradient-to-r from-[var(--brand-primary)] via-indigo-500 to-purple-400 bg-clip-text text-transparent">StudyMate AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            The AI-powered study assistant built on Anthropic Claude. Summarize long lecture PDFs, generate practice quizzes, master 3D flashcards, and debug complex code step-by-step.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-glow text-base px-8 py-3.5"
            >
              Start Studying Free
            </Button>
            <a href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                Explore All Features
              </Button>
            </a>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">4.9/5</span> from 12,000+ students
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Academic Integrity Protected</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto relative rounded-3xl glass-panel p-3 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-left font-mono text-xs text-slate-300 space-y-4">
            {/* Header bar of fake window */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-500 font-sans text-xs">studymate-ai.app/dashboard</span>
              </div>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-sans font-semibold">
                Claude Sonnet 4 Connected
              </span>
            </div>

            {/* Prompt preview */}
            <div className="space-y-3 font-sans">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-slate-200 flex items-start gap-3">
                <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Lecture_04_Data_Structures.pdf attached</span>
                  <p className="text-xs text-slate-400 mt-0.5">"Summarize the AVL tree rotation algorithms and generate 3 practice quiz questions."</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Claude Sonnet 4 Assistant</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Here is your structured summary and high-yield quiz:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-purple-200">
                  ⚡ <strong>Key Rule</strong>: An AVL tree balances itself whenever the height difference (balance factor) between left and right subtrees exceeds $|1|$.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
