'use client';

import React, { useState } from 'react';
import { Edit3, Sparkles, Shield, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const AssignmentHelperTool: React.FC = () => {
  const [promptText, setPromptText] = useState('');
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHelp = async () => {
    if (!promptText.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'assignment', promptText }),
      });
      if (res.ok) {
        const data = await res.json();
        setGuidance(data.result);
      } else {
        const sim = generateSimulatedResponse(promptText, undefined, 'assignment');
        setGuidance(sim.text);
      }
    } catch (e) {
      const sim = generateSimulatedResponse(promptText, undefined, 'assignment');
      setGuidance(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(guidance);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>Academic Integrity Assignment Helper</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Explains problem-solving logic and underlying theoretical frameworks without generating copy-paste answers.
        </p>
      </div>

      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 text-[var(--brand-primary)] text-xs font-semibold border border-purple-500/20">
          <Shield className="w-4 h-4 shrink-0" />
          <span>Academic Integrity Compliant: Provides logic outlines, pseudocode & mathematical proofs without direct homework solutions.</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assignment Problem / Prompt</label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Paste your assignment question or project prompt..."
            rows={5}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)] resize-none"
          />
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleHelp}
          isLoading={isLoading}
          disabled={!promptText.trim()}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Approach & Guidance
        </Button>
      </div>

      {guidance && (
        <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Step-by-Step Problem-Solving Framework
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Guidance'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans">
            <div className="whitespace-pre-wrap">{guidance}</div>
          </div>
        </div>
      )}
    </div>
  );
};
