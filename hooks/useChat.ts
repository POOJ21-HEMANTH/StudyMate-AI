'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatSession, ChatMessage, ClaudeModel, FileAttachment } from '@/lib/types';
import { safeLocalStorageGet, safeLocalStorageSet, generateId, formatTimestamp } from '@/lib/utils';
import { generateSimulatedResponse } from '@/lib/anthropic';

const DEFAULT_SESSION: ChatSession = {
  id: 'session-1',
  title: 'Welcome to StudyMate AI',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  model: 'claude-sonnet-4',
  isPinned: true,
  messages: [
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `👋 **Welcome to StudyMate AI!**

I'm your intelligent college study assistant powered by **Claude Sonnet 4**.

Here is what I can help you with today:
- 📚 Summarize dense lecture slides & textbook PDFs
- 📝 Generate interactive practice quizzes & flashcards
- 💻 Explain Python, Java, C++, JS, or SQL code step-by-step
- 🎤 Conduct AI Mock Interviews for Software Engineering, Data Analyst, AI Engineer & Frontend roles
- ⚡ Create last-minute exam revision cheat sheets

Select a prompt card below or upload your PDF lecture files to get started!`,
      timestamp: formatTimestamp(),
      followUps: [
        'How do I upload a PDF lecture file?',
        'Generate a quiz on Data Structures',
        'Start an AI Mock Interview for Software Engineer'
      ]
    }
  ]
};

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([DEFAULT_SESSION]);
  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');
  const [selectedModel, setSelectedModel] = useState<ClaudeModel>('claude-sonnet-4');
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const savedSessions = safeLocalStorageGet<ChatSession[]>('studymate_sessions', [DEFAULT_SESSION]);
    if (savedSessions && savedSessions.length > 0) {
      setSessions(savedSessions);
      setActiveSessionId(savedSessions[0].id);
      if (savedSessions[0].model) setSelectedModel(savedSessions[0].model);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (sessions.length > 0) {
      safeLocalStorageSet('studymate_sessions', sessions);
    }
  }, [sessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0] || DEFAULT_SESSION;

  const createNewChat = useCallback((initialPrompt?: string) => {
    const newId = generateId();
    const newSession: ChatSession = {
      id: newId,
      title: initialPrompt ? (initialPrompt.length > 25 ? initialPrompt.slice(0, 25) + '...' : initialPrompt) : 'New Study Session',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      model: selectedModel,
      isPinned: false,
      messages: []
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    return newId;
  }, [selectedModel]);

  const togglePinChat = useCallback((sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, isPinned: !s.isPinned } : s))
    );
  }, []);

  const renameChat = useCallback((sessionId: string, newTitle: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, title: newTitle, updatedAt: new Date().toISOString() } : s))
    );
  }, []);

  const deleteChat = useCallback((sessionId: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      if (filtered.length === 0) {
        const fresh = { ...DEFAULT_SESSION, id: generateId() };
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeSessionId]);

  const clearAllChats = useCallback(() => {
    const fresh = { ...DEFAULT_SESSION, id: generateId() };
    setSessions([fresh]);
    setActiveSessionId(fresh.id);
  }, []);

  const sendMessage = useCallback(async (content: string, files: FileAttachment[] = [], toolType?: string) => {
    if ((!content.trim() && files.length === 0) || isGenerating) return;

    let targetSessionId = activeSessionId;
    let currentSession = sessions.find(s => s.id === targetSessionId);

    if (!currentSession) {
      targetSessionId = createNewChat(content);
    } else if (currentSession.messages.length === 0) {
      renameChat(targetSessionId, content.length > 25 ? content.slice(0, 25) + '...' : content);
    }

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: formatTimestamp(),
      files: files.length > 0 ? files : undefined,
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === targetSessionId
          ? {
              ...s,
              messages: [...s.messages, userMsg],
              updatedAt: new Date().toISOString(),
            }
          : s
      )
    );

    setIsGenerating(true);

    const aiMsgId = generateId();
    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      timestamp: formatTimestamp(),
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === targetSessionId ? { ...s, messages: [...s.messages, initialAiMsg] } : s
      )
    );

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          messages: currentSession?.messages || [],
          files,
          model: selectedModel,
          toolType,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Using smart fallback streaming');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let followUps: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        if (chunk.includes('[FOLLOWUPS]')) {
          const parts = chunk.split('[FOLLOWUPS]');
          fullText += parts[0];
          try {
            followUps = JSON.parse(parts[1]);
          } catch (e) {
            followUps = [];
          }
        } else {
          fullText += chunk;
        }

        setSessions((prev) =>
          prev.map((s) =>
            s.id === targetSessionId
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === aiMsgId ? { ...m, content: fullText, followUps } : m
                  ),
                }
              : s
          )
        );
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      
      const sim = generateSimulatedResponse(content, files.map(f => f.content).join('\n'), toolType);
      const textToStream = sim.text;
      let currentIdx = 0;

      const interval = setInterval(() => {
        currentIdx += Math.floor(Math.random() * 15) + 5;
        const currentSlice = textToStream.slice(0, currentIdx);

        setSessions((prev) =>
          prev.map((s) =>
            s.id === targetSessionId
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === aiMsgId
                      ? {
                          ...m,
                          content: currentSlice,
                          followUps: currentIdx >= textToStream.length ? sim.followUps : undefined,
                        }
                      : m
                  ),
                }
              : s
          )
        );

        if (currentIdx >= textToStream.length) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 35);
      return;
    } finally {
      setIsGenerating(false);
    }
  }, [activeSessionId, sessions, isGenerating, selectedModel, createNewChat, renameChat]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  }, []);

  const setMessageFeedback = useCallback((messageId: string, feedback: 'like' | 'dislike') => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              messages: s.messages.map((m) =>
                m.id === messageId ? { ...m, feedback: m.feedback === feedback ? null : feedback } : m
              ),
            }
          : s
      )
    );
  }, [activeSessionId]);

  const retryMessage = useCallback((messageId: string) => {
    const session = sessions.find((s) => s.id === activeSessionId);
    if (!session) return;
    const msgIdx = session.messages.findIndex((m) => m.id === messageId);
    if (msgIdx <= 0) return;

    const previousUserMsg = session.messages[msgIdx - 1];
    if (previousUserMsg.role === 'user') {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: s.messages.slice(0, msgIdx) }
            : s
        )
      );
      sendMessage(previousUserMsg.content, previousUserMsg.files);
    }
  }, [activeSessionId, sessions, sendMessage]);

  return {
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
    togglePinChat,
    renameChat,
    deleteChat,
    clearAllChats,
    setMessageFeedback,
    retryMessage,
  };
}
