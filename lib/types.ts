export type ClaudeModel = 'claude-sonnet-4' | 'claude-3-5-sonnet' | 'claude-3-haiku';

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  dataUrl?: string;
  pageCount?: number;
  uploadTime?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  files?: FileAttachment[];
  feedback?: 'like' | 'dislike' | null;
  followUps?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  model: ClaudeModel;
  isPinned?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'tf' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tag?: string;
  status: 'mastered' | 'review' | 'unseen';
}

export interface StudyPlanItem {
  id: string;
  date: string;
  subject: string;
  topic: string;
  hours: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ContinueLearningState {
  lastSubject: string;
  lastDate: string;
  totalTimeHours: number;
  lastQuizScore: string;
  recommendedTopic: string;
  estimatedMinutes: number;
}

export interface AnalyticsStats {
  totalChats: number;
  notesSummarized: number;
  quizzesGenerated: number;
  flashcardsCreated: number;
  studyHoursPlanned: number;
  dailyAiQueries: number;
  weeklyStreakDays: number;
  mostStudiedSubject: string;
  productivityScore: number;
  lastActive: string;
}

export type InterviewRole = 'software_engineer' | 'data_analyst' | 'ai_engineer' | 'frontend_developer';

export interface InterviewEvaluation {
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  overallScore: number;
  improvements: string[];
  resources: string[];
  feedbackSummary: string;
}

export type ThemeAccent = 'purple' | 'indigo' | 'emerald' | 'rose' | 'blue';
export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeSettings {
  mode: 'dark' | 'light';
  accent: ThemeAccent;
  fontSize: FontSize;
}

export type ActiveTab = 
  | 'analytics'
  | 'chat'
  | 'summarizer'
  | 'quiz'
  | 'flashcards'
  | 'planner'
  | 'eli5'
  | 'assignment'
  | 'code'
  | 'interview'
  | 'revision'
  | 'settings';
