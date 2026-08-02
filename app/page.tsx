'use client';

import React, { useState } from 'react';
import { ActiveTab } from '@/lib/types';
import { useTheme } from '@/hooks/useTheme';
import { useChat } from '@/hooks/useChat';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useToast } from '@/hooks/useToast';

// Layout Components
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

// Landing Components
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

// Dashboard Components
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { ChatView } from '@/components/chat/ChatView';
import { NotesSummarizer } from '@/components/tools/NotesSummarizer';
import { QuizGenerator } from '@/components/tools/QuizGenerator';
import { Flashcards } from '@/components/tools/Flashcards';
import { StudyPlanner } from '@/components/tools/StudyPlanner';
import { ELI5Tool } from '@/components/tools/ELI5Tool';
import { AssignmentHelperTool } from '@/components/tools/AssignmentHelperTool';
import { CodeExplainerTool } from '@/components/tools/CodeExplainerTool';
import { InterviewPrepTool } from '@/components/tools/InterviewPrepTool';
import { ExamRevisionTool } from '@/components/tools/ExamRevisionTool';
import { SettingsView } from '@/components/settings/SettingsView';
import { ToastContainer } from '@/components/ui/Toast';

export default function Home() {
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { theme, toggleMode, setAccent, setFontSize } = useTheme();
  const { toasts, removeToast } = useToast();
  const { stats, incrementStat } = useAnalytics();
  const {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    selectedModel,
    setSelectedModel,
    isGenerating,
    sendMessage,
    stopGeneration,
    createNewChat,
    renameChat,
    deleteChat,
    clearAllChats,
    setMessageFeedback,
    retryMessage,
  } = useChat();

  const isDarkMode = theme.mode === 'dark';

  const handleLaunchDashboard = () => {
    setViewMode('dashboard');
  };

  const handleGoHome = () => {
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {viewMode === 'landing' ? (
        /* LANDING PAGE VIEW */
        <div className="flex-1 flex flex-col">
          <Navbar
            darkMode={isDarkMode}
            onToggleTheme={toggleMode}
            onLaunchApp={handleLaunchDashboard}
          />
          <main className="flex-1">
            <Hero onGetStarted={handleLaunchDashboard} />
            <Features />
            <Testimonials />
            <FAQ />
            <CTA onLaunch={handleLaunchDashboard} />
          </main>
          <Footer />
        </div>
      ) : (
        /* DASHBOARD VIEW */
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={setActiveSessionId}
            onNewChat={createNewChat}
            onDeleteSession={deleteChat}
            onRenameSession={renameChat}
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <Header
              activeTab={activeTab}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              darkMode={isDarkMode}
              onToggleTheme={toggleMode}
              onGoHome={handleGoHome}
            />

            {/* Active Tab View Router */}
            <main className="flex-1 overflow-y-auto relative">
              {activeTab === 'analytics' && (
                <AnalyticsOverview stats={stats} onNavigateTab={setActiveTab} />
              )}

              {activeTab === 'chat' && (
                <ChatView
                  session={activeSession}
                  isGenerating={isGenerating}
                  onSendMessage={(prompt, files) => {
                    sendMessage(prompt, files);
                    incrementStat('totalChats');
                    incrementStat('dailyAiQueries');
                  }}
                  onStopGeneration={stopGeneration}
                  onRetry={retryMessage}
                  onFeedback={setMessageFeedback}
                />
              )}

              {activeTab === 'summarizer' && <NotesSummarizer />}

              {activeTab === 'quiz' && <QuizGenerator />}

              {activeTab === 'flashcards' && <Flashcards />}

              {activeTab === 'planner' && <StudyPlanner />}

              {activeTab === 'eli5' && <ELI5Tool />}

              {activeTab === 'assignment' && <AssignmentHelperTool />}

              {activeTab === 'code' && <CodeExplainerTool />}

              {activeTab === 'interview' && <InterviewPrepTool />}

              {activeTab === 'revision' && <ExamRevisionTool />}

              {activeTab === 'settings' && (
                <SettingsView
                  darkMode={isDarkMode}
                  onToggleTheme={toggleMode}
                  accent={theme.accent}
                  onSelectAccent={setAccent}
                  fontSize={theme.fontSize}
                  onSelectFontSize={setFontSize}
                  selectedModel={selectedModel}
                  onSelectModel={setSelectedModel}
                  sessions={sessions}
                  onClearAllChats={clearAllChats}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
