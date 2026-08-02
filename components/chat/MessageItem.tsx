'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
} from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { FilePill } from './FilePill';
import { CodeBlock } from './CodeBlock';

interface MessageItemProps {
  message: ChatMessage;
  onFollowUpClick?: (prompt: string) => void;
  onRetry?: (messageId: string) => void;
  onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onFollowUpClick,
  onRetry,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Basic parser to render code blocks vs standard text lines
  const renderFormattedContent = (text: string) => {
    if (!text) return null;

    // Check for code blocks ```lang ... ```
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Text before code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.map((part, idx) => {
      if (part.type === 'code') {
        return <CodeBlock key={idx} language={part.language!} code={part.content} />;
      }

      // Render standard paragraph with bold, headers, lists
      const lines = part.content.split('\n');
      return (
        <div key={idx} className="space-y-2 text-slate-800 dark:text-slate-200 leading-relaxed">
          {lines.map((line, lineIdx) => {
            if (!line.trim()) return <div key={lineIdx} className="h-2" />;

            // H3 header
            if (line.startsWith('### ')) {
              return (
                <h3 key={lineIdx} className="text-sm font-bold text-slate-900 dark:text-white pt-2">
                  {line.replace('### ', '')}
                </h3>
              );
            }
            // H4 header
            if (line.startsWith('#### ')) {
              return (
                <h4 key={lineIdx} className="text-xs font-bold text-purple-600 dark:text-purple-400 pt-1">
                  {line.replace('#### ', '')}
                </h4>
              );
            }
            // Bullet items
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
              return (
                <div key={lineIdx} className="flex items-start gap-2 pl-2 text-xs">
                  <span className="text-[var(--brand-primary)] font-bold">•</span>
                  <span>{line.trim().replace(/^[-*]\s+/, '')}</span>
                </div>
              );
            }
            // Blockquote
            if (line.trim().startsWith('> ')) {
              return (
                <blockquote
                  key={lineIdx}
                  className="pl-3 py-1 border-l-2 border-[var(--brand-primary)] text-xs text-slate-600 dark:text-slate-300 italic bg-purple-500/5 rounded-r-lg"
                >
                  {line.trim().replace(/^>\s+/, '')}
                </blockquote>
              );
            }

            return (
              <p key={lineIdx} className="text-xs leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={`flex gap-3 max-w-4xl mx-auto my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white'
            : 'bg-gradient-to-tr from-[var(--brand-primary)] to-indigo-500 text-white'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message Bubble & Content Container */}
      <div className={`space-y-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* User Attached Files */}
        {message.files && message.files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.files.map((file) => (
              <FilePill key={file.id} file={file} />
            ))}
          </div>
        )}

        {/* Text Content Bubble */}
        <div
          className={`p-4 rounded-2xl text-xs shadow-sm ${
            isUser
              ? 'bg-[var(--brand-primary)] text-white font-medium rounded-tr-none'
              : 'glass-card border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            <div>{renderFormattedContent(message.content)}</div>
          )}
        </div>

        {/* Message Actions Bar (for AI Assistant) */}
        {!isUser && (
          <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400 font-mono">{message.timestamp}</span>

              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {onRetry && (
                <button
                  onClick={() => onRetry(message.id)}
                  className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition"
                  title="Regenerate response"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              )}

              {onFeedback && (
                <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 dark:border-slate-800 pl-2">
                  <button
                    onClick={() => onFeedback(message.id, 'like')}
                    className={`p-0.5 hover:text-emerald-500 transition ${
                      message.feedback === 'like' ? 'text-emerald-500' : 'text-slate-400'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onFeedback(message.id, 'dislike')}
                    className={`p-0.5 hover:text-red-500 transition ${
                      message.feedback === 'dislike' ? 'text-red-500' : 'text-slate-400'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Suggested Follow-up Prompt Chips */}
        {!isUser && message.followUps && message.followUps.length > 0 && (
          <div className="pt-2 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Follow-ups
            </span>
            <div className="flex flex-wrap gap-2">
              {message.followUps.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onFollowUpClick && onFollowUpClick(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-purple-100 dark:hover:bg-purple-950/60 border border-slate-200 dark:border-slate-700 hover:border-purple-300 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[var(--brand-primary)] transition text-left"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
