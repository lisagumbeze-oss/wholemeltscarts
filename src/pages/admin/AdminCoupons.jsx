import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, Filter, Trash2, Edit2, 
  Tag, Calendar, Clock, Copy, Check, 
  X, Save, Loader2, Info, AlertCircle,
  MoreVertical, ChevronLeft, ChevronRight,
  TrendingUp, Users, ShoppingBag, Percent
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

export default function AdminCoupons() {
  const { addToast } = useToast();
  
  // Data States
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);

  // Editor States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('coupons').select('*', { count: 'exact' });
      
      if (searchQuery) {
        query = query.ilike('code', `%${searchQuery}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, count, error } = await query
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      addToast('Error', 'Failed to load coupons', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, currentPage, addToast]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleOpenDrawer = (coupon = null) => {
    setEditingCoupon(coupon || {
      code: '',
      description: '',
      discount_type: 'percentage',
      amount: 0,
      min_spend: 0,
      usage_limit: null,
      status: 'active',
      expires_at: ''
    });
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    if (!editingCoupon.code) {
      addToast('Validation', 'Coupon code is required', 'error');
      return;
    }
    
    setIsSaving(true);
    try {
      const { error } = editingCoupon.id 
        ? await supabase.from('coupons').update(editingCoupon).eq('id', editingCoupon.id)
        : await supabase.from('coupons').insert([editingCoupon]);

      if (error) throw error;
      
      addToast('Success', `Coupon ${editingCoupon.id ? 'updated' : 'created'} successfully`, 'success');
      setIsDrawerOpen(false);
      fetchCoupons();
    } catch (err) {
      addToast('Error', 'Failed to save coupon', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = (coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('coupons').delete().eq('id', couponToDelete.id);
      if (error) throw error;
      
      addToast('Deleted', 'Coupon removed successfully', 'info');
      fetchCoupons();
    } catch (err) {
      addToast('Error', 'Failed to delete coupon', 'error');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Copied', 'Coupon code copied to clipboard', 'info');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#00E676';
      case 'inactive': return 'var(--text-muted)';
      case 'scheduled': return 'var(--primary)';
      case 'expired': return '#ff4d4f';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="admin-coupons-page">
      {/* ═══ Header ═══ */}
      <div className="admin-header">
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Marketing & Growth</div>
          <h1 className="admin-title">Coupons & Promotions</h1>
        </div>
        <button onClick={() => handleOpenDrawer()} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      {/* ═══ Stats Cards ═══ */}
      <div className="admin-stats-grid" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Total Revenue via Coupons', value: '$12,450', icon: <TrendingUp />, color: 'var(--primary)' },
          { label: 'Active Coupons', value: coupons.filter(c => c.status === 'active').length, icon: <Tag />, color: '#00E676' },
          { label: 'Total Redemptions', value: '458', icon: <ShoppingBag />, color: '#2196F3' },
          { label: 'Unique Users', value: '312', icon: <Users />, color: '#FFB300' }
        ].map((stat, i) => (
          <div key={i} className="admin-card stats-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
               </div>
               <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Filter Bar ═══ */}
      <div className="admin-card" style={{ marginBottom: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <div className="search-box" style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search coupons by code or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-input" 
                style={{ width: '100%', paddingLeft: '3rem' }}
              />
           </div>
           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-input" style={{ width: '180px' }}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="scheduled">Scheduled</option>
           </select>
        </div>
      </div>

      {/* ═══ Data Table ═══ */}
      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
             <Loader2 className="spin" size={32} style={{ color: 'var(--primary)', margin: '0 auto' }} />
             <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Fetching promo codes...</div>
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Usage</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(coupon => (
                  <tr key={coupon.id} className="admin-table-row">
                    <td>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--primary)', padding: '0.4rem 0.6rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px', border: '1px solid rgba(212,175,55,0.2)' }}>
                             {coupon.code}
                          </div>
                          <button onClick={() => copyToClipboard(coupon.code)} className="admin-topbar__icon" style={{ padding: '0.25rem' }}>
                             <Copy size={14} />
                          </button>
                       </div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{coupon.description || 'No description'}</div>
                    </td>
                    <td>
                       <div style={{ fontWeight: 600 }}>
                          {coupon.discount_type === 'percentage' ? `${coupon.amount}% OFF` : `$${coupon.amount} OFF`}
                       </div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {coupon.min_spend > 0 ? `Min spend: $${coupon.min_spend}` : 'No minimum'}
                       </div>
                    </td>
                    <td>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', minWidth: '60px' }}>
                             <div style={{ 
                               width: `${coupon.usage_limit ? (coupon.usage_count / coupon.usage_limit) * 100 : 0}%`, 
                               height: '100%', 
                               background: 'var(--primary)' 
                             }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                             {coupon.usage_count}{coupon.usage_limit ? `/${coupon.usage_limit}` : ''}
                          </span>
                       </div>
                    </td>
                    <td>
                       <div style={{ fontSize: '0.85rem' }}>
                          {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}
                       </div>
                    </td>
                    <td>
                       <span className="status-badge" style={{ background: `${getStatusColor(coupon.status)}15`, color: getStatusColor(coupon.status) }}>
                          {coupon.status}
                       </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                       <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleOpenDrawer(coupon)} className="admin-topbar__icon" style={{ borderRadius: '8px' }}><Edit2 size={16} /></button>
                          <button onClick={() => confirmDelete(coupon)} className="admin-topbar__icon" style={{ borderRadius: '8px', color: '#ff4d4f' }}><Trash2 size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing {coupons.length} of {totalCount} coupons</div>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="btn btn-outline btn-sm">Previous</button>
                  <button disabled={currentPage * pageSize >= totalCount} onClick={() => setCurrentPage(p => p + 1)} className="btn btn-outline btn-sm">Next</button>
               </div>
            </div>
          </>
        )}
      </div>

      {/* ═══ Coupon Editor Drawer ═══ */}
      {isDrawerOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
          <div className="admin-drawer" style={{ width: '500px' }}>
             <div className="admin-drawer__header">
                <div>
                   <h2 className="admin-drawer__title">{editingCoupon.id ? 'Edit Coupon' : 'New Coupon'}</h2>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Marketing & Promotions Hub</span>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="admin-drawer__close"><X size={24} /></button>
             </div>

             <div className="admin-drawer__content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                      <label className="admin-label">Coupon Code</label>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                         <input 
                           type="text" 
                           value={editingCoupon.code} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, code: e.target.value.toUpperCase()})} 
                           className="admin-input" 
                           style={{ flex: 1, letterSpacing: '1px', fontWeight: 700 }}
                           placeholder="e.g. SUMMER20"
                         />
                         <button 
                           onClick={() => setEditingCoupon({...editingCoupon, code: Math.random().toString(36).substring(2, 10).toUpperCase()})}
                           className="btn btn-outline btn-sm"
                         >
                           Generate
                         </button>
                      </div>
                   </div>

                   <div>
                      <label className="admin-label">Description (Optional)</label>
                      <input 
                        type="text" 
                        value={editingCoupon.description || ''} 
                        onChange={(e) => setEditingCoupon({...editingCoupon, description: e.target.value})} 
                        className="admin-input" 
                        style={{ width: '100%' }}
                        placeholder="Internal note about this promotion"
                      />
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                         <label className="admin-label">Discount Type</label>
                         <select 
                           value={editingCoupon.discount_type} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, discount_type: e.target.value})} 
                           className="admin-input"
                           style={{ width: '100%' }}
                         >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed_cart">Fixed Amount ($)</option>
                            <option value="free_shipping">Free Shipping</option>
                         </select>
                      </div>
                      <div>
                         <label className="admin-label">Amount</label>
                         <div style={{ position: 'relative' }}>
                            <input 
                              type="number" 
                              value={editingCoupon.amount} 
                              onChange={(e) => setEditingCoupon({...editingCoupon, amount: parseFloat(e.target.value)})} 
                              className="admin-input" 
                              style={{ width: '100%' }}
                            />
                            <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                               {editingCoupon.discount_type === 'percentage' ? '%' : '$'}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                         <label className="admin-label">Min Spend ($)</label>
                         <input 
                           type="number" 
                           value={editingCoupon.min_spend} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, min_spend: parseFloat(e.target.value)})} 
                           className="admin-input" 
                           style={{ width: '100%' }}
                         />
                      </div>
                      <div>
                         <label className="admin-label">Usage Limit</label>
                         <input 
                           type="number" 
                           value={editingCoupon.usage_limit || ''} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, usage_limit: e.target.value ? parseInt(e.target.value) : null})} 
                           className="admin-input" 
                           style={{ width: '100%' }}
                           placeholder="Unlimited"
                         />
                      </div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                         <label className="admin-label">Expiry Date</label>
                         <input 
                           type="date" 
                           value={editingCoupon.expires_at ? editingCoupon.expires_at.split('T')[0] : ''} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, expires_at: e.target.value})} 
                           className="admin-input" 
                           style={{ width: '100%' }}
                         />
                      </div>
                      <div>
                         <label className="admin-label">Status</label>
                         <select 
                           value={editingCoupon.status} 
                           onChange={(e) => setEditingCoupon({...editingCoupon, status: e.target.value})} 
                           className="admin-input"
                           style={{ width: '100%' }}
                         >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="scheduled">Scheduled</option>
                         </select>
                      </div>
                   </div>
                </div>
             </div>

             <div className="admin-drawer__footer">
                <button onClick={() => setIsDrawerOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleSave} disabled={isSaving} className="btn btn-primary" style={{ flex: 2 }}>
                   {isSaving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
                   {editingCoupon.id ? 'Update Coupon' : 'Create Coupon'}
                </button>
             </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <AdminModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message={`Are you sure you want to delete coupon ${couponToDelete?.code}? This will permanently remove it from the system.`}
        confirmText="Delete Permanently"
        type="danger"
      />
    </div>
  );
}
