import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import lifestyleBanner from '../assets/images/lifestyle-disposable.png';
import { Loader2 } from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [prodRes, catRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('categories').select('*')
      ]);
      if (prodRes.data) setProducts(prodRes.data);
      if (catRes.data) setCategories(catRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (loading) return [];
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)));
    }
    return result;
  }, [activeCategory, search, products, loading]);

  return (
    <>
      <div className="page-header" style={{ background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${lifestyleBanner}) center/cover no-repeat`, padding: '6rem 0' }}>
        <div className="container">
          <h1 className="page-header__title">Shop</h1>
          <p className="page-header__desc">Browse our complete collection of premium extracts, disposables, and carts.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {/* Search */}
          <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
            <input
              className="form-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => {
                  setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
                }}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} size={32} />
              <p>Loading premium catalog...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
