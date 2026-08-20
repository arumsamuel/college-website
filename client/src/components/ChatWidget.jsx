import { useEffect, useRef, useState } from 'react';
import api from '../lib/api';

// Site-wide floating AI assistant widget
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId] = useState(() => 'cw-' + Math.random().toString(36).slice(2, 10));
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { sender: 'user', text }]);
    setInput('');
    setTyping(true);
    try {
      const history = messages.map(m => ({ sender: m.sender === 'user' ? 'user' : 'bot', message: m.text }));
      const data = await api.chat({ message: text, session_id: sessionId, history });
      setMessages(m => [...m, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(m => [...m, { sender: 'bot', text: 'Sorry, I had trouble connecting. Please contact the Admissions Office at admissions@college.edu or call +1 (555) 010-2000.' }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {!open && (
        <button className="chat-widget-fab" onClick={() => setOpen(true)} aria-label="Open AI chat assistant" title="Chat with our AI assistant">
          💬
        </button>
      )}
      {open && (
        <div className="chat-widget" role="dialog" aria-label="AI chat assistant">
          <div className="chat-widget-header">
            <div>
              <strong>College Assistant</strong>
              <div style={{ fontSize: '0.75rem', opacity: 0.75 }}>AI powered · not a human</div>
            </div>
            <button className="chat-widget-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="msg bot">
                Hi! 👋 I'm the College AI assistant. I can help with admissions requirements, deadlines, programs, tuition, campus life, and portal logins. How can I help?
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>{m.text}</div>
            ))}
            {typing && (
              <div className="msg bot">
                <div className="typing"><span /><span /><span /></div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form className="chat-input-row" onSubmit={send}>
            <input
              className="form-control"
              placeholder="Ask about admissions, deadlines, programs..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Type your question"
            />
            <button type="submit" className="btn btn-gold" disabled={!input.trim()}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
