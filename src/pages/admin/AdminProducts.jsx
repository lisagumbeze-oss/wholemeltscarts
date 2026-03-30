import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminProducts() {
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, count, error } = await supabase.from('products').select('*', { count: 'exact' }).limit(15);
    if (!error && data) {
      setProductList(data);
      setTotalProducts(count || 0);
    }
  };

  const handleEditClick = (prod) => {
    setEditingProduct({ ...prod });
  };

  const handleSave = async () => {
    const { error } = await supabase.from('products')
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category
      })
      .eq('id', editingProduct.id);
      
    if (!error) {
      setProductList(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    }
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProductList(prev => prev.filter(p => p.id !== id));
      setTotalProducts(prev => prev - 1);
    }
  };
  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Product Catalog</h1>
          <div style={{ color: 'var(--text-secondary)' }}>Manage your extracts, live resin, and disposables.</div>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map(prod => (
              <tr key={prod.id}>
                <td>
                  {prod.images && prod.images[0] ? (
                    <img src={prod.images[0]} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}></div>
                  )}
                </td>
                <td style={{ fontWeight: 600 }}>{prod.name}</td>
                <td style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.8rem' }}>
                    {prod.category || 'Uncategorized'}
                  </span>
                </td>
                <td>${prod.price ? Number(prod.price).toFixed(2) : '0.00'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                    <Edit2 onClick={() => handleEditClick(prod)} size={18} style={{ cursor: 'pointer' }} className="hover-primary" />
                    <Trash2 onClick={() => handleDelete(prod.id)} size={18} style={{ cursor: 'pointer', color: '#ff4d4f' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Showing {productList.length} of {totalProducts} products
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass" style={{ background: '#080808', width: '100%', maxWidth: '500px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Edit Product</h2>
              <X onClick={() => setEditingProduct(null)} size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Product Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name} 
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price ($)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price} 
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                  <input 
                    type="text" 
                    value={editingProduct.category} 
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => setEditingProduct(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Save size={16} /> Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
