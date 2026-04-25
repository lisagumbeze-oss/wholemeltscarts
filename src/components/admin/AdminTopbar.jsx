import React from 'react';
import { Search, Bell, User, Command } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AdminTopbar() {
  const location = useLocation();
  
  // Simple breadcrumb logic
  const pathnames = location.pathname.split('/').filter((x) => x);
  const pageTitle = pathnames[pathnames.length - 1] || 'Dashboard';

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'capitalize', margin: 0 }}>
          {pageTitle.replace('-', ' ')}
        </h2>
        
        <div className="admin-topbar__search">
          <Search size={16} color="var(--text-muted)" />
          <input type="text" placeholder="Search orders, products..." />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div className="admin-topbar__actions">
        <div className="admin-topbar__icon" style={{ position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', border: '2px solid #080808' }}></span>
        </div>
        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} className="admin-topbar__icon">
          <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Super Admin</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Administrator</div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
