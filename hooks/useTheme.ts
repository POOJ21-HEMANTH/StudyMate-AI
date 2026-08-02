'use client';

import { useState, useEffect } from 'react';
import { ThemeSettings, ThemeAccent, FontSize } from '@/lib/types';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/lib/utils';

const DEFAULT_THEME: ThemeSettings = {
  mode: 'dark',
  accent: 'purple',
  fontSize: 'medium',
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = safeLocalStorageGet<ThemeSettings>('studymate_theme', DEFAULT_THEME);
    setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Dark / Light class
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Accent attribute
    root.setAttribute('data-accent', theme.accent);

    // Font size attribute
    root.setAttribute('data-font-size', theme.fontSize);

    safeLocalStorageSet('studymate_theme', theme);
  }, [theme, mounted]);

  const toggleMode = () => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark',
    }));
  };

  const setAccent = (accent: ThemeAccent) => {
    setTheme((prev) => ({ ...prev, accent }));
  };

  const setFontSize = (fontSize: FontSize) => {
    setTheme((prev) => ({ ...prev, fontSize }));
  };

  return {
    theme,
    toggleMode,
    setAccent,
    setFontSize,
    mounted,
  };
}
