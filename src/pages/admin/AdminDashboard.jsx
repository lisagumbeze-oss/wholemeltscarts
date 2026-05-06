import React from 'react';
import { 
  DollarSign, Package, ShoppingBag, TrendingUp, 
  Plus, Users, ArrowUpRight, ArrowDownRight, 
  ExternalLink, MousePointerClick, FileText, Tag
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { Link } from 'react-router-dom';

// ═══ Mock Data Generators ═══
const revenueData = [
  { name: '01 Apr', total: 4200 }, { name: '05 Apr', total: 3800 },
  { name: '10 Apr', total: 5100 }, { name: '15 Apr', total: 4900 },
  { name: '20 Apr', total: 6200 }, { name: '25 Apr', total: 5800 },
  { name: '30 Apr', total: 7500 },
];

const topProducts = [
  { id: 1, name: 'Whole Melts Live Resin - Blue Dream', sales: 145, revenue: '$4,350', status: 'In Stock' },
  { id: 2, name: 'WME Disposable - Strawberry Cough', sales: 122, revenue: '$3,660', status: 'Low Stock' },
  { id: 3, name: 'Whole Melts Badder - Gelato 41', sales: 98, revenue: '$2,940', status: 'In Stock' },
  { id: 4, name: 'Liquid Diamonds - Pineapple Express', sales: 86, revenue: '$2,580', status: 'In Stock' },
];

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$24,500.00', icon: DollarSign, trend: '+12.5%', isUp: true, detail: 'vs last month' },
    { label: 'Total Orders', value: '1,284', icon: ShoppingBag, trend: '+8.2%', isUp: true, detail: 'vs last month' },
    { label: 'New Customers', value: '184', icon: Users, trend: '-2.4%', isUp: false, detail: 'vs last month' },
    { label: 'Conversion Rate', value: '4.2%', icon: MousePointerClick, trend: '+0.4%', isUp: true, detail: 'vs last week' },
  ];

  return (
    <div className="dashboard-container admin-dashboard">
      {/* ═══ Stats Grid ═══ */}
      <div className="admin-dashboard__stats">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                <stat.icon size={22} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: stat.isUp ? 'var(--accent)' : '#ff4d4f', fontSize: '0.85rem', fontWeight: 600 }}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{stat.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0', color: '#fff' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* ═══ Quick Actions ═══ */}
      <div className="admin-dashboard__actions">
        <Link to="/admin/products" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
          <Plus size={16} /> New Product
        </Link>
        <Link to="/admin/blog" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
          <FileText size={16} /> New Blog Post
        </Link>
        <Link to="/admin/settings" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
          <Tag size={16} /> Create Coupon
        </Link>
      </div>

      <div className="admin-dashboard__chart-row">
        {/* ═══ Revenue Chart ═══ */}
        <div className="admin-card" style={{ padding: '1.5rem 1rem 1rem 0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingLeft: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#fff' }}>Revenue Growth</h2>
            <select style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', borderRadius: '4px', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-muted)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ background: '#080808', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)', fontWeight: 600 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ═══ Small Info Card ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="admin-card" style={{ flex: 1, background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', margin: '0 0 1rem 0' }}>Store Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Uptime</span>
                <span style={{ color: 'var(--accent)' }}>99.9%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pending Sync</span>
                <span style={{ color: 'var(--primary)' }}>3 items</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '0.5rem' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Storage usage: 85% of 5GB</span>
            </div>
          </div>
          
          <div className="admin-card" style={{ flex: 1 }}>
             <h3 style={{ fontSize: '0.9rem', color: '#fff', margin: '0 0 1rem 0' }}>Latest Verification</h3>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={20} />
                </div>
                <div>
                   <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Order #1024</div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified 2m ago</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ═══ Top Products Table ═══ */}
      <div className="admin-card">
        <div className="admin-dashboard__table-head">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#fff' }}>Top Performing Products</h2>
          <Link to="/admin/products" style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View Catalog <ExternalLink size={12} />
          </Link>
        </div>
        <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Revenue</th>
              <th>Status</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map(prod => (
              <tr key={prod.id}>
                <td style={{ fontWeight: 600 }}>{prod.name}</td>
                <td>{prod.sales} units</td>
                <td style={{ fontWeight: 600 }}>{prod.revenue}</td>
                <td>
                  <span className={`status-badge ${prod.status === 'In Stock' ? 'paid' : 'pending'}`} style={{ fontSize: '0.7rem' }}>
                    {prod.status}
                  </span>
                </td>
                <td style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ArrowUpRight size={14} /> +15%
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
