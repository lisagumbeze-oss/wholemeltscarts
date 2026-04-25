import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, User, Mail, MapPin, 
  ShoppingBag, Calendar, Star, ChevronRight,
  MoreVertical, Download, Plus, CheckCircle2,
  Clock, X, Mail as MailIcon, Phone
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

// Mock Customers for seed/fallback
const mockCustomers = [
  {
    id: 1,
    name: 'James Harrison',
    email: 'james.h@example.com',
    location: 'Los Angeles, CA',
    orders: 12,
    spent: 2450.00,
    status: 'VIP',
    lastActive: '2025-10-24',
    joined: '2024-05-12'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    location: 'Miami, FL',
    orders: 5,
    spent: 840.50,
    status: 'Regular',
    lastActive: '2025-10-25',
    joined: '2025-01-15'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'm.chen88@outlook.com',
    location: 'New York, NY',
    orders: 28,
    spent: 5120.00,
    status: 'Wholesale',
    lastActive: '2025-10-25',
    joined: '2023-11-20'
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    email: 'elena.rod@example.com',
    location: 'Austin, TX',
    orders: 2,
    spent: 125.00,
    status: 'New',
    lastActive: '2025-10-20',
    joined: '2025-10-18'
  }
];

export default function AdminCustomers() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Drawer/Details State
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Attempt to fetch from profiles or orders table
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        // In a real app, we'd have a 'profiles' or 'customers' table
        // For now, we'll use our high-fidelity mock data to represent the intended UI
        setCustomers(mockCustomers);
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'VIP': return <span className="status-badge paid" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>★ VIP</span>;
      case 'Wholesale': return <span className="status-badge paid" style={{ background: 'rgba(33, 150, 243, 0.1)', color: '#2196F3' }}>Wholesale</span>;
      case 'New': return <span className="status-badge pending">New</span>;
      default: return <span className="status-badge shipped" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Regular</span>;
    }
  };

  return (
    <div className="admin-customers-container">
      {/* ═══ Header ═══ */}
      <div className="admin-header" style={{ marginBottom: '2rem' }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Relationship Management</div>
          <h1 className="admin-title" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>Customer Directory</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Download size={18} /> Export List
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Plus size={18} /> Add Customer
          </button>
        </div>
      </div>

      {/* ═══ Stats Bar ═══ */}
      <div className="admin-stats-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Active Customers', value: '1,482', icon: <Users />, color: 'var(--primary)' },
          { label: 'VIP Members', value: '124', icon: <Star />, color: '#D4AF37' },
          { label: 'Avg. Lifetime Value', value: '$245.80', icon: <ShoppingBag />, color: '#00E676' },
          { label: 'Churn Rate', value: '2.4%', icon: <Clock />, color: '#FF5252' },
        ].map((stat, i) => (
          <div key={i} className="admin-card stats-card">
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{stat.label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{stat.value}</div>
               <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Filters ═══ */}
      <div className="admin-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name, email or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input" 
              style={{ width: '100%', paddingLeft: '3rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-input" 
              style={{ minWidth: '150px' }}
            >
              <option value="all">All Status</option>
              <option value="vip">VIP Only</option>
              <option value="wholesale">Wholesale</option>
              <option value="regular">Regular</option>
              <option value="new">New Members</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══ Customer Table ═══ */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Active</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="admin-table-row" onClick={() => openCustomerDetails(customer)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{customer.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td>{getStatusBadge(customer.status)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <MapPin size={14} /> {customer.location}
                  </div>
                </td>
                <td>
                  <div style={{ color: '#fff', fontSize: '0.9rem' }}>{customer.orders} orders</div>
                </td>
                <td>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>${customer.spent.toLocaleString()}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(customer.lastActive).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                   <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="admin-topbar__icon" style={{ borderRadius: '8px' }}><Mail size={16} /></button>
                      <button className="admin-topbar__icon" style={{ borderRadius: '8px' }}><MoreVertical size={16} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ Customer Detail Drawer ═══ */}
      {isDrawerOpen && selectedCustomer && (
        <>
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
          <div className="admin-drawer" style={{ width: '500px' }}>
            <div className="admin-drawer__header">
              <h2 className="admin-drawer__title">Customer Profile</h2>
              <button className="admin-drawer__close" onClick={() => setIsDrawerOpen(false)}><X size={24} /></button>
            </div>

            <div className="admin-drawer__content">
              {/* Profile Card */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800, margin: '0 auto 1.5rem' }}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>{selectedCustomer.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                   {getStatusBadge(selectedCustomer.status)}
                   <span className="status-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>ID: #{selectedCustomer.id}</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <MailIcon size={16} /> Send Email
                  </button>
                  <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={16} /> Call
                  </button>
                </div>
              </div>

              {/* Information Blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="admin-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
                   <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Information</div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <MailIcon size={18} color="var(--primary)" />
                        <div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Address</div>
                          <div style={{ color: '#fff' }}>{selectedCustomer.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <MapPin size={18} color="var(--primary)" />
                        <div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Primary Location</div>
                          <div style={{ color: '#fff' }}>{selectedCustomer.location}</div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="admin-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
                   <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Engagement History</div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Orders</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{selectedCustomer.orders}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lifetime Value</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>${selectedCustomer.spent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer Since</div>
                        <div style={{ color: '#fff' }}>{new Date(selectedCustomer.joined).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last Purchase</div>
                        <div style={{ color: '#fff' }}>{new Date(selectedCustomer.lastActive).toLocaleDateString()}</div>
                      </div>
                   </div>
                </div>
                
                <div style={{ padding: '0 0.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#fff' }}>Recent Transactions</h4>
                      <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', cursor: 'pointer' }}>View All</button>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {[1, 2].map(i => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                           <div>
                              <div style={{ color: '#fff', fontSize: '0.9rem' }}>Order #928{i}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oct {24-i}, 2025</div>
                           </div>
                           <div style={{ textAlign: 'right' }}>
                              <div style={{ color: '#fff', fontWeight: 600 }}>$145.00</div>
                              <div className="status-badge paid" style={{ fontSize: '0.7rem' }}>Delivered</div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="admin-drawer__footer" style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn btn-outline" style={{ flex: 1, color: '#ff4d4f', borderColor: 'rgba(255, 77, 79, 0.2)' }}>Suspend Account</button>
               <button className="btn btn-primary" style={{ flex: 2 }}>Edit Profile Info</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
