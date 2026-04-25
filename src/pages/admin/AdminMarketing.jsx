import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Mail, MousePointer2, 
  Search, Download, Plus, Filter,
  MoreVertical, ChevronRight, CheckCircle2,
  AlertCircle, FileText, Send, Share2, Eye
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';

export default function AdminMarketing() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('submissions');
  const [isLoading, setIsLoading] = useState(true);

  // Mock Submission Data
  const [submissions, setSubmissions] = useState([
    { id: 'SUB-9921', form_name: 'Contact Us', email: 'alex@example.com', date: '2h ago', status: 'new' },
    { id: 'SUB-9920', form_name: 'Wholesale Inquiry', email: 'dispensary@cali.com', date: '5h ago', status: 'read' },
    { id: 'SUB-9919', form_name: 'Contact Us', email: 'mike@gmail.com', date: '1d ago', status: 'read' },
    { id: 'SUB-9918', form_name: 'Wholesale Inquiry', email: 'green@herb.org', date: '2d ago', status: 'processed' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new': return { background: 'rgba(33, 150, 243, 0.1)', color: '#2196F3' };
      case 'read': return { background: 'rgba(255, 179, 0, 0.1)', color: '#FFB300' };
      case 'processed': return { background: 'rgba(0, 230, 118, 0.1)', color: '#00E676' };
      default: return {};
    }
  };

  return (
    <div className="admin-marketing-page">
      <div className="admin-header">
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Growth & Lead Capture</div>
          <h1 className="admin-title">Marketing Hub</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Download size={18} /> Export Leads
           </button>
           <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Plus size={18} /> New Form
           </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
         {[
           { label: 'Total Leads', value: '1,284', change: '+12%', icon: <Users /> },
           { label: 'Form Conv. Rate', value: '4.2%', change: '+0.5%', icon: <MousePointer2 /> },
           { label: 'Newsletter Subs', value: '850', change: '+24', icon: <Mail /> },
           { label: 'Form Submissions', value: '42', change: 'This Week', icon: <BarChart3 /> }
         ].map((stat, i) => (
           <div key={i} className="admin-card stats-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.75rem', color: stat.change.startsWith('+') ? '#00E676' : 'var(--text-muted)' }}>{stat.change}</div>
                 </div>
                 <div style={{ color: 'var(--primary)' }}>{stat.icon}</div>
              </div>
           </div>
         ))}
      </div>

      {/* Tabs */}
      <div className="admin-drawer__tabs" style={{ marginBottom: '2rem' }}>
         <button onClick={() => setActiveTab('submissions')} className={`admin-drawer__tab ${activeTab === 'submissions' ? 'active' : ''}`}><FileText size={16} /> Submissions</button>
         <button onClick={() => setActiveTab('forms')} className={`admin-drawer__tab ${activeTab === 'forms' ? 'active' : ''}`}><Share2 size={16} /> Active Forms</button>
         <button onClick={() => setActiveTab('newsletter')} className={`admin-drawer__tab ${activeTab === 'newsletter' ? 'active' : ''}`}><Send size={16} /> Newsletter List</button>
      </div>

      {/* Content */}
      <div className="admin-card" style={{ padding: 0 }}>
         {activeTab === 'submissions' && (
           <table className="admin-table">
              <thead>
                <tr>
                  <th>Form Name</th>
                  <th>Submitter</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                 {submissions.map(sub => (
                   <tr key={sub.id} className="admin-table-row">
                      <td>
                         <div style={{ fontWeight: 600 }}>{sub.form_name}</div>
                         <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {sub.id}</div>
                      </td>
                      <td>{sub.email}</td>
                      <td>{sub.date}</td>
                      <td>
                         <span className="status-badge" style={getStatusStyle(sub.status)}>{sub.status}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                         <button className="admin-topbar__icon" style={{ borderRadius: '8px' }}><Eye size={16} /></button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
         )}

         {activeTab === 'forms' && (
           <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                 <AlertCircle size={40} color="var(--primary)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                 <h3 style={{ marginBottom: '0.5rem' }}>Visual Form Builder</h3>
                 <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Our drag-and-drop form builder is being optimized for mobile performance. Use the "New Form" button to create high-converting lead magnets.
                 </p>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}
