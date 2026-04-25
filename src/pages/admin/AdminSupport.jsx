import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageSquare, User, Clock, AlertCircle, 
  Search, Filter, X, Send, Paperclip,
  CheckCircle2, MoreVertical, ChevronRight,
  Shield, UserCheck, MessageCircle, Mail
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';

export default function AdminSupport() {
  const { addToast } = useToast();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // Mock Data for now
  const mockTickets = [
    {
      id: 'TCK-1001',
      customer_name: 'John Doe',
      subject: 'Order #4582 not received',
      priority: 'high',
      status: 'open',
      created_at: new Date().toISOString(),
      messages: [
        { role: 'customer', text: "Hello, my order hasn't arrived yet. It was supposed to be here 3 days ago.", time: '2h ago' }
      ]
    },
    {
      id: 'TCK-1002',
      customer_name: 'Sarah Smith',
      subject: 'Question about Live Resin shelf life',
      priority: 'medium',
      status: 'pending',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      messages: [
        { role: 'customer', text: "How long can I store the live resin before it loses potency?", time: '1d ago' },
        { role: 'admin', text: "Hi Sarah, our live resin stays fresh for up to 6 months if kept in a cool, dark place.", time: '18h ago' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setTickets(mockTickets);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#ffb300';
      case 'low': return '#2196f3';
      default: return 'var(--text-muted)';
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const newMessage = { role: 'admin', text: replyText, time: 'Just now' };
    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage]
    });
    setReplyText('');
    addToast('Success', 'Reply sent successfully', 'success');
  };

  return (
    <div className="admin-support-page">
      <div className="admin-header">
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Customer Service</div>
          <h1 className="admin-title">Support Desk</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <div className="status-badge paid" style={{ height: 'fit-content' }}>3 Open Tickets</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem', height: 'calc(100vh - 250px)' }}>
        {/* Ticket List */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
           <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="search-box" style={{ position: 'relative' }}>
                 <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                 <input type="text" placeholder="Search tickets..." className="admin-input" style={{ width: '100%', paddingLeft: '2.5rem', fontSize: '0.85rem' }} />
              </div>
           </div>
           
           <div style={{ flex: 1, overflowY: 'auto' }}>
              {isLoading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}><Loader2 className="spin" size={24} style={{ margin: '0 auto' }} /></div>
              ) : (
                tickets.map(ticket => (
                  <div 
                    key={ticket.id} 
                    onClick={() => setSelectedTicket(ticket)}
                    style={{ 
                      padding: '1.25rem', 
                      borderBottom: '1px solid rgba(255,255,255,0.03)', 
                      cursor: 'pointer',
                      background: selectedTicket?.id === ticket.id ? 'rgba(212,175,55,0.05)' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{ticket.id}</span>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getPriorityColor(ticket.priority) }} />
                     </div>
                     <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '0.25rem' }}>{ticket.subject}</div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ticket.customer_name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ticket.messages[ticket.messages.length - 1].time}</span>
                     </div>
                  </div>
                ))
              )}
           </div>
        </div>

        {/* Conversation Area */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
           {selectedTicket ? (
             <>
               {/* Chat Header */}
               <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                     <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{selectedTicket.subject}</h2>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From: {selectedTicket.customer_name}</span>
                        <span className={`status-badge ${selectedTicket.status === 'open' ? 'pending' : 'paid'}`} style={{ fontSize: '0.65rem' }}>{selectedTicket.status}</span>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                     <button className="btn btn-outline btn-sm">Close Ticket</button>
                     <button className="admin-topbar__icon" style={{ borderRadius: '8px' }}><MoreVertical size={18} /></button>
                  </div>
               </div>

               {/* Messages */}
               <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                  {selectedTicket.messages.map((msg, i) => (
                    <div key={i} style={{ 
                      maxWidth: '80%', 
                      alignSelf: msg.role === 'admin' ? 'flex-end' : 'flex-start',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.role === 'admin' ? 'flex-end' : 'flex-start'
                    }}>
                       <div style={{ 
                         padding: '1rem 1.25rem', 
                         borderRadius: '16px',
                         background: msg.role === 'admin' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                         color: msg.role === 'admin' ? '#000' : '#fff',
                         fontSize: '0.95rem',
                         lineHeight: 1.5,
                         border: msg.role === 'admin' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                         borderBottomRightRadius: msg.role === 'admin' ? '4px' : '16px',
                         borderBottomLeftRadius: msg.role === 'admin' ? '16px' : '4px'
                       }}>
                          {msg.text}
                       </div>
                       <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{msg.time}</span>
                    </div>
                  ))}
               </div>

               {/* Reply Box */}
               <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ position: 'relative' }}>
                     <textarea 
                       value={replyText}
                       onChange={(e) => setReplyText(e.target.value)}
                       placeholder="Type your reply here..." 
                       className="admin-input" 
                       style={{ width: '100%', height: '100px', resize: 'none', paddingRight: '4rem' }}
                     />
                     <div style={{ position: 'absolute', right: '0.75rem', bottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                        <button className="admin-topbar__icon" style={{ padding: '0.5rem' }}><Paperclip size={18} /></button>
                        <button onClick={handleSendReply} className="btn btn-primary btn-sm" style={{ padding: '0.5rem' }}><Send size={18} /></button>
                     </div>
                  </div>
               </div>
             </>
           ) : (
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '1rem' }}>
                <MessageCircle size={48} opacity={0.2} />
                <div>Select a ticket to view the conversation</div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
