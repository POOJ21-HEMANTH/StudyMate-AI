# StudyMate AI 🎓 — Production AI Assistant for College Students

> **Powered by Anthropic Claude (featuring Claude Sonnet 4 as default engine)**

StudyMate AI is a modern, production-grade web application designed for college students to accelerate learning, summarize dense lecture materials, generate interactive active-recall quizzes, and master complex computer science & STEM subjects.

Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and `@anthropic-ai/sdk`.

---

## 🌟 Key Features & Capabilities

### 1. Modern SaaS Landing Page & Navigation
- **Hero & Interactive Window**: Features live mock preview cards, glowing badges, and single-click assistant launch.
- **Responsive Layout**: Designed to look premium across Desktop, Tablet, and Mobile viewports.
- **Glassmorphism UI**: Glass panels, custom gradient accents, rounded corners, and soft dark/light contrast inspired by Linear, Notion AI, and Vercel.

### 2. High-Performance AI Streaming Chat UI
- **Claude Models Switcher**: Select between **Claude Sonnet 4** (default), **Claude 3.5 Sonnet**, and **Claude 3 Haiku**.
- **Real-Time Streaming**: Real-time response generation with SSE (Server-Sent Events) and smart offline fallback simulation if no API key is provided.
- **Multi-Format File Uploads**: Drag and drop **PDF, DOCX, TXT, PNG, and JPG** files for direct contextual Q&A.
- **Suggested Follow-up Questions**: Automatic AI follow-up prompt chips after every response.
- **Code Block Syntax Highlighting**: Includes language labels, line numbers, and one-click copy code snippet controls.
- **Chat History Management**: Create new chats, search, rename, delete sessions, export to JSON, and sync automatically with browser `LocalStorage`.

### 3. Dedicated Specialized AI Study Assistant Tools
1. **Explain Like I'm 5 (ELI5)**: Simplifies dense academic jargon using intuitive real-world analogies.
2. **Assignment Helper**: Guides student problem-solving step-by-step with logic outlines while preserving academic integrity.
3. **Multi-Language Code Explainer**: Supports Python, Java, C, C++, JavaScript, and SQL with line-by-line breakdown and $\mathcal{O}(\log N)$ time/space complexity analysis.
4. **Interview Preparation**: Generates role-tailored technical & behavioral interview questions and evaluates user answers with an AI report card score.
5. **Exam Revision Mode**: Generates concise high-yield cheat sheets, must-know formulas, and common exam traps.

### 4. Interactive Active Recall Tools
- **Notes Summarizer**: Distill raw lecture slides into bullet points, executive summaries, or key definitions.
- **Quiz & Test Generator**: Interactive test-taking runner for MCQs, True/False, and Short Answer questions with real-time scoring and explanations.
- **3D Flip Flashcards**: Interactive 3D flip card decks with 180° rotation, mastery progress bars, and Needs Review tagging.
- **Study Schedule Planner**: Input exam dates, target subjects, and daily study hours to build an automated day-by-day checklist calendar.

### 5. Dashboard Analytics & Customization
- **Analytics Overview**: Real-time statistic cards for total chats, notes summarized, quizzes generated, flashcards created, study hours planned, and daily AI queries.
- **Settings Panel**: Change theme accents (Purple `#6D5EF5`, Indigo, Emerald, Rose, Sky Blue), scale font size (Compact, Standard, Comfortable), export chat data, and test API connectivity status.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & CSS Custom Custom Variables
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: Framer Motion (`framer-motion`) & CSS 3D Transforms
- **AI SDK**: `@anthropic-ai/sdk` with Edge Server API Routes
- **Persistence**: Browser `LocalStorage`

---

## 📁 Project Directory Structure

```
studymate-ai/
├── app/
│   ├── layout.tsx (Root HTML layout & theme attributes)
│   ├── page.tsx (Landing page & Dashboard view router)
│   ├── globals.css (Tailwind & CSS variable tokens)
│   └── api/
│       ├── chat/route.ts (Streaming Claude API route)
│       ├── summarize/route.ts
│       ├── quiz/route.ts
│       ├── planner/route.ts
│       └── study-tools/route.ts
├── components/
│   ├── layout/ (Navbar, Footer, Sidebar, Header)
│   ├── landing/ (Hero, Features, Testimonials, FAQ, CTA)
│   ├── dashboard/ (AnalyticsOverview, StatCard)
│   ├── chat/ (ChatView, MessageItem, CodeBlock, PromptCards, FilePill)
│   ├── tools/ (NotesSummarizer, QuizGenerator, Flashcards, StudyPlanner, ELI5Tool, AssignmentHelperTool, CodeExplainerTool, InterviewPrepTool, ExamRevisionTool)
│   ├── ui/ (Button, Modal, Toast, Skeleton, StatCard)
│   └── settings/ (SettingsView)
├── lib/
│   ├── anthropic.ts (Claude SDK client & smart fallback engine)
│   ├── fileParser.ts (PDF, DOCX, TXT, PNG, JPG parser)
│   ├── utils.ts (Formatting, copy to clipboard, local storage helpers)
│   └── types.ts (TypeScript interface definitions)
├── hooks/
│   ├── useTheme.ts
│   ├── useChat.ts
│   ├── useAnalytics.ts
│   └── useToast.ts
├── .env.local (ANTHROPIC_API_KEY environment variable)
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### 2. Clone & Install Dependencies
```bash
cd studymate-ai
npm install
```

### 3. Configure Environment Variables
Create or update `.env.local` in the project root:
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```
*Note: If no API key is set, StudyMate AI automatically runs with a built-in smart simulated streaming AI response engine for full offline testing.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment on Vercel

This repository is optimized for one-click deployment on **Vercel**:

1. Push code to your GitHub repository.
2. Import the repository in [Vercel Dashboard](https://vercel.com).
3. Set the Environment Variable `ANTHROPIC_API_KEY`.
4. Click **Deploy**.

---

## 🔮 Future Roadmap & Improvements
- [ ] Integration with Google Drive & Notion database sync.
- [ ] Voice input & spoken response synthesizer.
- [ ] Collaborative study group shared flashcard decks.

---

## 📄 License
Released under the [MIT License](LICENSE).
