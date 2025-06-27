'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! How can I support you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'No response from AI';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl border rounded-lg p-4 bg-background shadow-md">
      <div className="h-64 overflow-y-auto space-y-3 mb-4 p-2 bg-muted rounded-md">
        {messages.map((msg, index) => (
          <div key={index} className={`text-sm p-2 rounded ${msg.role === 'user' ? 'bg-primary/10 text-right' : 'bg-secondary/20 text-left'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}
