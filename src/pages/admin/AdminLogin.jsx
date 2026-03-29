import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'wholemelts2026') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
      {/* Hide Smartsupp Live Chat in Admin Sections */}
      <style>{`
        #smartsupp-widget-container, 
        iframe[name^="smartsupp"],
        [id^="smartsupp"] {
          display: none !important;
        }
      `}</style>
      <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <Lock size={48} />
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Secure Login</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Whole Melt Administration</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.3s'
              }}
              className="focus-primary-border"
            />
          </div>
          
          {error && <div style={{ color: '#ff4d4f', fontSize: '0.85rem' }}>{error}</div>}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
