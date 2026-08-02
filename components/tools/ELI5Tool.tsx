'use client';

import React, { useState } from 'react';
import { Baby, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const ELI5Tool: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'eli5', topic }),
      });
      if (res.ok) {
        const data = await res.json();
        setExplanation(data.result);
      } else {
        const sim = generateSimulatedResponse(topic, undefined, 'eli5');
        setExplanation(sim.text);
      }
    } catch (e) {
      const sim = generateSimulatedResponse(topic, undefined, 'eli5');
      setExplanation(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(explanation);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Baby className="w-5 h-5 text-purple-400" />
          <span>Explain Like I'm 5 (ELI5)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simplifies dense academic theories, equations, or jargon into intuitive real-world analogies.
        </p>
      </div>

      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Complex Topic or Concept</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Quantum Entanglement, TCP/IP Handshake, Fourier Transform..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleExplain}
          isLoading={isLoading}
          disabled={!topic.trim()}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Simplify Concept (ELI5)
        </Button>
      </div>

      {explanation && (
        <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Intuitive Analogy Explanation
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Analogy'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans">
            <div className="whitespace-pre-wrap">{explanation}</div>
          </div>
        </div>
      )}
    </div>
  );
};
