'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Square,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { ChatSession, FileAttachment } from '@/lib/types';
import { parseFile } from '@/lib/fileParser';
import { PromptCards } from './PromptCards';
import { MessageItem } from './MessageItem';
import { FilePill } from './FilePill';

interface ChatViewProps {
  session: ChatSession;
  isGenerating: boolean;
  onSendMessage: (prompt: string, files: FileAttachment[]) => void;
  onStopGeneration: () => void;
  onRetry: (messageId: string) => void;
  onFeedback: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  session,
  isGenerating,
  onSendMessage,
  onStopGeneration,
  onRetry,
  onFeedback,
}) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, isGenerating]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBottom(!isAtBottom);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if ((!input.trim() && files.length === 0) || isGenerating) return;
    onSendMessage(input, files);
    setInput('');
    setFiles([]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    for (const file of selectedFiles) {
      try {
        const parsed = await parseFile(file);
        setFiles((prev) => [...prev, parsed]);
      } catch (err) {
        console.error('File parse error:', err);
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
      >
        {session.messages.length === 0 ? (
          <PromptCards onSelectPrompt={(prompt) => onSendMessage(prompt, [])} />
        ) : (
          session.messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              onFollowUpClick={(prompt) => onSendMessage(prompt, [])}
              onRetry={onRetry}
              onFeedback={onFeedback}
            />
          ))
        )}

        {isGenerating && (
          <div className="flex items-center gap-2 max-w-4xl mx-auto py-2 px-4 text-xs text-[var(--brand-primary)] font-medium animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Claude Sonnet 4 is generating study notes...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Scroll-To-Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-8 p-2.5 rounded-full bg-[var(--brand-primary)] text-white shadow-xl hover:scale-110 transition z-20"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* File Pills Preview */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <FilePill key={file.id} file={file} onRemove={() => removeFile(file.id)} />
              ))}
            </div>
          )}

          {/* Textarea Input Container */}
          <div className="relative rounded-2xl glass-card border border-slate-200 dark:border-slate-700 focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/20 transition-all p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Claude anything or type a study topic... (Shift+Enter for newline)"
              rows={2}
              className="w-full bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2 py-1"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {/* File Attachment Button */}
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,image/png,image/jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 text-xs font-medium"
                  title="Upload PDF, DOCX, TXT, PNG, JPG"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden sm:inline">Attach File</span>
                </button>
              </div>

              {/* Send / Stop Button */}
              <div>
                {isGenerating ? (
                  <button
                    type="button"
                    onClick={onStopGeneration}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-md transition"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() && files.length === 0}
                    className="px-4 py-2 rounded-xl bg-[var(--brand-primary)] hover:brightness-110 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 shadow-glow transition"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400">
            StudyMate AI uses Claude Sonnet 4. Check important lecture sources and formulas.
          </p>
        </div>
      </div>
    </div>
  );
};
