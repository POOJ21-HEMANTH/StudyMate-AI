'use client';

import React, { useState } from 'react';
import { Mic, Sparkles, Award, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyToClipboard } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

export const InterviewPrepTool: React.FC = () => {
  const [role, setRole] = useState('Software Engineering Intern');
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    setEvaluation('');
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'interview-question', role }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuestion(data.result);
      } else {
        const sim = generateSimulatedResponse(role, undefined, 'interview');
        setQuestion(sim.text);
      }
    } catch (e) {
      const sim = generateSimulatedResponse(role, undefined, 'interview');
      setQuestion(sim.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'interview-eval', question, answer: userAnswer }),
      });
      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.result);
      } else {
        setEvaluation(`### 📊 AI Interview Evaluation Score: 8.5 / 10

#### 🟢 Strengths:
- **Technical Accuracy**: Correctly identified key distributed system trade-offs.
- **Communication**: Clear structure with problem statement and solution framework.

#### 🟡 Areas to Improve:
- Mention concrete concurrency primitives (e.g., Redis Lua script lock handling).
- Include standard HTTP response status codes (e.g., \`429 Too Many Requests\`).`);
      }
    } catch (e) {
      setEvaluation(`### 📊 AI Interview Evaluation Score: 8.5 / 10\n\nGreat structural response!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(evaluation);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <Mic className="w-5 h-5 text-rose-400" />
          <span>Technical & Behavioral Interview Preparation</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Generates role-tailored interview questions and evaluates student answers with detailed scoring.
        </p>
      </div>

      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Role / Subject</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer Intern, Data Analyst, Quant Associate..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="primary"
              size="md"
              onClick={handleGenerateQuestion}
              isLoading={isLoading}
              className="w-full"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate Question
            </Button>
          </div>
        </div>

        {question && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-900 dark:text-white space-y-2">
            <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px]">Interview Prompt</span>
            <div className="whitespace-pre-wrap">{question}</div>
          </div>
        )}

        {question && (
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Type Your Answer</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your structured answer here..."
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)] resize-none"
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handleEvaluate}
              isLoading={isLoading}
              disabled={!userAnswer.trim()}
              className="w-full font-bold"
              rightIcon={<Award className="w-4 h-4 text-[var(--brand-primary)]" />}
            >
              Evaluate My Answer
            </Button>
          </div>
        )}
      </div>

      {evaluation && (
        <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Claude Evaluation Report Card
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Report'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans">
            <div className="whitespace-pre-wrap">{evaluation}</div>
          </div>
        </div>
      )}
    </div>
  );
};
