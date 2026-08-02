import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, type, count = 5 } = await req.json();

    const questions = [
      {
        id: 'q1',
        type: type || 'mcq',
        question: `What is a fundamental concept in ${topic || 'Computer Science'}?`,
        options: ['Abstract Data Types', 'Static Compilation', 'Linear Memory', 'Dynamic Linkers'],
        correctAnswer: 'Abstract Data Types',
        explanation: 'Abstract Data Types encapsulate data structures and operations independent of implementation details.',
      },
      {
        id: 'q2',
        type: type || 'mcq',
        question: `Which algorithmic complexity is ideal for large-scale data searching in ${topic || 'Computer Science'}?`,
        options: ['O(1) / O(log N)', 'O(N^2)', 'O(N!)', 'O(2^N)'],
        correctAnswer: 'O(1) / O(log N)',
        explanation: 'Logarithmic or constant time searching scales efficiently for millions of elements.',
      },
      {
        id: 'q3',
        type: type || 'tf',
        question: `True or False: Active recall is proven to produce higher long-term retention than re-reading notes.`,
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Active recall forces retrieval pathways in memory, strengthening retention.',
      },
    ];

    return NextResponse.json({ questions: questions.slice(0, count) });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
