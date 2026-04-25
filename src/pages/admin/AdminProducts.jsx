import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Plus, Edit2, Trash2, X, Save, Loader2, 
  Search, Filter, ChevronLeft, ChevronRight,
  MoreVertical, Download, Eye, CheckSquare, Square,
  Image as ImageIcon, DollarSign, Tag, Globe, Settings as SettingsIcon,
  AlertCircle, Package, ArrowUpRight, BarChart
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

export default function AdminProducts() {
  const { addToast } = useToast();
  
  // Data States
  const [productList, setProductList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [drawerTab, setDrawerTab] = useState('general');

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('products').select('*', { count: 'exact' });
      
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }
      
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, count, error } = await query.range(from, to).order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProductList(data || []);
      setTotalProducts(count || 0);
    } catch (err) {
      addToast('Error', 'Failed to fetch products', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, categoryFilter, currentPage, pageSize, addToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers
  const handleOpenDrawer = (product = null) => {
    if (product) {
      setEditingProduct({ ...product });
    } else {
      setEditingProduct({
        name: '',
        price: 0,
        compare_at_price: 0,
        category: 'Live Resin',
        description: '',
        images: [],
        status: 'active',
        sku: `WM-${Math.floor(Math.random() * 9000 + 1000)}`,
        seo_title: '',
        seo_description: ''
      });
    }
    setDrawerTab('general');
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      addToast('Validation', 'Name and Price are required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      let error;
      if (editingProduct.id) {
        const { error: err } = await supabase.from('products').update(editingProduct).eq('id', editingProduct.id);
        error = err;
      } else {
        const { error: err } = await supabase.from('products').insert([editingProduct]);
        error = err;
      }

      if (error) throw error;

      addToast('Success', `Product ${editingProduct.name} saved.`, 'success');
      fetchProducts();
      setIsDrawerOpen(false);
    } catch (err) {
      addToast('Error', 'Failed to save product', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = (prod) => {
    setProductToDelete(prod);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productToDelete.id);
      if (error) throw error;
      
      addToast('Deleted', 'Product removed from catalog', 'info');
      fetchProducts();
    } catch (err) {
      addToast('Error', 'Failed to delete product', 'error');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase.from('products').delete().in('id', selectedIds);
      if (error) throw error;
      
      addToast('Success', `${selectedIds.length} products deleted`, 'success');
      setSelectedIds([]);
      fetchProducts();
    } catch (err) {
      addToast('Error', 'Bulk deletion failed', 'error');
    } finally {
      setIsBulkDeleteModalOpen(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === productList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(productList.map(p => p.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Skeleton Loader Component
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td colSpan="7">
            <div style={{ height: '60px', width: '100%', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)', backgroundSize: '200% 100%', animation: 'skeleton-pulse 1.5s infinite', borderRadius: '8px' }} />
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="admin-products-container">
      {/* ═══ Header ═══ */}
      <div className="admin-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Inventory Hub</div>
          <h1 className="admin-title" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>Products Management</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Download size={18} /> Export Catalog
          </button>
          <button onClick={() => handleOpenDrawer()} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Plus size={18} /> New Product
          </button>
        </div>
      </div>

      {/* ═══ Stats Summary ═══ */}
      <div className="admin-stats-grid" style={{ marginBottom: '1.5rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total SKUs', value: totalProducts, icon: <Package />, color: 'var(--primary)' },
          { label: 'Active Items', value: productList.length, icon: <CheckSquare />, color: '#00E676' },
          { label: 'Low Stock', value: '3', icon: <AlertCircle />, color: '#FF5252' },
          { label: 'Inventory Value', value: '$84,200', icon: <DollarSign />, color: '#2196F3' },
        ].map((stat, i) => (
          <div key={i} className="admin-card stats-card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>{stat.value}</div>
              </div>
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
              placeholder="Search by name, SKU or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input" 
              style={{ width: '100%', paddingLeft: '3rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="admin-input" style={{ width: '160px' }}>
              <option value="all">All Categories</option>
              <option value="Live Resin">Live Resin</option>
              <option value="Disposable">Disposable</option>
              <option value="Badder">Badder</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-input" style={{ width: '140px' }}>
              <option value="all">Any Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* ═══ Bulk Actions ═══ */}
      {selectedIds.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '1rem', padding: '0.75rem 1.5rem', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn 0.2s ease' }}>
           <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedIds.length} items selected</div>
           <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-sm btn-outline">Change Status</button>
              <button onClick={() => setIsBulkDeleteModalOpen(true)} className="btn btn-sm" style={{ background: '#ff4d4f', color: '#fff', border: 'none' }}>Delete Selected</button>
           </div>
        </div>
      )}

      {/* ═══ Products Table ═══ */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                 <div onClick={toggleSelectAll} style={{ cursor: 'pointer', color: selectedIds.length === productList.length ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {selectedIds.length === productList.length ? <CheckSquare size={18} /> : <Square size={18} />}
                 </div>
              </th>
              <th>Product Info</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Price</th>
              <th>Performance</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <TableSkeleton /> : productList.map(prod => (
              <tr key={prod.id} className="admin-table-row" style={{ background: selectedIds.includes(prod.id) ? 'rgba(212, 175, 55, 0.03)' : 'transparent' }}>
                <td>
                  <div onClick={() => toggleSelect(prod.id)} style={{ cursor: 'pointer', color: selectedIds.includes(prod.id) ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {selectedIds.includes(prod.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                  </div>
                </td>
                <td>
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                         {prod.images && prod.images[0] ? (
                           <img src={prod.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         ) : (
                           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}><ImageIcon size={20} /></div>
                         )}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {prod.sku || 'N/A'}</div>
                      </div>
                   </div>
                </td>
                <td>
                   <span className="status-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                      {prod.category}
                   </span>
                </td>
                <td>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676' }} />
                      <span style={{ fontSize: '0.85rem', color: '#fff' }}>In Stock</span>
                   </div>
                </td>
                <td>
                   <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${Number(prod.price).toFixed(2)}</div>
                   {prod.compare_at_price > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${prod.compare_at_price}</div>}
                </td>
                <td>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <BarChart size={14} /> 42 sales
                   </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                   <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenDrawer(prod)} className="admin-topbar__icon" style={{ borderRadius: '8px' }} title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => confirmDelete(prod)} className="admin-topbar__icon" style={{ borderRadius: '8px', color: '#ff4d4f' }} title="Delete"><Trash2 size={16} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ Pagination ═══ */}
      {!isLoading && productList.length > 0 && (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Showing {Math.min(productList.length, pageSize)} of {totalProducts} items
           </div>
           <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="btn btn-outline btn-sm">Previous</button>
              <button disabled={currentPage * pageSize >= totalProducts} onClick={() => setCurrentPage(prev => prev + 1)} className="btn btn-outline btn-sm">Next Page</button>
           </div>
        </div>
      )}

      {/* ═══ Edit/Create Drawer ═══ */}
      {isDrawerOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
          <div className="admin-drawer" style={{ width: '650px' }}>
            <div className="admin-drawer__header">
              <div>
                <h2 className="admin-drawer__title">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inventory Management / {editingProduct.category}</span>
              </div>
              <button className="admin-drawer__close" onClick={() => setIsDrawerOpen(false)}><X size={24} /></button>
            </div>

            <div className="admin-drawer__tabs">
              <button onClick={() => setDrawerTab('general')} className={`admin-drawer__tab ${drawerTab === 'general' ? 'active' : ''}`}><Tag size={16} /> General</button>
              <button onClick={() => setDrawerTab('pricing')} className={`admin-drawer__tab ${drawerTab === 'pricing' ? 'active' : ''}`}><DollarSign size={16} /> Pricing</button>
              <button onClick={() => setDrawerTab('media')} className={`admin-drawer__tab ${drawerTab === 'media' ? 'active' : ''}`}><ImageIcon size={16} /> Media</button>
              <button onClick={() => setDrawerTab('seo')} className={`admin-drawer__tab ${drawerTab === 'seo' ? 'active' : ''}`}><Globe size={16} /> SEO</button>
            </div>

            <div className="admin-drawer__content">
              {drawerTab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                      <label className="admin-label">Product Name</label>
                      <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="admin-input" placeholder="e.g. Whole Melts Live Resin" />
                   </div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label className="admin-label">Category</label>
                        <select value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="admin-input">
                           <option value="Live Resin">Live Resin</option>
                           <option value="Disposable">Disposable</option>
                           <option value="Badder">Badder</option>
                        </select>
                      </div>
                      <div>
                        <label className="admin-label">SKU</label>
                        <input type="text" value={editingProduct.sku} onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})} className="admin-input" />
                      </div>
                   </div>
                   <div>
                      <label className="admin-label">Description</label>
                      <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="admin-input" rows={6} style={{ height: 'auto' }} placeholder="Product details, effects, and flavor profile..." />
                   </div>
                </div>
              )}

              {drawerTab === 'pricing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label className="admin-label">Base Price ($)</label>
                        <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="admin-input" />
                      </div>
                      <div>
                        <label className="admin-label">Compare at Price ($)</label>
                        <input type="number" value={editingProduct.compare_at_price} onChange={(e) => setEditingProduct({...editingProduct, compare_at_price: parseFloat(e.target.value)})} className="admin-input" />
                      </div>
                   </div>
                   <div className="admin-card" style={{ background: 'rgba(0, 230, 118, 0.03)', border: '1px solid rgba(0, 230, 118, 0.1)', padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#00E676', fontSize: '0.9rem' }}>
                         <CheckCircle2 size={16} /> Auto-calculate profit margins based on wholesale settings.
                      </div>
                   </div>
                </div>
              )}

              {drawerTab === 'media' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <label className="admin-label">Product Gallery</label>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      {(editingProduct.images || []).map((img, i) => (
                        <div key={i} style={{ aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid var(--glass-border)' }}>
                           <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           <button onClick={() => setEditingProduct({...editingProduct, images: editingProduct.images.filter((_, idx) => idx !== i)})} style={{ position: 'absolute', top: '4px', right: '4px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}><X size={12} /></button>
                        </div>
                      ))}
                      <div style={{ aspectRatio: '1/1', borderRadius: '12px', border: '2px dashed var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }} className="hover-primary">
                         <Plus size={24} />
                         <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Add Image</span>
                      </div>
                   </div>
                </div>
              )}

              {drawerTab === 'seo' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                      <label className="admin-label">SEO Title</label>
                      <input type="text" value={editingProduct.seo_title} onChange={(e) => setEditingProduct({...editingProduct, seo_title: e.target.value})} className="admin-input" placeholder="Page title as it appears in search engines" />
                   </div>
                   <div>
                      <label className="admin-label">SEO Meta Description</label>
                      <textarea value={editingProduct.seo_description} onChange={(e) => setEditingProduct({...editingProduct, seo_description: e.target.value})} className="admin-input" rows={4} style={{ height: 'auto' }} />
                   </div>
                </div>
              )}
            </div>

            <div className="admin-drawer__footer">
              <button className="btn btn-outline" style={{ width: '120px' }} onClick={() => setIsDrawerOpen(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 1, display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }} onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                {editingProduct.id ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <AdminModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This will permanently remove it from the store.`}
        confirmText="Confirm Delete"
        type="danger"
      />

      <AdminModal 
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Bulk Delete"
        message={`You are about to delete ${selectedIds.length} products. This action cannot be undone.`}
        confirmText="Delete All Selected"
        type="danger"
      />
    </div>
  );
}
