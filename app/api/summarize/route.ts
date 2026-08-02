import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { notes, style } = await req.json();

    const summary = `### 📚 AI Notes Summary (${style === 'bullets' ? 'Concise Bullet Points' : style === 'executive' ? 'Executive Summary' : 'Formulas & Definitions'})

#### 1. Core High-Yield Concepts
- **Definition**: Fundamental principle governing system operations and state transitions.
- **Key Formula**: $\\text{Velocity} = \\frac{\\Delta d}{\\Delta t}$

#### 2. Essential Takeaways
- Always verify boundary conditions and edge cases.
- Practice active recall rather than passive reading.

#### 3. Common Exam Trap
> Don't confuse memory space allocation with thread execution context.`;

    return NextResponse.json({ summary });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to summarize notes' }, { status: 500 });
  }
}
