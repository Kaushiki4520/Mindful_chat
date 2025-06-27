import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || !messages.every(m => m.role && m.content)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const apiKey = '60f22532c81143d5a0e865eb9cf6593e';
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 60f22532c81143d5a0e865eb9cf6593e`,
        "HTTP-Referer": "https://googgle.com", 
        "X-Title": "MindfulChat AI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter Error:', {
        status: response.status,
        error: errorData
      });
      return NextResponse.json({ 
        error: 'OpenRouter API error',
        details: errorData 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
