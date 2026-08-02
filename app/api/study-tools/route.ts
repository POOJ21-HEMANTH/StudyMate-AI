import { NextRequest, NextResponse } from 'next/server';
import { generateSimulatedResponse } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const { tool, topic, promptText, language, codeSnippet, role, question, answer } = await req.json();

    if (tool === 'flashcards') {
      const cards = [
        {
          id: 'fc-1',
          front: `What is the core definition of ${topic || 'this concept'}?`,
          back: `The fundamental model governing ${topic || 'this concept'} structures and state transformations.`,
          tag: topic || 'Core',
          status: 'unseen',
        },
        {
          id: 'fc-2',
          front: `What is the primary trade-off associated with ${topic || 'this concept'}?`,
          back: `Time complexity vs Space allocation. Optimizing query speed often increases memory overhead.`,
          tag: topic || 'Trade-offs',
          status: 'unseen',
        },
        {
          id: 'fc-3',
          front: `How is ${topic || 'this topic'} tested on college exams?`,
          back: `Instructors focus on edge cases, formula derivations, and step-by-step logic proofs.`,
          tag: 'Exam Strategy',
          status: 'unseen',
        },
      ];
      return NextResponse.json({ cards });
    }

    const promptStr = topic || promptText || codeSnippet || role || question || 'study question';
    const sim = generateSimulatedResponse(promptStr, undefined, tool);
    return NextResponse.json({ result: sim.text });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to process study tool request' }, { status: 500 });
  }
}
