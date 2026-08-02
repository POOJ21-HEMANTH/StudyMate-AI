import { ClaudeModel } from './types';

export const MODEL_MAP: Record<ClaudeModel, string> = {
  'claude-sonnet-4': 'claude-3-7-sonnet-20250219',
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  'claude-3-haiku': 'claude-3-haiku-20240307',
};

export const MODEL_NAMES: Record<ClaudeModel, { name: string; badge: string; desc: string }> = {
  'claude-sonnet-4': {
    name: 'Claude Sonnet 4',
    badge: 'Default (Fast & Deep)',
    desc: 'Most intelligent & capable model for complex STEM, coding & writing.',
  },
  'claude-3-5-sonnet': {
    name: 'Claude 3.5 Sonnet',
    badge: 'High Precision',
    desc: 'Great balance of reasoning, nuance, and speed.',
  },
  'claude-3-haiku': {
    name: 'Claude 3 Haiku',
    badge: 'Ultra Fast',
    desc: 'Lightweight model for quick flashcards, summaries & Q&A.',
  },
};

/**
 * Intelligent Fallback Generator for offline/demo mode without API Key
 */
export function generateSimulatedResponse(prompt: string, context?: string, tool?: string): { text: string; followUps: string[] } {
  const lower = prompt.toLowerCase();
  let followUps = [
    'Can you give me a real-world example?',
    'How will this be tested on an exam?',
    'Can you quiz me on this concept?'
  ];

  if (tool === 'eli5' || lower.includes('explain like i\'m 5') || lower.includes('eli5')) {
    return {
      text: `### 🎈 Imagine You're Building a Lego Castle!

Think of **${prompt.slice(0, 40)}** like instructions for putting Lego bricks together:

1. **The Foundation (Input)**: You start with a big box of loose pieces (raw data).
2. **The Blueprint (Logic)**: Instead of guessing, you follow special color-coded instructions so every piece connects securely.
3. **The Castle (Output)**: Once finished, you get a sturdy castle that can withstand a playful push!

---

> 💡 **Key Takeaway**: Complex topics are just tiny, simple rules stacked on top of each other. Master the single brick, and the whole castle makes sense!`,
      followUps: [
        'Give me another analogy for this',
        'What is a common misconception about this?',
        'How does this apply in software engineering?'
      ]
    };
  }

  if (tool === 'code' || lower.includes('code') || lower.includes('python') || lower.includes('function') || lower.includes('java') || lower.includes('sql')) {
    return {
      text: `Here is a clear, line-by-line breakdown and optimized solution:

\`\`\`python
# Binary Search Implementation - O(log N) Time Complexity
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found target at index 'mid'
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
            
    return -1  # Target not in list

# Test execution
sample_data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Index of 23:", binary_search(sample_data, 23)) # Output: 5
\`\`\`

### 📊 Time & Space Complexity:
- **Time Complexity**: $\\mathcal{O}(\\log N)$ — Splitting search space in half each iteration.
- **Space Complexity**: $\\mathcal{O}(1)$ — Auxiliary memory allocation is constant.

### ⚠️ Common Pitfalls:
1. **Integer Overflow**: In languages like C/Java, compute \`left + (right - left) // 2\` to avoid overflow.
2. **Off-by-one errors**: Ensure the condition is \`left <= right\` rather than \`left < right\`.`,
      followUps: [
        'How do I implement this in C++?',
        'What is the edge case when array length is 0?',
        'How would I solve this recursively?'
      ]
    };
  }

  if (tool === 'assignment' || lower.includes('assignment') || lower.includes('homework')) {
    return {
      text: `### 🎓 Academic Integrity Problem-Solving Guide

Here is a step-by-step framework to approach this assignment independently:

#### 1. Analyze the Problem Statement
- **Goal**: Identify what the output requires (e.g. proof, numerical answer, algorithmic solution).
- **Given Inputs**: Note constraints, edge cases, and required formatting.

#### 2. Core Concepts Required
- Review chapter notes on **Core Algorithms** and **Data Structures**.
- Key formula / theorem: $f(x) = \\sum_{i=1}^n x_i$.

#### 3. Step-by-Step Logic Outline
1. Set up your base variables.
2. Iterate through input elements checking boundary conditions.
3. Validate output correctness against known test cases.

> 🛡️ **Reminder**: Writing code in your own words builds real mastery for technical interviews!`,
      followUps: [
        'Can you review my pseudocode?',
        'What edge cases should I test?',
        'Explain the theoretical foundation'
      ]
    };
  }

  if (tool === 'interview' || lower.includes('interview')) {
    return {
      text: `### 🎤 Technical Interview Question

**Question**: *How would you design a rate-limiting system for a high-traffic REST API using Redis?*

#### 💡 Expected Discussion Points:
1. **Algorithms**: Token Bucket vs Sliding Window Log vs Leaky Bucket.
2. **Concurrency**: Handling race conditions in distributed systems using Redis Lua scripts.
3. **HTTP Headers**: Returning \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, and \`429 Too Many Requests\`.

---

**Try Answering Below!** Type your response in the box and I will evaluate your technical depth, clarity, and system design trade-offs.`,
      followUps: [
        'Give me an algorithm question instead',
        'How do I structure a STAR method answer?',
        'Evaluate my answer now'
      ]
    };
  }

  if (tool === 'revision' || lower.includes('revision') || lower.includes('exam')) {
    return {
      text: `### ⚡ High-Yield Exam Cheat Sheet

#### 1. Essential Terminology
- **Atomicity**: All operations in a transaction succeed or all fail.
- **Consistency**: Database state transitions from one valid state to another.
- **Isolation**: Concurrent transactions execute independently.
- **Durability**: Committed data survives system crashes.

#### 2. Must-Know Formulas
$$\\text{Throughput} = \\frac{\\text{Total Requests}}{\\text{Total Time Elapsed}}$$

#### 3. 🚨 High-Frequency Exam Trap
> **Don't confuse Threads with Processes!** Processes have separate virtual memory spaces; threads share the memory space of their parent process.`,
      followUps: [
        'Generate 5 quick flashcard questions',
        'What are the top 3 hardest concepts in this subject?',
        'Create a 15-minute practice test'
      ]
    };
  }

  // Standard Chat Response
  return {
    text: `Hello! I'm **StudyMate AI** powered by **Claude Sonnet 4**. I'm here to help you conquer your college coursework!

Based on your prompt: *"_${prompt}_"*

Here is a structured overview:

1. **Core Concept**: Understanding key principles is the fastest way to retain knowledge long-term.
2. **Practical Application**: Connecting theoretical formulas to real-world software & engineering practices.
3. **Exam Readiness**: Practice solving problems actively rather than passively re-reading slides.

\`\`\`javascript
// Example helper function for active recall
function calcRetentionRate(reviewIntervalDays) {
  return Math.exp(-0.5 * reviewIntervalDays);
}
\`\`\`

Feel free to upload your lecture PDF, ask for practice quiz questions, or request a step-by-step breakdown!`,
    followUps
  };
}
