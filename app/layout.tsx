import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StudyMate AI — AI Study Assistant for College Students',
  description: 'Powered by Anthropic Claude Sonnet 4. Summarize notes, generate practice quizzes, master 3D flashcards, and debug complex code.',
  keywords: 'StudyMate AI, Claude API, AI Study Assistant, Quiz Generator, Flashcards, Notes Summarizer, College Homework Helper',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-accent="purple" data-font-size="medium">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
