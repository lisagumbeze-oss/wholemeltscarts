import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const mockOrders = [
  { id: '#1024', customer_name: 'Alex Johnson', email: 'alex@example.com', total: 145.00, payment_method: 'CashApp', account_detail: '$alexbuy', status: 'pending' },
  { id: '#1023', customer_name: 'Maria Silva', email: 'maria@example.com', total: 89.50, payment_method: 'Zelle', account_detail: 'maria@example.com', status: 'verified' },
  { id: '#1022', customer_name: 'James Wilson', email: 'james.w@example.com', total: 210.00, payment_method: 'Venmo', account_detail: '@JamesW', status: 'verified' },
  { id: '#1021', customer_name: 'Sarah Connor', email: 's.connor@example.com', total: 320.00, payment_method: 'Apple Cash', account_detail: '(555) 019-2834', status: 'pending' }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      if (data.length === 0) {
         await supabase.from('orders').insert(mockOrders);
         const { data: newData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
         setOrders(newData || []);
      } else {
        setOrders(data);
      }
    }
  };

  const approveOrder = async (id) => {
    const { error } = await supabase.from('orders').update({ status: 'verified' }).eq('id', id);
    if (!error) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'verified' } : o));
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder({ ...order });
  };

  const handleSaveOrder = async () => {
    const { error } = await supabase.from('orders').update({
      customer_name: editingOrder.customer_name,
      payment_method: editingOrder.payment_method,
      total: editingOrder.total,
      status: editingOrder.status
    }).eq('id', editingOrder.id);

    if (!error) {
       setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    }
    setEditingOrder(null);
  };

  const deleteOrder = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (!error) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manual Payments</h1>
          <div style={{ color: 'var(--text-secondary)' }}>Review and approve offline transactions.</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem' }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
          />
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
             <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Payment Route</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
             </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600 }}>{order.id}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 400 }}>
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                  </div>
                </td>
                <td>
                  <div>{order.customer_name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.email}</div>
                </td>
                <td>
                  <span style={{ color: 'var(--primary)' }}>{order.payment_method}</span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>From: {order.account_detail}</div>
                </td>
                <td style={{ fontWeight: 600 }}>${Number(order.total).toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>{order.status}</span>
                </td>
                <td>
                  {order.status === 'pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => approveOrder(order.id)} style={{ background: 'rgba(46, 204, 113, 0.1)', color: 'var(--accent)', border: '1px solid rgba(46, 204, 113, 0.3)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button onClick={() => handleEditClick(order)} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Processed</span>
                      <button onClick={() => handleEditClick(order)} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', marginLeft: 'auto', transition: 'all 0.2s' }}>
                        Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass" style={{ background: '#080808', width: '100%', maxWidth: '500px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Edit Order {editingOrder.id}</h2>
              <XCircle onClick={() => setEditingOrder(null)} size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer Name</label>
                <input 
                  type="text" 
                  value={editingOrder.customer_name || ''} 
                  onChange={(e) => setEditingOrder({...editingOrder, customer_name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Payment Method</label>
                <input 
                  type="text" 
                  value={editingOrder.payment_method || ''} 
                  onChange={(e) => setEditingOrder({...editingOrder, payment_method: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Amount ($)</label>
                  <input 
                    type="number" 
                    value={editingOrder.total} 
                    onChange={(e) => setEditingOrder({...editingOrder, total: parseFloat(e.target.value) || 0})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order Status</label>
                  <select 
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none', appearance: 'none' }}
                  >
                    <option value="pending" style={{ background: '#080808' }}>Pending</option>
                    <option value="verified" style={{ background: '#080808' }}>Verified</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn" onClick={() => { deleteOrder(editingOrder.id); setEditingOrder(null); }} style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4f', border: 'none' }}>
                Delete Order
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-outline" onClick={() => setEditingOrder(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveOrder}>Save Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
