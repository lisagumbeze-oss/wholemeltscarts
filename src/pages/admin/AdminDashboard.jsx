import React from 'react';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$24,500.00', icon: <DollarSign size={24} />, trend: '+12%' },
    { label: 'Pending Manual Payments', value: '8', icon: <ShoppingBag size={24} />, trend: 'Needs Action' },
    { label: 'Active Products', value: '45', icon: <Package size={24} />, trend: '+2 this week' },
    { label: 'Conversion Rate', value: '4.2%', icon: <TrendingUp size={24} />, trend: '+0.4%' },
  ];

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard Overview</h1>
        <div style={{ color: 'var(--text-secondary)' }}>Welcome back, Admin</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>{stat.value}</div>
              <div style={{ color: stat.trend.includes('Needs Action') ? 'var(--primary)' : 'var(--accent)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1024</td>
              <td>Alex Johnson</td>
              <td>CashApp ($alexbuy)</td>
              <td>$145.00</td>
              <td><span className="status-badge pending">Pending verification</span></td>
            </tr>
            <tr>
              <td>#1023</td>
              <td>Maria Silva</td>
              <td>Zelle</td>
              <td>$89.50</td>
              <td><span className="status-badge paid">Verified</span></td>
            </tr>
            <tr>
              <td>#1022</td>
              <td>James Wilson</td>
              <td>Venmo</td>
              <td>$210.00</td>
              <td><span className="status-badge paid">Verified</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
