import React from 'react';
import { Search, Bell, User, Command, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AdminTopbar({ onMenuToggle = () => {}, menuOpen }) {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const pageTitle = pathnames[pathnames.length - 1] || 'Dashboard';

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__primary">
        <button
          type="button"
          className="admin-topbar__menu-btn"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={Boolean(menuOpen)}
          onClick={onMenuToggle}
        >
          <Menu size={22} />
        </button>
        <h2 className="admin-topbar__title">
          {pageTitle.replace('-', ' ')}
        </h2>

        <div className="admin-topbar__search">
          <Search size={16} color="var(--text-muted)" aria-hidden />
          <input type="text" placeholder="Search orders, products..." />
          <span className="admin-topbar__kbd" aria-hidden>
            <Command size={10} /> K
          </span>
        </div>
      </div>

      <div className="admin-topbar__actions">
        <div className="admin-topbar__icon" style={{ position: 'relative' }}>
          <Bell size={20} />
          <span className="admin-topbar__badge" aria-hidden />
        </div>
        <div className="admin-topbar__divider" aria-hidden />
        <div className="admin-topbar__icon admin-topbar__user">
          <div className="admin-topbar__user-text">
            <div className="admin-topbar__user-name">Super Admin</div>
            <div className="admin-topbar__user-role">Administrator</div>
          </div>
          <div className="admin-topbar__avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
