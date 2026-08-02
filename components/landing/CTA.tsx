'use client';

import React from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CTAProps {
  onLaunch: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onLaunch }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[var(--brand-primary)] to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-glow">
          <BookOpen className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[var(--font-jakarta)] leading-tight">
          Ready to Elevate Your Academic GPA?
        </h2>

        <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto">
          Join thousands of college students using Claude Sonnet 4 to summarize slides, run active recall quizzes, and master complex code.
        </p>

        <div className="pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={onLaunch}
            rightIcon={<ArrowRight className="w-5 h-5 text-[var(--brand-primary)]" />}
            className="bg-white text-[var(--brand-primary)] hover:bg-slate-100 font-bold px-8 py-3.5 shadow-xl text-base"
          >
            Launch StudyMate Assistant Now
          </Button>
        </div>
      </div>
    </section>
  );
};
