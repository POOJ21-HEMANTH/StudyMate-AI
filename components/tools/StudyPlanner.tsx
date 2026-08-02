'use client';

import React, { useState } from 'react';
import { Calendar, Sparkles, CheckSquare, Clock, Plus, Trash2, ArrowRight } from 'lucide-react';
import { StudyPlanItem } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export const StudyPlanner: React.FC = () => {
  const [examDate, setExamDate] = useState('2026-08-15');
  const [dailyHours, setDailyHours] = useState(4);
  const [subjectInput, setSubjectInput] = useState('');
  const [subjects, setSubjects] = useState<string[]>(['Data Structures & Algorithms', 'Operating Systems', 'Calculus III']);
  const [isLoading, setIsLoading] = useState(false);
  const [planItems, setPlanItems] = useState<StudyPlanItem[]>([
    {
      id: 'p1',
      date: 'Day 1 (Aug 3)',
      subject: 'Data Structures & Algorithms',
      topic: 'Binary Search Trees & AVL Rotations',
      hours: 2,
      completed: true,
      priority: 'high',
    },
    {
      id: 'p2',
      date: 'Day 1 (Aug 3)',
      subject: 'Operating Systems',
      topic: 'Process Synchronization & Semaphores',
      hours: 2,
      completed: false,
      priority: 'high',
    },
    {
      id: 'p3',
      date: 'Day 2 (Aug 4)',
      subject: 'Calculus III',
      topic: 'Partial Derivatives & Chain Rule',
      hours: 2,
      completed: false,
      priority: 'medium',
    },
    {
      id: 'p4',
      date: 'Day 2 (Aug 4)',
      subject: 'Data Structures & Algorithms',
      topic: 'Graph Traversal (BFS & DFS)',
      hours: 2,
      completed: false,
      priority: 'high',
    },
  ]);

  const addSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  const removeSubject = (sub: string) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  const handleGeneratePlan = async () => {
    if (subjects.length === 0) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examDate, dailyHours, subjects }),
      });
      if (res.ok) {
        const data = await res.json();
        setPlanItems(data.items);
      }
    } catch (e) {
      // Fallback generator
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = (id: string) => {
    setPlanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const totalHoursPlanned = planItems.reduce((acc, item) => acc + item.hours, 0);
  const completedItems = planItems.filter((i) => i.completed).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>Automated Study Schedule Planner</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Input your target exam date, subjects, and available daily hours. Claude builds a balanced schedule.
        </p>
      </div>

      {/* Input Form */}
      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Daily Study Hours</label>
            <input
              type="number"
              min={1}
              max={14}
              value={dailyHours}
              onChange={(e) => setDailyHours(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Subjects list */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Subjects</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSubject()}
              placeholder="Add subject (e.g. Physics II)..."
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <Button variant="outline" size="sm" onClick={addSubject} leftIcon={<Plus className="w-4 h-4" />}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {subjects.map((sub, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 text-[var(--brand-primary)] text-xs font-semibold border border-purple-500/20"
              >
                <span>{sub}</span>
                <button onClick={() => removeSubject(sub)} className="text-purple-400 hover:text-purple-600">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleGeneratePlan}
          isLoading={isLoading}
          disabled={subjects.length === 0}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Study Calendar
        </Button>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Generated Schedule Checklist ({completedItems} / {planItems.length} completed)
          </h4>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Total Planned: {totalHoursPlanned} hrs</span>
          </div>
        </div>

        <div className="space-y-3">
          {planItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleComplete(item.id)}
              className={`p-4 rounded-2xl glass-card border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                item.completed
                  ? 'border-emerald-500/30 bg-emerald-500/5 opacity-70 line-through'
                  : 'border-slate-200 dark:border-slate-800 hover:border-purple-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="w-4 h-4 rounded text-[var(--brand-primary)] focus:ring-0 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {item.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{item.topic}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-purple-400">{item.hours} hrs</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    item.priority === 'high'
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
