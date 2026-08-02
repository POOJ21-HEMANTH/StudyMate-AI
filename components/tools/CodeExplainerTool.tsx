'use client';

import React, { useState } from 'react';
import { Code2, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const CodeExplainerTool: React.FC = () => {
  const [language, setLanguage] = useState('python');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplainCode = async () => {
    if (!codeSnippet.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'code', language, codeSnippet }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data.result);
      } else {
        const sim = generateSimulatedResponse(codeSnippet, undefined, 'code');
        setAnalysis(sim.text);
      }
    } catch (e) {
      const sim = generateSimulatedResponse(codeSnippet, undefined, 'code');
      setAnalysis(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(analysis);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span>Multi-Language Code Explainer & Optimizer</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Line-by-line algorithm analysis, time/space complexity, and common bug warnings for Python, Java, C, C++, JS, and SQL.
        </p>
      </div>

      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Select Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        <textarea
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          placeholder={`Paste your ${language.toUpperCase()} code snippet here...`}
          rows={8}
          className="w-full bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-[var(--brand-primary)] resize-none"
        />

        <Button
          variant="primary"
          size="md"
          onClick={handleExplainCode}
          isLoading={isLoading}
          disabled={!codeSnippet.trim()}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Analyze Code & Complexity
        </Button>
      </div>

      {analysis && (
        <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Claude Code Analysis & Breakdown
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Analysis'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans">
            <div className="whitespace-pre-wrap">{analysis}</div>
          </div>
        </div>
      )}
    </div>
  );
};
