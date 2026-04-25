import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, FileText, Settings, 
  LogOut, Loader2, Users, Tag, BarChart2, ShieldCheck, Mail, Image,
  MessageSquare, Share2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminTopbar from './AdminTopbar';

const adminNav = [
  {
    group: "Store",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Customers", href: "/admin/customers", icon: Users },
    ]
  },
  {
    group: "Content",
    items: [
      { label: "Daily Info", href: "/admin/blog", icon: FileText },
      { label: "Media Library", href: "/admin/media", icon: Image },
    ]
  },
  {
    group: "Marketing",
    items: [
      { label: "Coupons", href: "/admin/coupons", icon: Tag },
      { label: "Leads & Forms", href: "/admin/marketing", icon: Share2 },
    ]
  },
  {
    group: "Operations",
    items: [
      { label: "Support Desk", href: "/admin/support", icon: MessageSquare },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    ]
  },
  {
    group: "System",
    items: [
      { label: "Permissions", href: "/admin/roles", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
        <Loader2 className="spin" size={32} style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  return (
    <div className="admin-layout">
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
        
        <div className="admin-sidebar__nav-container" style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
          {adminNav.map((group, idx) => (
            <div key={idx} className="admin-sidebar__group">
              <div className="admin-sidebar__group-label">{group.group}</div>
              <div className="admin-sidebar__nav">
                {group.items.map((item, i) => (
                  <NavLink 
                    key={i} 
                    to={item.href} 
                    end={item.end} 
                    className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button onClick={handleLogout} className="admin-nav-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
            <LogOut size={18} />
            Logout & Exit
          </button>
        </div>
      </aside>

      {/* ═══ Main Content Wrapper ═══ */}
      <div className="admin-main-wrapper">
        <AdminTopbar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
