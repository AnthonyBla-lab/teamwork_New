import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Hi! I am your AI helper. What do you need help with today?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Team Work AI</h1>
      <div style={{ marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        style={{ padding: 8, width: '70%' }}
      />
      <button onClick={handleSend} style={{ padding: 8, marginLeft: 5 }}>Send</button>
    </main>
  );
}
