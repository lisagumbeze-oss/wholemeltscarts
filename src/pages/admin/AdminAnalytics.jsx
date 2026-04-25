import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, 
  Users, Activity, Calendar, Filter, Download,
  ChevronDown, ArrowUpRight, ArrowDownRight, Globe, Smartphone, Monitor
} from 'lucide-react';

// Premium Color Palette
const COLORS = {
  primary: '#D4AF37',
  secondary: '#AA8C2C',
  obsidian: '#080808',
  text: {
    main: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.6)',
    muted: 'rgba(255,255,255,0.4)'
  },
  status: {
    success: '#00E676',
    error: '#FF5252',
    info: '#2196F3'
  },
  charts: ['#D4AF37', '#8E701C', '#4A3B0F', '#B8860B', '#E6C200']
};

const revenueData = [
  { name: 'Mon', value: 4200 },
  { name: 'Tue', value: 3800 },
  { name: 'Wed', value: 5100 },
  { name: 'Thu', value: 4800 },
  { name: 'Fri', value: 6200 },
  { name: 'Sat', value: 7500 },
  { name: 'Sun', value: 6800 },
];

const categoryData = [
  { name: 'Disposables', value: 45 },
  { name: 'Carts', value: 30 },
  { name: 'Extracts', value: 15 },
  { name: 'Merch', value: 10 },
];

const regionalData = [
  { name: 'California', value: 12500 },
  { name: 'Texas', value: 8400 },
  { name: 'New York', value: 7200 },
  { name: 'Florida', value: 6800 },
  { name: 'Other', value: 4500 },
];

const deviceData = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 25 },
  { name: 'Tablet', value: 7 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="admin-analytics-container">
      {/* ═══ Header ═══ */}
      <div className="admin-header" style={{ marginBottom: '2rem' }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Business Intelligence</div>
          <h1 className="admin-title" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>Store Analytics & Insights</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="admin-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
            <Calendar size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Last 7 Days</span>
            <ChevronDown size={14} />
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* ═══ KPI Summary ═══ */}
      <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total Revenue', value: '$45,280.50', trend: '+12.5%', icon: <DollarSign />, color: COLORS.primary },
          { label: 'Total Orders', value: '1,284', trend: '+8.2%', icon: <ShoppingBag />, color: COLORS.status.info },
          { label: 'Conversion Rate', value: '3.42%', trend: '-1.1%', icon: <Activity />, color: COLORS.status.success },
          { label: 'New Customers', value: '412', trend: '+15.4%', icon: <Users />, color: COLORS.status.error },
        ].map((kpi, i) => (
          <div key={i} className="admin-card stats-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{kpi.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: '#fff' }}>{kpi.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.85rem', color: kpi.trend.startsWith('+') ? COLORS.status.success : COLORS.status.error }}>
                  {kpi.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.trend} <span style={{ color: 'var(--text-muted)', marginLeft: '0.25rem' }}>vs last period</span>
                </div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${kpi.color}15`, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {kpi.icon}
              </div>
            </div>
            {/* Subtle background decoration */}
            <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.05 }}>
              {React.cloneElement(kpi.icon, { size: 80 })}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Main Charts ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Revenue Chart */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Revenue Overview</h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} /> Current
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} /> Previous
              </div>
            </div>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>Product Categories</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.charts[index % COLORS.charts.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             {categoryData.map((cat, i) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS.charts[i] }} />
                     {cat.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{cat.value}%</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* ═══ Secondary Charts ═══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '2rem' }}>
        {/* Regional Sales */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>Regional Performance</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="var(--text-secondary)" 
                  axisLine={false} 
                  tickLine={false}
                  width={80}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                   contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>Device Usage</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Mobile App', value: 68, icon: <Smartphone />, color: '#D4AF37' },
              { label: 'Desktop', value: 25, icon: <Monitor />, color: '#8E701C' },
              { label: 'Tablet', value: 7, icon: <Globe />, color: '#4A3B0F' },
            ].map((device, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {React.cloneElement(device.icon, { size: 16 })}
                    {device.label}
                  </div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{device.value}%</div>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${device.value}%`, height: '100%', background: device.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Live Sessions</h3>
            <div className="status-badge paid" style={{ background: 'rgba(0, 230, 118, 0.1)', color: '#00E676', border: 'none', padding: '2px 8px' }}>
               Live
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
            142
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Active users in last 5 minutes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {[
               { city: 'Los Angeles, CA', activity: 'Viewing Cart' },
               { city: 'Miami, FL', activity: 'Placing Order' },
               { city: 'New York, NY', activity: 'Checking Out' },
             ].map((session, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E676' }} />
                  <span style={{ color: '#fff', flex: 1 }}>{session.city}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{session.activity}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
