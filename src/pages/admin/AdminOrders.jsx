import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle, XCircle, Search, Loader2, Info, 
  Filter, ChevronLeft, ChevronRight, Eye, 
  Truck, Package, CreditCard, User, Mail,
  Calendar, Printer, MoreVertical, X, Check,
  MapPin, Phone, AlertCircle, ExternalLink,
  ChevronRight as ChevronRightIcon,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

export default function AdminOrders() {
  const { addToast } = useToast();
  
  // Data States
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Detail States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('orders').select('*', { count: 'exact' });
      
      if (searchQuery) {
        query = query.or(`customer_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, count, error } = await query.range(from, to).order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders(data || []);
      setTotalOrders(count || 0);
    } catch (err) {
      addToast('Error', 'Failed to fetch orders', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, currentPage, pageSize, addToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id, newStatus, extraData = {}) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, ...extraData })
        .eq('id', id);

      if (error) throw error;

      addToast('Status Updated', `Order #${id} is now ${newStatus.toUpperCase()}`, 'success');
      fetchOrders();
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus, ...extraData });
      }
    } catch (err) {
      addToast('Error', 'Failed to update status', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTrackingSubmit = () => {
    if (!trackingNumber) {
      addToast('Validation', 'Please enter a tracking number', 'error');
      return;
    }
    updateOrderStatus(selectedOrder.id, 'shipped', { tracking_number: trackingNumber });
    setTrackingNumber('');
  };

  const confirmDelete = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderToDelete.id);
      if (error) throw error;
      
      addToast('Deleted', 'Order removed from database', 'info');
      fetchOrders();
      if (selectedOrder?.id === orderToDelete.id) setSelectedOrder(null);
    } catch (err) {
      addToast('Error', 'Failed to delete order', 'error');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const StatusStepper = ({ currentStatus }) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    
    return (
      <div className="status-stepper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', position: 'relative' }}>
         <div style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
         <div style={{ position: 'absolute', top: '50%', left: '5%', width: `${(currentIndex / (steps.length - 1)) * 90}%`, height: '2px', background: 'var(--primary)', zIndex: 1, transition: 'width 0.3s ease' }} />
         
         {steps.map((step, i) => {
           const isActive = i <= currentIndex;
           const isCurrent = i === currentIndex;
           return (
             <div key={step} style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  background: isActive ? 'var(--primary)' : '#1a1a1a',
                  border: `2px solid ${isActive ? 'var(--primary)' : 'var(--glass-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? '#000' : 'var(--text-muted)',
                  transition: 'all 0.3s ease',
                  boxShadow: isCurrent ? '0 0 15px var(--primary-glow)' : 'none'
                }}>
                   {isActive ? <Check size={14} strokeWidth={3} /> : <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />}
                </div>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: isActive ? '#fff' : 'var(--text-muted)', fontWeight: isActive ? 700 : 400 }}>{step}</span>
             </div>
           );
         })}
      </div>
    );
  };

  return (
    <div className="admin-orders-container">
      {/* ═══ Header ═══ */}
      <div className="admin-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Operations</div>
          <h1 className="admin-title" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>Order Management</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Printer size={18} /> Print Manifest
          </button>
        </div>
      </div>

      {/* ═══ Stats Summary ═══ */}
      <div className="admin-stats-grid" style={{ marginBottom: '1.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Unfulfilled', value: orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length, icon: <Package />, color: '#ffcc00' },
          { label: 'In Transit', value: orders.filter(o => o.status === 'shipped').length, icon: <Truck />, color: 'var(--primary)' },
          { label: 'Awaiting Verification', value: orders.filter(o => o.status === 'pending').length, icon: <AlertCircle />, color: '#ff4d4f' },
          { label: 'Completed Today', value: '12', icon: <CheckCircle />, color: '#00E676' },
        ].map((stat, i) => (
          <div key={i} className="admin-card stats-card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{stat.value}</div>
               <div style={{ color: stat.color, opacity: 0.8 }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Filter Bar ═══ */}
      <div className="admin-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by customer name, order ID, or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input" 
              style={{ width: '100%', paddingLeft: '3rem' }}
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-input" style={{ width: '180px' }}>
            <option value="all">All Statuses</option>
            <option value="pending">Verification Required</option>
            <option value="verified">Awaiting Processing</option>
            <option value="processing">In Production</option>
            <option value="shipped">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ═══ Orders Table ═══ */}
      <div className="admin-card">
        {isLoading ? (
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Loader2 className="spin" size={32} style={{ color: 'var(--primary)' }} />
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Syncing order queue...</div>
          </div>
        ) : (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="admin-table-row" onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                    <td>
                       <div style={{ fontWeight: 600, color: '#fff' }}>#{order.id.toString().slice(-4)}</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                    </td>
                    <td>
                       <div style={{ fontWeight: 500 }}>{order.customer_name}</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.email}</div>
                    </td>
                    <td>
                       <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>2 items</div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#fff' }}>${Number(order.total).toFixed(2)}</td>
                    <td>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                          <CreditCard size={14} color="var(--primary)" />
                          {order.payment_method}
                       </div>
                    </td>
                    <td>
                       <span className={`status-badge ${order.status}`}>{order.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                       <button className="admin-topbar__icon" style={{ borderRadius: '8px' }}><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Showing {orders.length} of {totalOrders} orders
               </div>
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="btn btn-outline btn-sm">Previous</button>
                  <button disabled={currentPage * pageSize >= totalOrders} onClick={() => setCurrentPage(prev => prev + 1)} className="btn btn-outline btn-sm">Next</button>
               </div>
            </div>
          </>
        )}
      </div>

      {/* ═══ Order Detail Drawer ═══ */}
      {selectedOrder && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedOrder(null)} />
          <div className="admin-drawer" style={{ width: '550px' }}>
            <div className="admin-drawer__header">
              <div>
                <h2 className="admin-drawer__title">Order #{selectedOrder.id.toString().slice(-6)}</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed on {new Date(selectedOrder.created_at).toLocaleString()}</span>
              </div>
              <button className="admin-drawer__close" onClick={() => setSelectedOrder(null)}><X size={24} /></button>
            </div>

            <div className="admin-drawer__content">
               {/* Timeline Stepper */}
               <div className="admin-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', marginBottom: '1.5rem' }}>
                  <StatusStepper currentStatus={selectedOrder.status} />
               </div>

               {/* Workflow Controls */}
               <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Fulfillment Workflow</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                     {selectedOrder.status === 'pending' && (
                        <button onClick={() => updateOrderStatus(selectedOrder.id, 'verified')} className="btn btn-primary" style={{ width: '100%' }}>Verify Payment</button>
                     )}
                     {selectedOrder.status === 'verified' && (
                        <button onClick={() => updateOrderStatus(selectedOrder.id, 'processing')} className="btn btn-primary" style={{ width: '100%' }}>Start Processing</button>
                     )}
                     {selectedOrder.status === 'processing' && (
                        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div className="search-box" style={{ position: 'relative' }}>
                              <Truck size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                              <input 
                                 type="text" 
                                 placeholder="Enter Tracking Number (e.g. USPS, FedEx)..." 
                                 value={trackingNumber}
                                 onChange={(e) => setTrackingNumber(e.target.value)}
                                 className="admin-input" 
                                 style={{ width: '100%', paddingLeft: '3rem' }}
                              />
                           </div>
                           <button onClick={handleTrackingSubmit} className="btn btn-primary" style={{ width: '100%' }}>Mark as Shipped</button>
                        </div>
                     )}
                     {selectedOrder.status === 'shipped' && (
                        <button onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')} className="btn btn-primary" style={{ width: '100%', gridColumn: 'span 2' }}>Confirm Delivery</button>
                     )}
                     {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                        <button onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')} className="btn btn-outline" style={{ color: '#ff4d4f', borderColor: 'rgba(255,77,79,0.2)' }}>Cancel Order</button>
                     )}
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  {/* Customer Card */}
                  <div>
                     <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Customer Details</h3>
                     <div className="admin-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                           <User size={16} color="var(--primary)" />
                           <span style={{ color: '#fff', fontSize: '0.9rem' }}>{selectedOrder.customer_name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                           <Mail size={16} color="var(--primary)" />
                           <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{selectedOrder.email}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                           <CreditCard size={16} color="var(--primary)" />
                           <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{selectedOrder.payment_method}</span>
                        </div>
                     </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                     <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Shipping To</h3>
                     <div className="admin-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        <MapPin size={16} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                        <div>123 Luxury Lane, Suite 400</div>
                        <div>Beverly Hills, CA 90210</div>
                        <div>United States</div>
                        <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}><Phone size={12} /> +1 (555) 000-0000</div>
                     </div>
                  </div>
               </div>

               {/* Item Breakdown */}
               <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Order Items</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                     {[1, 2].map(i => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                           <div style={{ width: '50px', height: '50px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ShoppingBag size={20} color="var(--primary)" opacity={0.5} />
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Whole Melts Live Resin - {i === 1 ? 'Blue Dream' : 'Gelato 41'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quantity: 1</div>
                           </div>
                           <div style={{ fontWeight: 600, color: '#fff' }}>$35.00</div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Totals */}
               <div className="admin-card" style={{ padding: '1.25rem', background: 'var(--primary-glow)', border: '1px solid var(--primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                     <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>Subtotal</span>
                     <span style={{ color: '#000', fontWeight: 700 }}>$70.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                     <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>Shipping</span>
                     <span style={{ color: '#000', fontWeight: 700 }}>$15.00</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#000', fontSize: '1.1rem', fontWeight: 800 }}>Order Total</span>
                     <span style={{ color: '#000', fontSize: '1.1rem', fontWeight: 800 }}>${Number(selectedOrder.total).toFixed(2)}</span>
                  </div>
               </div>

               {/* Tracking Card (if shipped) */}
               {selectedOrder.tracking_number && (
                  <div className="admin-card" style={{ marginTop: '1.5rem', background: 'rgba(0, 230, 118, 0.05)', border: '1px solid #00E676', padding: '1rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#00E676' }}>
                           <Truck size={20} />
                           <div>
                              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Tracking Number</div>
                              <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedOrder.tracking_number}</div>
                           </div>
                        </div>
                        <button className="btn btn-sm btn-outline" style={{ color: '#00E676', borderColor: 'rgba(0,230,118,0.2)' }}>Track Package</button>
                     </div>
                  </div>
               )}
            </div>

            <div className="admin-drawer__footer" style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn btn-outline" style={{ flex: 1 }}><Printer size={18} /> Print Invoice</button>
               <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSelectedOrder(null)}>Mark as Complete</button>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <AdminModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order #${orderToDelete?.id}? This action will permanently remove it from the database.`}
        confirmText="Permanently Delete"
        type="danger"
      />
    </div>
  );
}
