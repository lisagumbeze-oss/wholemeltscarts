import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import lifestyleBanner from '../assets/images/lifestyle-disposable.png';
import { Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('categories').select('*')
        ]);
        
        let finalProducts = prodRes.data || [];
        
        // Fallback: If DB returns error or is missing slugs (cache issue), use local data
        if (prodRes.error || finalProducts.length === 0 || (finalProducts.length > 0 && !finalProducts[0].slug)) {
          console.warn('DB Sync pending or schema cache issue. Falling back to local product data.');
          finalProducts = localProducts;
        }
        
        setProducts(finalProducts);
        
        if (catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data);
        } else {
          // Fallback categories if DB fails
          const uniqueCats = [...new Set(localProducts.map(p => p.category))];
          setCategories([
            { id: 'all', name: 'All Products', count: localProducts.length },
            ...uniqueCats.map(c => ({ id: c, name: c.replace('-', ' '), count: localProducts.filter(lp => lp.category === c).length }))
          ]);
        }
      } catch (err) {
        console.error('Fetch error, using local fallback:', err);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
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
      <SEO 
        title={activeCategory !== 'all' ? `Shop ${activeCategory.replace('-', ' ')} | Whole Melt Extracts` : 'Shop Whole Melt Extracts | Official Store for Carts & Disposables'}
        description="Browse the complete catalog of official Whole Melt Extracts. Shop premium disposables, live resin carts, badder, and solventless concentrates. Fast shipping."
        canonical="/shop"
      />
      <div className="page-header" style={{ background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${lifestyleBanner}) center/cover no-repeat`, padding: '6rem 0' }}>
        <div className="container">
          <h1 className="page-header__title">Shop Whole Melt Extracts</h1>
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
