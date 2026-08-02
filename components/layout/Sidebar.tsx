'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  MessageSquare,
  FileText,
  HelpCircle,
  Layers,
  Calendar,
  Baby,
  Edit3,
  Code2,
  Mic,
  Zap,
  Settings,
  Plus,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Search,
} from 'lucide-react';
import { ActiveTab, ChatSession } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mainNav = [
    { id: 'analytics' as ActiveTab, label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'chat' as ActiveTab, label: 'AI Study Chat', icon: MessageSquare },
    { id: 'summarizer' as ActiveTab, label: 'Notes Summarizer', icon: FileText },
    { id: 'quiz' as ActiveTab, label: 'Quiz Generator', icon: HelpCircle },
    { id: 'flashcards' as ActiveTab, label: 'Flashcards', icon: Layers },
    { id: 'planner' as ActiveTab, label: 'Study Planner', icon: Calendar },
  ];

  const aiToolsNav = [
    { id: 'eli5' as ActiveTab, label: 'Explain Like I\'m 5', icon: Baby },
    { id: 'assignment' as ActiveTab, label: 'Assignment Helper', icon: Edit3 },
    { id: 'code' as ActiveTab, label: 'Code Explainer', icon: Code2 },
    { id: 'interview' as ActiveTab, label: 'Interview Prep', icon: Mic },
    { id: 'revision' as ActiveTab, label: 'Exam Revision', icon: Zap },
  ];

  const handleStartRename = (s: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(s.id);
    setEditTitle(s.title);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 z-30 select-none',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand-primary)] to-indigo-500 flex items-center justify-center text-white shadow-glow">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white leading-none tracking-tight">
                StudyMate <span className="text-[var(--brand-primary)]">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Powered by Claude</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-xl bg-[var(--brand-primary)] flex items-center justify-center text-white">
            <BookOpen className="w-4 h-4" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          variant="primary"
          size={isCollapsed ? 'sm' : 'md'}
          onClick={() => {
            onNewChat();
            setActiveTab('chat');
          }}
          className="w-full flex items-center justify-center"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          {!isCollapsed && 'New Study Chat'}
        </Button>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 space-y-6 py-2">
        {/* Core Apps */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Dashboard & Workspace
            </p>
          )}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white font-semibold shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Specialized AI Tools */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="flex items-center justify-between px-3 mb-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Specialized AI Assistants
              </p>
              <Sparkles className="w-3 h-3 text-[var(--brand-primary)] animate-pulse" />
            </div>
          )}
          {aiToolsNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white font-semibold shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 text-purple-400" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Sessions History List */}
        {!isCollapsed && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between px-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Recent Conversations
              </p>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full">
                {sessions.length}
              </span>
            </div>

            {sessions.length > 3 && (
              <div className="relative px-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>
            )}

            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {filteredSessions.map((session) => {
                const isSelected = activeSessionId === session.id && activeTab === 'chat';
                const isEditing = editingId === session.id;

                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      onSelectSession(session.id);
                      setActiveTab('chat');
                    }}
                    className={cn(
                      'group flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition',
                      isSelected
                        ? 'bg-slate-800 text-white font-medium border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    )}
                  >
                    {isEditing ? (
                      <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(session.id)}
                          className="bg-slate-950 text-white px-2 py-0.5 text-xs rounded border border-purple-500 w-full focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(session.id)}
                          className="text-emerald-400 hover:text-emerald-300 p-0.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="truncate flex-1 pr-2">{session.title}</span>
                        <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => handleStartRename(session, e)}
                            className="p-1 hover:text-white text-slate-500 transition"
                            title="Rename chat"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSession(session.id);
                            }}
                            className="p-1 hover:text-red-400 text-slate-500 transition"
                            title="Delete chat"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Settings Link */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors',
            activeTab === 'settings'
              ? 'bg-[var(--brand-primary)] text-white font-semibold shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          )}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Settings & Customization</span>}
        </button>
      </div>
    </aside>
  );
};
