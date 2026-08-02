'use client';

import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState<'mcq' | 'tf' | 'short'>('mcq');
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const mockQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the average time complexity of searching in a Hash Table?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctAnswer: 'O(1)',
      explanation: 'Hash tables provide average O(1) constant time lookup via key hashing.',
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Which sorting algorithm guarantees O(N log N) worst-case time complexity?',
      options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
      correctAnswer: 'Merge Sort',
      explanation: 'Merge Sort consistently divides arrays into halves and merges in O(N log N) time.',
    },
    {
      id: 'q3',
      type: 'tf',
      question: 'True or False: Stacks follow a First-In, First-Out (FIFO) data order.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Stacks follow Last-In, First-Out (LIFO). Queues follow FIFO.',
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'What does ACID stand for in Database Systems?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Array, Control, Index, Data',
        'Algorithm, Code, Input, Data',
        'Access, Cache, Interface, Disk'
      ],
      correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
      explanation: 'ACID properties guarantee reliable processing of database transactions.',
    },
    {
      id: 'q5',
      type: 'short',
      question: 'What is the space complexity of an in-place Quick Sort?',
      correctAnswer: 'O(log N)',
      explanation: 'In-place Quick Sort requires O(log N) stack space for recursive calls.',
    },
  ];

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setSubmitted(false);
    setUserAnswers({});

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, type: questionType, count: numQuestions }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions);
      } else {
        setQuestions(mockQuestions.slice(0, numQuestions));
      }
    } catch (e) {
      setQuestions(mockQuestions.slice(0, numQuestions));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (qId: string, option: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>Interactive Quiz & Test Generator</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Generate Multiple Choice, True/False, or Short Answer practice tests on any topic.
        </p>
      </div>

      {/* Generator Form */}
      <div className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Study Topic or Subject</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Data Structures & Algorithms, Organic Chem, Microeconomics..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Question Format</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="mcq">Multiple Choice (MCQ)</option>
              <option value="tf">True / False</option>
              <option value="short">Short Answer</option>
            </select>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleGenerateQuiz}
          isLoading={isLoading}
          disabled={!topic.trim()}
          className="w-full"
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Interactive Quiz
        </Button>
      </div>

      {/* Quiz Questions List */}
      {questions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Quiz Set: <span className="text-[var(--brand-primary)]">{topic || 'Data Structures'}</span> ({questions.length} questions)
            </h4>

            {submitted && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/10 text-[var(--brand-primary)] text-xs font-bold border border-purple-500/20">
                <Award className="w-4 h-4" />
                <span>Score: {calculateScore()} / {questions.length}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isCorrect = userAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase();
              return (
                <div
                  key={q.id}
                  className="rounded-2xl glass-card p-5 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[var(--brand-primary)] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white pt-0.5 leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  {/* Options for MCQ / TF */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {q.options.map((opt, i) => {
                        const isSelected = userAnswers[q.id] === opt;
                        let optStyle = 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-400';

                        if (submitted) {
                          if (opt === q.correctAnswer) {
                            optStyle = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optStyle = 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500 font-bold';
                          }
                        } else if (isSelected) {
                          optStyle = 'bg-[var(--brand-primary)] text-white font-bold border-transparent';
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${optStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Short Answer Input */}
                  {!q.options && (
                    <input
                      type="text"
                      disabled={submitted}
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleOptionSelect(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                  )}

                  {/* Explanation after submission */}
                  {submitted && (
                    <div className={`p-3 rounded-xl text-xs space-y-1 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300'}`}>
                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        <span>{isCorrect ? 'Correct!' : `Correct Answer: ${q.correctAnswer}`}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            {!submitted ? (
              <Button variant="primary" size="md" onClick={() => setSubmitted(true)} className="w-full sm:w-auto">
                Submit & Grade Quiz
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({});
                }}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset & Retake Quiz
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
