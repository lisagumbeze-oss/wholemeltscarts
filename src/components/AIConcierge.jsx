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
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
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
      // Mock response for frontend demonstration
      await new Promise(resolve => setTimeout(resolve, 600));
      const mockResponse = "Hello! I'm your Whole Melts AI Concierge. Since I'm currently in demo mode, I can't look up specific inventory right now. Feel free to explore our product catalog, or chat with our live human agents using the chat icon in the bottom right!";
      
      const words = mockResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 40));
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content += (i === 0 ? '' : ' ') + words[i];
          return updated;
        });
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
