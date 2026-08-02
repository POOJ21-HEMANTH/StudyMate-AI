'use client';

import React, { useState } from 'react';
import { Zap, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const ExamRevisionTool: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [revisionNotes, setRevisionNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateRevision = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'revision', topic }),
      });
      if (res.ok) {
        const data = await res.json();
        setRevisionNotes(data.result);
      } else {
        const sim = generateSimulatedResponse(topic, undefined, 'revision');
        setRevisionNotes(sim.text);
      }
    } catch (e) {
      const sim = generateSimulatedResponse(topic, undefined, 'revision');
      setRevisionNotes(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(revisionNotes);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Last-Minute Exam Revision Mode</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Generates high-yield cheat sheets, must-know definitions, key formulas, and common exam pitfalls to avoid.
        </p>
      </div>

      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Course / Exam Subject</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Database Systems, Linear Algebra, Organic Chemistry..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleGenerateRevision}
          isLoading={isLoading}
          disabled={!topic.trim()}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate High-Yield Revision Sheet
        </Button>
      </div>

      {revisionNotes && (
        <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              ⚡ High-Yield Revision Sheet
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Sheet'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans">
            <div className="whitespace-pre-wrap">{revisionNotes}</div>
          </div>
        </div>
      )}
    </div>
  );
};
