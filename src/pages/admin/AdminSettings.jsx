import React, { useState, useEffect } from 'react';
import { 
  Settings, Globe, Mail, Truck, CreditCard, 
  Save, Loader2, Bell, Shield, Info, 
  ExternalLink, Upload, Trash2, Plus, 
  Smartphone, Monitor, Zap, Palette
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Settings State
  const [settings, setSettings] = useState({
    general: {
      site_name: 'Whole Melts Extracts',
      site_tagline: 'Premium Concentrates & Disposables',
      contact_email: 'admin@wholemeltsextracts.com',
      contact_phone: '+1 (555) 000-0000',
      currency: 'USD',
      timezone: 'UTC-5 (EST)'
    },
    seo: {
      meta_title_template: '%page_title% | %site_name%',
      meta_description: 'Whole Melts Extracts offers premium live resin, disposable carts, and badder. Experience the pure essence of California cannabis.',
      google_analytics_id: '',
      robots_txt: 'User-agent: *\nAllow: /'
    },
    email: {
      smtp_host: 'smtp.sendgrid.net',
      smtp_port: '587',
      from_name: 'Whole Melts Orders',
      from_email: 'orders@wholemeltsextracts.com'
    },
    shipping: {
      flat_rate: 15.00,
      free_shipping_threshold: 150.00,
      international_shipping: true,
      zones: [
        { name: 'USA Domestic', rate: 10.00 },
        { name: 'Canada', rate: 25.00 }
      ]
    },
    payments: {
      stripe_enabled: true,
      crypto_enabled: true,
      manual_transfer_instructions: 'Please send payment to our Bitcoin address: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
    }
  });

  useEffect(() => {
    // In a real app, fetch from Supabase
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Logic to save to Supabase public.settings table
      addToast('Success', 'Settings saved successfully', 'success');
    } catch (err) {
      addToast('Error', 'Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
    { id: 'seo', label: 'SEO & Metadata', icon: <Globe size={18} /> },
    { id: 'email', label: 'Email & SMTP', icon: <Mail size={18} /> },
    { id: 'shipping', label: 'Shipping & Logistics', icon: <Truck size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> }
  ];

  return (
    <div className="admin-settings-page">
      <div className="admin-header">
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>System Management</div>
          <h1 className="admin-title">Store Configuration</h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {isSaving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        {/* Sidebar Tabs */}
        <div className="admin-card" style={{ padding: '1rem', height: 'fit-content' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
           </div>
        </div>

        {/* Settings Panel */}
        <div className="admin-card" style={{ minHeight: '600px' }}>
           {isLoading ? (
             <div style={{ padding: '4rem', textAlign: 'center' }}>
                <Loader2 className="spin" size={32} style={{ color: 'var(--primary)', margin: '0 auto' }} />
                <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading configuration...</div>
             </div>
           ) : (
             <div className="animate-reveal">
                {activeTab === 'general' && (
                  <div>
                     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Settings color="var(--primary)" /> Store Identity
                     </h2>
                     <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label className="admin-label">Store Name</label>
                              <input type="text" value={settings.general.site_name} onChange={e => setSettings({...settings, general: {...settings.general, site_name: e.target.value}})} className="admin-input" style={{ width: '100%' }} />
                           </div>
                           <div>
                              <label className="admin-label">Tagline</label>
                              <input type="text" value={settings.general.site_tagline} onChange={e => setSettings({...settings, general: {...settings.general, site_tagline: e.target.value}})} className="admin-input" style={{ width: '100%' }} />
                           </div>
                        </div>
                        <div>
                           <label className="admin-label">Contact Email</label>
                           <input type="email" value={settings.general.contact_email} onChange={e => setSettings({...settings, general: {...settings.general, contact_email: e.target.value}})} className="admin-input" style={{ width: '100%' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label className="admin-label">Currency</label>
                              <select className="admin-input" style={{ width: '100%' }}>
                                 <option>USD ($)</option>
                                 <option>EUR (€)</option>
                                 <option>GBP (£)</option>
                              </select>
                           </div>
                           <div>
                              <label className="admin-label">Timezone</label>
                              <select className="admin-input" style={{ width: '100%' }}>
                                 <option>UTC-5 (EST)</option>
                                 <option>UTC+0 (GMT)</option>
                                 <option>UTC+1 (WAT)</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div>
                     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Globe color="var(--primary)" /> Search Engine Optimization
                     </h2>
                     <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                           <label className="admin-label">Global Meta Title Template</label>
                           <input type="text" value={settings.seo.meta_title_template} onChange={e => setSettings({...settings, seo: {...settings.seo, meta_title_template: e.target.value}})} className="admin-input" style={{ width: '100%' }} />
                           <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Use <code>%page_title%</code> and <code>%site_name%</code> as placeholders.</div>
                        </div>
                        <div>
                           <label className="admin-label">Site Meta Description</label>
                           <textarea rows={4} value={settings.seo.meta_description} onChange={e => setSettings({...settings, seo: {...settings.seo, meta_description: e.target.value}})} className="admin-input" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div>
                           <label className="admin-label">Google Analytics Measurement ID</label>
                           <input type="text" placeholder="G-XXXXXXXXXX" value={settings.seo.google_analytics_id} onChange={e => setSettings({...settings, seo: {...settings.seo, google_analytics_id: e.target.value}})} className="admin-input" style={{ width: '100%' }} />
                        </div>
                        <div>
                           <label className="admin-label">Robots.txt</label>
                           <textarea rows={6} value={settings.seo.robots_txt} onChange={e => setSettings({...settings, seo: {...settings.seo, robots_txt: e.target.value}})} className="admin-input" style={{ width: '100%', height: 'auto', fontFamily: 'monospace' }} />
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'email' && (
                  <div>
                     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Mail color="var(--primary)" /> Transactional Email (SMTP)
                     </h2>
                     <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div className="admin-card" style={{ background: 'rgba(212,175,55,0.02)', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                           <Info size={20} color="var(--primary)" />
                           <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Configure your SMTP settings to ensure order confirmations and recovery emails are delivered.</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label className="admin-label">SMTP Host</label>
                              <input type="text" value={settings.email.smtp_host} className="admin-input" style={{ width: '100%' }} />
                           </div>
                           <div>
                              <label className="admin-label">SMTP Port</label>
                              <input type="text" value={settings.email.smtp_port} className="admin-input" style={{ width: '100%' }} />
                           </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label className="admin-label">Sender Name</label>
                              <input type="text" value={settings.email.from_name} className="admin-input" style={{ width: '100%' }} />
                           </div>
                           <div>
                              <label className="admin-label">Sender Email</label>
                              <input type="email" value={settings.email.from_email} className="admin-input" style={{ width: '100%' }} />
                           </div>
                        </div>
                        <button className="btn btn-outline" style={{ width: 'fit-content' }}>Send Test Email</button>
                     </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div>
                     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Truck color="var(--primary)" /> Shipping & Logistics
                     </h2>
                     <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div>
                              <label className="admin-label">Flat Rate Shipping ($)</label>
                              <input type="number" value={settings.shipping.flat_rate} className="admin-input" style={{ width: '100%' }} />
                           </div>
                           <div>
                              <label className="admin-label">Free Shipping Threshold ($)</label>
                              <input type="number" value={settings.shipping.free_shipping_threshold} className="admin-input" style={{ width: '100%' }} />
                           </div>
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                              <label className="admin-label" style={{ margin: 0 }}>Shipping Zones</label>
                              <button className="btn btn-outline btn-sm"><Plus size={14} /> Add Zone</button>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {settings.shipping.zones.map((zone, i) => (
                                <div key={i} className="admin-card" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                   <div>
                                      <div style={{ fontWeight: 600 }}>{zone.name}</div>
                                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rate: ${zone.rate.toFixed(2)}</div>
                                   </div>
                                   <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <button className="admin-topbar__icon" style={{ borderRadius: '6px' }}><Upload size={14} /></button>
                                      <button className="admin-topbar__icon" style={{ borderRadius: '6px', color: '#ff4d4f' }}><Trash2 size={14} /></button>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div>
                     <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CreditCard color="var(--primary)" /> Payment Gateways
                     </h2>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="admin-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <Zap size={24} color="#635bff" />
                              <div>
                                 <div style={{ fontWeight: 700 }}>Stripe Payments</div>
                                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accept credit cards and digital wallets.</div>
                              </div>
                           </div>
                           <div className={`status-badge ${settings.payments.stripe_enabled ? 'paid' : 'pending'}`}>
                              {settings.payments.stripe_enabled ? 'Connected' : 'Disabled'}
                           </div>
                        </div>

                        <div>
                           <label className="admin-label">Manual Transfer / Crypto Instructions</label>
                           <textarea rows={4} value={settings.payments.manual_transfer_instructions} onChange={e => setSettings({...settings, payments: {...settings.payments, manual_transfer_instructions: e.target.value}})} className="admin-input" style={{ width: '100%', height: 'auto' }} />
                        </div>
                     </div>
                  </div>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
