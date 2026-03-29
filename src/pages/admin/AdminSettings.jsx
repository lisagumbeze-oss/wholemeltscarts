import React, { useState } from 'react';
import { CreditCard, Truck, Tag, Save, Plus, Trash2, Edit2, XCircle } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('payments');

  // State
  const [payments, setPayments] = useState([
    { id: 1, name: 'CashApp', detail: '$wholemeltsus', status: 'active' },
    { id: 2, name: 'Zelle', detail: 'sales@wholemeltscarts.us', status: 'active' },
    { id: 3, name: 'Venmo', detail: '@WholeMeltExtracts', status: 'active' }
  ]);

  const [shipping, setShipping] = useState([
    { id: 1, name: 'Standard Shipping', rate: 0.00, condition: 'Orders above $200 (3-5 Days)', status: 'active' },
    { id: 2, name: 'USPS Priority', rate: 15.00, condition: 'Flat Rate (2-3 Days)', status: 'active' },
    { id: 3, name: 'Overnight Express', rate: 45.00, condition: 'Next Day Delivery', status: 'disabled' }
  ]);

  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WHOLE20', discount: '20% Off', limit: 'One per user', status: 'active' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping', limit: 'Min order $150', status: 'active' },
    { id: 3, code: 'SUMMERVIBES', discount: '15% Off', limit: 'Expired', status: 'expired' }
  ]);

  const [editingItem, setEditingItem] = useState(null); // { type, item }

  // Generic Handlers
  const handleDelete = (type, id) => {
    if (type === 'payment') setPayments(payments.filter(p => p.id !== id));
    if (type === 'shipping') setShipping(shipping.filter(s => s.id !== id));
    if (type === 'coupon') setCoupons(coupons.filter(c => c.id !== id));
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, item: { ...item } });
  };

  const handleAdd = (type) => {
    if (type === 'payment') setEditingItem({ type, item: { id: Date.now(), name: '', detail: '', status: 'active' } });
    if (type === 'shipping') setEditingItem({ type, item: { id: Date.now(), name: '', rate: 0, condition: '', status: 'active' } });
    if (type === 'coupon') setEditingItem({ type, item: { id: Date.now(), code: '', discount: '', limit: '', status: 'active' } });
  };

  const handleSaveModal = () => {
    const { type, item } = editingItem;
    if (type === 'payment') {
      const exists = payments.find(p => p.id === item.id);
      if (exists) setPayments(payments.map(p => p.id === item.id ? item : p));
      else setPayments([...payments, item]);
    }
    if (type === 'shipping') {
      const exists = shipping.find(s => s.id === item.id);
      if (exists) setShipping(shipping.map(s => s.id === item.id ? item : s));
      else setShipping([...shipping, item]);
    }
    if (type === 'coupon') {
      const exists = coupons.find(c => c.id === item.id);
      if (exists) setCoupons(coupons.map(c => c.id === item.id ? item : c));
      else setCoupons([...coupons, item]);
    }
    setEditingItem(null);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Store Settings</h1>
          <div style={{ color: 'var(--text-secondary)' }}>Configure payments, shipping rates, and promotional codes.</div>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Save size={18} /> Save Settings
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Settings Navigation */}
        <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button onClick={() => setActiveTab('payments')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === 'payments' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', color: activeTab === 'payments' ? 'var(--primary)' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 500 }}>
            <CreditCard size={20} /> Payment Methods
          </button>
          <button onClick={() => setActiveTab('shipping')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === 'shipping' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', color: activeTab === 'shipping' ? 'var(--primary)' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 500 }}>
            <Truck size={20} /> Shipping Logic
          </button>
          <button onClick={() => setActiveTab('coupons')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === 'coupons' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', color: activeTab === 'coupons' ? 'var(--primary)' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 500 }}>
            <Tag size={20} /> Promo Codes
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="admin-card" style={{ flex: 1 }}>
          
          {/* Payments */}
          {activeTab === 'payments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Manual Payment Configuration</h2>
                <button onClick={() => handleAdd('payment')} className="btn btn-outline btn-sm" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Plus size={14} /> Add Payment Method</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {payments.map(pay => (
                  <div key={pay.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {pay.name} 
                        <span className={`status-badge ${pay.status === 'active' ? 'paid' : 'pending'}`} style={{ fontSize: '0.7rem' }}>{pay.status.toUpperCase()}</span>
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <Edit2 onClick={() => handleEdit('payment', pay)} size={16} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                        <Trash2 onClick={() => handleDelete('payment', pay.id)} size={16} style={{ cursor: 'pointer', color: '#ff4d4f' }} />
                      </div>
                    </div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Account Detail</label>
                    <div style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}>{pay.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping */}
          {activeTab === 'shipping' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Shipping Rates & Thresholds</h2>
                <button onClick={() => handleAdd('shipping')} className="btn btn-outline btn-sm" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Plus size={14} /> Add Shipping Rate</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Method Name</th>
                    <th>Rate</th>
                    <th>Condition / Delivery Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipping.map(ship => (
                    <tr key={ship.id}>
                      <td style={{ fontWeight: 600 }}>{ship.name}</td>
                      <td>${Number(ship.rate).toFixed(2)}</td>
                      <td>{ship.condition}</td>
                      <td><span className={`status-badge ${ship.status === 'active' ? 'paid' : 'pending'}`}>{ship.status.toUpperCase()}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <Edit2 onClick={() => handleEdit('shipping', ship)} size={16} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                          <Trash2 onClick={() => handleDelete('shipping', ship.id)} size={16} style={{ cursor: 'pointer', color: '#ff4d4f' }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Coupons */}
          {activeTab === 'coupons' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Promotional Codes</h2>
                <button onClick={() => handleAdd('coupon')} className="btn btn-outline btn-sm" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Plus size={14} /> Create Code</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Discount</th>
                    <th>Limits</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coup => (
                    <tr key={coup.id}>
                      <td style={{ fontWeight: 600, fontFamily: 'monospace', color: 'var(--primary)' }}>{coup.code}</td>
                      <td>{coup.discount}</td>
                      <td>{coup.limit}</td>
                      <td><span className={`status-badge ${coup.status === 'active' ? 'paid' : 'pending'}`}>{coup.status.toUpperCase()}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <Edit2 onClick={() => handleEdit('coupon', coup)} size={16} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                          <Trash2 onClick={() => handleDelete('coupon', coup.id)} size={16} style={{ cursor: 'pointer', color: '#ff4d4f' }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* Generic Edit Modal */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass" style={{ background: '#080808', width: '100%', maxWidth: '450px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, textTransform: 'capitalize' }}>Edit {editingItem.type}</h2>
              <XCircle onClick={() => setEditingItem(null)} size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Payment Fields */}
              {editingItem.type === 'payment' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Platform Name</label>
                    <input type="text" value={editingItem.item.name} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, name: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Account Details (Email, Cashtag, etc)</label>
                    <input type="text" value={editingItem.item.detail} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, detail: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                  </div>
                </>
              )}

              {/* Shipping Fields */}
              {editingItem.type === 'shipping' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Method Name</label>
                    <input type="text" value={editingItem.item.name} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, name: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rate ($)</label>
                      <input type="number" value={editingItem.item.rate} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, rate: parseFloat(e.target.value) || 0}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Conditions</label>
                      <input type="text" value={editingItem.item.condition} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, condition: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                  </div>
                </>
              )}

              {/* Coupon Fields */}
              {editingItem.type === 'coupon' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Promo Code</label>
                    <input type="text" value={editingItem.item.code} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, code: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Discount</label>
                      <input type="text" value={editingItem.item.discount} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, discount: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Limits</label>
                      <input type="text" value={editingItem.item.limit} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, limit: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                  </div>
                </>
              )}

              {/* Shared Status Field */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</label>
                <select value={editingItem.item.status} onChange={(e) => setEditingItem({...editingItem, item: {...editingItem.item, status: e.target.value}})} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none', appearance: 'none' }}>
                  <option value="active" style={{ background: '#080808' }}>Active</option>
                  <option value="disabled" style={{ background: '#080808' }}>Disabled/Expired</option>
                </select>
              </div>

            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveModal} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Save size={16} /> Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
