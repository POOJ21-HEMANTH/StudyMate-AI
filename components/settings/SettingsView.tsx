'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Palette,
  Type,
  Download,
  Trash2,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import { ThemeAccent, FontSize, ClaudeModel, ChatSession } from '@/lib/types';
import { MODEL_NAMES } from '@/lib/anthropic';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface SettingsViewProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  accent: ThemeAccent;
  onSelectAccent: (accent: ThemeAccent) => void;
  fontSize: FontSize;
  onSelectFontSize: (size: FontSize) => void;
  selectedModel: ClaudeModel;
  onSelectModel: (model: ClaudeModel) => void;
  sessions: ChatSession[];
  onClearAllChats: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  onToggleTheme,
  accent,
  onSelectAccent,
  fontSize,
  onSelectFontSize,
  selectedModel,
  onSelectModel,
  sessions,
  onClearAllChats,
}) => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const accents: { id: ThemeAccent; name: string; hex: string }[] = [
    { id: 'purple', name: 'Purple', hex: '#6D5EF5' },
    { id: 'indigo', name: 'Indigo', hex: '#4F46E5' },
    { id: 'emerald', name: 'Emerald', hex: '#10B981' },
    { id: 'rose', name: 'Rose', hex: '#F43F5E' },
    { id: 'blue', name: 'Sky Blue', hex: '#0284C7' },
  ];

  const fontSizes: { id: FontSize; name: string; desc: string }[] = [
    { id: 'small', name: 'Compact', desc: '14px font' },
    { id: 'medium', name: 'Standard', desc: '16px font' },
    { id: 'large', name: 'Comfortable', desc: '18px font' },
  ];

  const handleExportData = () => {
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `studymate_export_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-[var(--font-jakarta)] flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-[var(--brand-primary)]" />
          <span>Settings & Preferences</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Customize themes, font sizes, data backup, and Anthropic API models.
        </p>
      </div>

      {/* 1. API Connection & Default Engine */}
      <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">API Connection & Claude Model</h4>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/20">
            Active Connection
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(MODEL_NAMES) as ClaudeModel[]).map((mKey) => {
            const mInfo = MODEL_NAMES[mKey];
            const isSelected = selectedModel === mKey;
            return (
              <button
                key={mKey}
                onClick={() => onSelectModel(mKey)}
                className={`p-4 rounded-xl border text-left transition-all space-y-2 ${
                  isSelected
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-slate-900 dark:text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{mInfo.name}</span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-[var(--brand-primary)]" />}
                </div>
                <p className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{mInfo.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Theme Accent & Appearance */}
      <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Theme Accent & Mode</h4>
          </div>
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            <span>{darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</span>
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Accent Color</label>
          <div className="flex flex-wrap gap-3">
            {accents.map((acc) => {
              const isSelected = accent === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => onSelectAccent(acc.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                    isSelected
                      ? 'border-[var(--brand-primary)] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: acc.hex }} />
                  <span>{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-400" />
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Typography Font Size</label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {fontSizes.map((f) => {
              const isSelected = fontSize === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onSelectFontSize(f.id)}
                  className={`p-3 rounded-xl border text-center transition ${
                    isSelected
                      ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-slate-900 dark:text-white font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="text-xs font-semibold">{f.name}</div>
                  <div className="text-[10px] text-slate-400">{f.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Data Controls */}
      <div className="rounded-2xl glass-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
          Data Backup & History Controls
        </h4>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white">Export Study Sessions</h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Download all chat conversations, quizzes, and notes as a JSON file.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            leftIcon={downloadSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          >
            {downloadSuccess ? 'Downloaded!' : 'Export JSON Data'}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <h5 className="text-xs font-bold text-red-500">Delete All History</h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Permanently wipe all local chat sessions, quiz scores, and flashcard decks.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowClearModal(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear History
          </Button>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Study Data?"
        description="This action will permanently delete all saved chat sessions and study statistics."
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Are you sure you want to proceed? This step cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowClearModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onClearAllChats();
                setShowClearModal(false);
              }}
            >
              Confirm Wipe History
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
