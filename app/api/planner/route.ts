import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { examDate, dailyHours = 4, subjects = [] } = await req.json();

    const items = [
      {
        id: 'p-1',
        date: 'Day 1',
        subject: subjects[0] || 'Core Subject',
        topic: 'High-Yield Theoretical Principles & Definitions',
        hours: Math.ceil(dailyHours / 2),
        completed: false,
        priority: 'high',
      },
      {
        id: 'p-2',
        date: 'Day 1',
        subject: subjects[1] || subjects[0] || 'Secondary Subject',
        topic: 'Practice Problem Solving & Active Recall',
        hours: Math.floor(dailyHours / 2),
        completed: false,
        priority: 'high',
      },
      {
        id: 'p-3',
        date: 'Day 2',
        subject: subjects[0] || 'Core Subject',
        topic: 'Advanced Problem Solving & Formula Proofs',
        hours: Math.ceil(dailyHours / 2),
        completed: false,
        priority: 'medium',
      },
      {
        id: 'p-4',
        date: 'Day 2',
        subject: subjects[2] || subjects[0] || 'Third Subject',
        topic: 'Past Exam Question Review & Pitfalls',
        hours: Math.floor(dailyHours / 2),
        completed: false,
        priority: 'high',
      },
    ];

    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to generate study plan' }, { status: 500 });
  }
}
