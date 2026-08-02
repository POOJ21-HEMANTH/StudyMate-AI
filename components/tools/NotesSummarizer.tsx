'use client';

import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const NotesSummarizer: React.FC = () => {
  const [rawNotes, setRawNotes] = useState('');
  const [formatStyle, setFormatStyle] = useState<'bullets' | 'executive' | 'formulas'>('bullets');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!rawNotes.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: rawNotes, style: formatStyle }),
      });
      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
      } else {
        throw new Error('API Fallback');
      }
    } catch (err) {
      // Smart Fallback
      const sim = generateSimulatedResponse(`Summarize notes format: ${formatStyle}`, rawNotes);
      setSummary(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>Notes & Lecture Summarizer</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Paste dense textbook chapters or slide text to extract high-yield summaries instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Box */}
        <div className="space-y-4 rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Paste Raw Notes
            </span>
            <div className="flex items-center gap-2 text-xs">
              <label className="text-slate-500 font-medium">Format:</label>
              <select
                value={formatStyle}
                onChange={(e) => setFormatStyle(e.target.value as any)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="bullets">Concise Bullet Points</option>
                <option value="executive">Executive Summary</option>
                <option value="formulas">Key Definitions & Formulas</option>
              </select>
            </div>
          </div>

          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="Paste your lecture notes, textbook passages, or slide transcripts here..."
            rows={12}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)] resize-none"
          />

          <Button
            variant="primary"
            size="md"
            onClick={handleSummarize}
            isLoading={isLoading}
            disabled={!rawNotes.trim()}
            className="w-full"
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Generate AI Summary
          </Button>
        </div>

        {/* Output Box */}
        <div className="space-y-4 rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Claude AI Summary
            </span>
            {summary && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto min-h-[250px] text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans space-y-2">
            {summary ? (
              <div className="whitespace-pre-wrap">{summary}</div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-2 p-6">
                <FileText className="w-10 h-10 opacity-30 text-[var(--brand-primary)]" />
                <p>Your AI-generated summary will appear here once you paste notes and click generate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
