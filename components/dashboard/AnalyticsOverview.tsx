'use client';

import React from 'react';
import {
  MessageSquare,
  FileText,
  HelpCircle,
  Layers,
  Calendar,
  Zap,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { AnalyticsStats, ActiveTab } from '@/lib/types';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';

interface AnalyticsOverviewProps {
  stats: AnalyticsStats;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ stats, onNavigateTab }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-primary)] to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Academic Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-jakarta)]">
              Welcome back, Student! 🎓
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
              Here is your active learning velocity, study hours planned, and recent quiz scores across all subjects.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigateTab('chat')}
            rightIcon={<ArrowUpRight className="w-4 h-4 text-[var(--brand-primary)]" />}
            className="bg-white text-[var(--brand-primary)] hover:bg-slate-100 font-bold shrink-0 shadow-md"
          >
            Start New AI Session
          </Button>
        </div>
      </div>

      {/* Grid of 6 Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total AI Study Chats"
          value={stats.totalChats}
          change="+18% this week"
          icon={MessageSquare}
          color="from-purple-500 to-indigo-600"
          description="Multi-turn Claude conversations"
        />
        <StatCard
          title="Notes Summarized"
          value={stats.notesSummarized}
          change="+24% this week"
          icon={FileText}
          color="from-blue-500 to-cyan-600"
          description="Bullet point & formula extractions"
        />
        <StatCard
          title="Quizzes Generated"
          value={stats.quizzesGenerated}
          change="+30% this week"
          icon={HelpCircle}
          color="from-emerald-500 to-teal-600"
          description="MCQs & Short answer sets"
        />
        <StatCard
          title="Flashcards Created"
          value={stats.flashcardsCreated}
          change="+45 active cards"
          icon={Layers}
          color="from-amber-500 to-orange-600"
          description="3D flip active recall cards"
        />
        <StatCard
          title="Study Hours Planned"
          value={`${stats.studyHoursPlanned} hrs`}
          change="On track for finals"
          icon={Calendar}
          color="from-rose-500 to-pink-600"
          description="Scheduled calendar checklists"
        />
        <StatCard
          title="Daily AI Queries"
          value={stats.dailyAiQueries}
          change="Claude Sonnet 4 Active"
          icon={Zap}
          color="from-indigo-600 to-purple-800"
          description="Real-time response velocity"
        />
      </div>

      {/* Quick Access Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Quick Launcher — AI Study Tools
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Click to open tool</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 'summarizer' as ActiveTab, title: 'Summarizer', icon: FileText, desc: 'Distill lecture slides' },
            { id: 'quiz' as ActiveTab, title: 'Quiz Engine', icon: HelpCircle, desc: 'MCQs & T/F questions' },
            { id: 'flashcards' as ActiveTab, title: '3D Flashcards', icon: Layers, desc: 'Active recall cards' },
            { id: 'planner' as ActiveTab, title: 'Study Planner', icon: Calendar, desc: 'Schedule calendar' },
            { id: 'eli5' as ActiveTab, title: 'ELI5 Mode', icon: Sparkles, desc: 'Simple analogies' },
            { id: 'code' as ActiveTab, title: 'Code Explainer', icon: Zap, desc: 'Python, C++, SQL' },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onNavigateTab(tool.id)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-[var(--brand-primary)] transition text-center space-y-2 group"
              >
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-[var(--brand-primary)] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{tool.title}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{tool.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
