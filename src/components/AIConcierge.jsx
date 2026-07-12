import { useState, useRef, useEffect } from 'react';

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Whole Melts Extracts. How can I assist you with our catalog today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    // Add empty assistant message that will be streamed into
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].content += data.text;
                  return updated;
                });
              } else if (data.error) {
                console.error('API Error:', data.error);
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1].content += '\n\n*(Error: Connection interrupted)*';
                  return updated;
                });
              }
            } catch (err) {
              console.error('Error parsing SSE json', err);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = 'Sorry, our concierge is currently offline. Please try again later.';
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`ai-concierge-fab ${isOpen ? 'open' : ''} hover-lift`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Concierge"
      >
        <span className="ai-concierge-fab__icon">
          {isOpen ? '✕' : '✨'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-concierge-window animate-reveal">
          <div className="ai-concierge-header">
            <div>
              <h3 className="ai-concierge-title">AI Concierge</h3>
              <p className="ai-concierge-subtitle">Product Specialist</p>
            </div>
            <button className="ai-concierge-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="ai-concierge-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message-wrapper ${msg.role}`}>
                {msg.role === 'assistant' && <div className="ai-avatar">✨</div>}
                <div className={`ai-message ${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message-wrapper assistant">
                <div className="ai-avatar pulse">✨</div>
                <div className="ai-message assistant typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-concierge-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              className="ai-concierge-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about strains, flavors, prices..."
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="ai-concierge-submit"
              disabled={!input.trim() || isTyping}
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
