'use client';

import React from 'react';
import { FileText, Image as ImageIcon, X } from 'lucide-react';
import { FileAttachment } from '@/lib/types';
import { formatFileSize } from '@/lib/utils';

interface FilePillProps {
  file: FileAttachment;
  onRemove?: () => void;
}

export const FilePill: React.FC<FilePillProps> = ({ file, onRemove }) => {
  const isImage = file.type === 'image';

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-sm">
      {isImage ? (
        <ImageIcon className="w-4 h-4 text-purple-500 shrink-0" />
      ) : (
        <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
      )}

      <span className="truncate max-w-[140px] font-semibold">{file.name}</span>
      <span className="text-[10px] text-slate-400">({formatFileSize(file.size)})</span>

      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
