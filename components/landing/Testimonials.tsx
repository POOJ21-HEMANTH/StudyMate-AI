'use client';

import React from 'react';
import { Star, GraduationCap, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Junior @ Stanford',
      text: 'StudyMate AI cut my exam revision time in half. Being able to upload code slides and get instant step-by-step logic explanations powered by Claude is a game changer.',
      rating: 5,
    },
    {
      name: 'Marcus Vance',
      role: 'Pre-Med Student @ NYU',
      text: 'The 3D Flashcards and Quiz Generator are incredible. I pasted 50 pages of Organic Chemistry notes and had a 20-question practice test ready in 10 seconds.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Economics Major @ MIT',
      text: 'The Study Planner mapped out my entire finals week based on my available hours. I felt 100% prepared and stress-free.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
            Student Proof
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)]">
            Loved by Students Across Top Universities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-[var(--brand-primary)]/20 absolute top-4 right-4" />
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--brand-primary)] to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-purple-400" />
                    <span>{t.role}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
