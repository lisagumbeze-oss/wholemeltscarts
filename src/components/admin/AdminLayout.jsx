import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };
  return (
    <div className="admin-layout">
      {/* Hide Smartsupp Live Chat in Admin Sections */}
      <style>{`
        #smartsupp-widget-container, 
        iframe[name^="smartsupp"],
        [id^="smartsupp"] {
          display: none !important;
        }
      `}</style>

      {/* ═══ Sidebar ═══ */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          WHOLE MELT <br /> <span style={{ color: '#fff' }}>ADMIN</span>
        </div>
        
        <nav className="admin-sidebar__nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={20} />
            Orders (Manual)
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Package size={20} />
            Products
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FileText size={20} />
            Daily Info
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Settings size={20} />
            Store Settings
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} className="admin-nav-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
            <LogOut size={20} />
            Logout & Exit
          </button>
        </div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
