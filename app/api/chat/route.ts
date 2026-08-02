import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { MODEL_MAP } from '@/lib/anthropic';
import { ClaudeModel } from '@/lib/types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages = [], files = [], model = 'claude-sonnet-4', toolType } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Smart Fallback stream for local test execution without API key
      const simText = `I'm **StudyMate AI** operating in test mode powered by **${model}**.

Here is a structured analysis of your prompt: *"_${prompt}_"*

1. **Core Academic Principle**: Key formulas and definitions should be reviewed via active recall.
2. **Step-by-step logic**: Practice applying these concepts directly to sample exam problems.

\`\`\`python
# Binary Search Tree Verification
def is_valid_bst(node, min_val=float('-inf'), max_val=float('inf')):
    if not node:
        return True
    if not (min_val < node.val < max_val):
        return False
    return is_valid_bst(node.left, min_val, node.val) and is_valid_bst(node.right, node.val, max_val)
\`\`\`

Feel free to attach your PDF slides, ask for quiz questions, or request an ELI5 breakdown!`;

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = simText.split(' ');
          for (let i = 0; i < words.length; i++) {
            controller.enqueue(encoder.encode(words[i] + ' '));
            await new Promise((r) => setTimeout(r, 25));
          }
          const followUps = JSON.stringify([
            'Can you explain this with a real-world example?',
            'Generate 3 practice quiz questions on this',
            'Create flashcards for this topic'
          ]);
          controller.enqueue(encoder.encode(`\n\n[FOLLOWUPS]${followUps}`));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Real Anthropic API execution using SDK
    const anthropic = new Anthropic({ apiKey });
    const targetModel = MODEL_MAP[model as ClaudeModel] || MODEL_MAP['claude-sonnet-4'];

    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }));

    // Insert file contexts into last user prompt
    let userPromptWithFiles = prompt;
    if (files && files.length > 0) {
      const fileContexts = files.map((f: any) => `[Attached File: ${f.name}]\n${f.content}`).join('\n\n');
      userPromptWithFiles = `${fileContexts}\n\nUser Question: ${prompt}`;
    }

    formattedMessages.push({
      role: 'user',
      content: userPromptWithFiles,
    });

    const responseStream = await anthropic.messages.create({
      model: targetModel,
      max_tokens: 2048,
      system: 'You are StudyMate AI, a world-class AI study assistant for college students. Provide clear, accurate, markdown-formatted academic responses, code syntax blocks, and step-by-step logic.',
      messages: formattedMessages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Anthropic API connection error' }, { status: 500 });
  }
}
