'use client';

import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change = '+12% this week',
  icon: Icon,
  color = 'from-purple-500 to-indigo-600',
  description,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 hover:border-[var(--brand-primary)]/40 transition-all duration-300 group">
      {/* Subtle background glow */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-[var(--brand-primary)]/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={cn('p-2.5 rounded-xl text-white bg-gradient-to-br shadow-md', color)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>
      </div>

      <div className="mt-2 flex items-center text-xs font-medium text-emerald-500 gap-1">
        <TrendingUp className="w-3.5 h-3.5" />
        <span>{change}</span>
        {description && <span className="text-slate-400 font-normal ml-1">• {description}</span>}
      </div>
    </div>
  );
};
