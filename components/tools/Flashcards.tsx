'use client';

import React, { useState } from 'react';
import { Layers, RotateCcw, Sparkles, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flashcard } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export const Flashcards: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([
    {
      id: 'fc1',
      front: 'What is the primary difference between a Process and a Thread?',
      back: 'Processes have isolated virtual memory spaces. Threads share the memory space of their parent process.',
      tag: 'Operating Systems',
      status: 'unseen',
    },
    {
      id: 'fc2',
      front: 'Define Dijkstra\'s Shortest Path Algorithm time complexity with a Priority Queue.',
      back: 'O((V + E) log V), where V is the number of vertices and E is the number of edges.',
      tag: 'Algorithms',
      status: 'unseen',
    },
    {
      id: 'fc3',
      front: 'What are the 4 fundamental pillars of Object-Oriented Programming (OOP)?',
      back: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.',
      tag: 'OOP',
      status: 'unseen',
    },
    {
      id: 'fc4',
      front: 'What is a Deadlock in Operating Systems?',
      back: 'A situation where two or more processes are blocked forever, waiting for resources held by each other.',
      tag: 'OS Concepts',
      status: 'unseen',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleGenerateDeck = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'flashcards', topic }),
      });
      if (res.ok) {
        const data = await res.json();
        setCards(data.cards);
      }
    } catch (e) {
      // Keep existing cards
    } finally {
      setIsLoading(false);
    }
  };

  const currentCard = cards[currentIndex] || cards[0];

  const handleStatusChange = (status: 'mastered' | 'review') => {
    setCards((prev) =>
      prev.map((c, i) => (i === currentIndex ? { ...c, status } : c))
    );
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const masteredCount = cards.filter((c) => c.status === 'mastered').length;
  const progressPercent = Math.round((masteredCount / cards.length) * 100);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1 text-center">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center justify-center gap-2">
          <Layers className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>3D Active Recall Flashcards</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click the card to flip between Question and Answer. Mark cards to optimize recall velocity.
        </p>
      </div>

      {/* Generator input */}
      <div className="rounded-2xl glass-card p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Generate deck for: e.g. Operating Systems, Calculus, Biology..."
          className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[var(--brand-primary)]"
        />
        <Button
          variant="primary"
          size="md"
          onClick={handleGenerateDeck}
          isLoading={isLoading}
          disabled={!topic.trim()}
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Deck
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>Mastery: {progressPercent}% ({masteredCount} mastered)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div
          className={`relative w-full h-[300px] rounded-3xl glass-card border border-slate-200 dark:border-slate-700 p-8 shadow-2xl transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between backface-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider text-[10px] bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20">
                {currentCard?.tag || 'General'} • QUESTION
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Click card to flip 🔄</span>
            </div>

            <div className="my-auto text-center space-y-3">
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentCard?.front}
              </p>
            </div>

            <div className="text-center text-[10px] text-slate-400">
              Card {currentIndex + 1} / {cards.length}
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between backface-hidden rotate-y-180 bg-slate-900 text-white rounded-3xl border border-purple-500/40">
            <div className="flex items-center justify-between text-xs text-purple-300">
              <span className="font-mono uppercase tracking-wider text-[10px] bg-purple-500/20 px-2.5 py-1 rounded-full">
                ANSWER & EXPLANATION
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Click to flip back 🔄</span>
            </div>

            <div className="my-auto text-center space-y-3">
              <p className="text-sm sm:text-base text-purple-100 font-medium leading-relaxed">
                {currentCard?.back}
              </p>
            </div>

            <div className="text-center text-[10px] text-purple-400">
              StudyMate AI Flashcard Deck
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="md"
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex((prev) => Math.max(0, prev - 1));
            setIsFlipped(false);
          }}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange('review')}
            leftIcon={<AlertCircle className="w-4 h-4 text-amber-500" />}
          >
            Needs Review
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleStatusChange('mastered')}
            leftIcon={<CheckCircle2 className="w-4 h-4 text-white" />}
          >
            Mastered
          </Button>
        </div>

        <Button
          variant="outline"
          size="md"
          disabled={currentIndex === cards.length - 1}
          onClick={() => {
            setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1));
            setIsFlipped(false);
          }}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
