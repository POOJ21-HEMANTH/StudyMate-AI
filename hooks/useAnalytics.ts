'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnalyticsStats } from '@/lib/types';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/lib/utils';

const INITIAL_STATS: AnalyticsStats = {
  totalChats: 14,
  notesSummarized: 8,
  quizzesGenerated: 12,
  flashcardsCreated: 45,
  studyHoursPlanned: 28,
  dailyAiQueries: 62,
  lastActive: new Date().toISOString(),
};

export function useAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats>(INITIAL_STATS);

  useEffect(() => {
    const saved = safeLocalStorageGet<AnalyticsStats>('studymate_analytics', INITIAL_STATS);
    setStats(saved);
  }, []);

  const incrementStat = useCallback((key: keyof Omit<AnalyticsStats, 'lastActive'>, amount = 1) => {
    setStats((prev) => {
      const updated = {
        ...prev,
        [key]: prev[key] + amount,
        lastActive: new Date().toISOString(),
      };
      safeLocalStorageSet('studymate_analytics', updated);
      return updated;
    });
  }, []);

  return {
    stats,
    incrementStat,
  };
}
