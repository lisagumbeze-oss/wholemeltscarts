import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import lifestyleBanner from '../assets/images/lifestyle-disposable.png';
import { Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

import ProductSkeleton from '../components/ProductSkeleton';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const query = searchParams.get('q') || '';
  const [search, setSearch] = useState(query);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) setSearch(query);
  }, [query]);

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
    let result = [...products]; // Clone for sorting
    
    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Price Filter
    result = result.filter(p => {
        const price = parseFloat(p.price);
        return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    if (sortBy === 'price-low') result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sortBy === 'price-high') result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    return result;
  }, [activeCategory, search, products, loading, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchParams({});
    setSearch('');
    setPriceRange([0, 100]);
  };

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
          <div className="shop-controls">
            {/* Search */}
            <div style={{ flex: 1, maxWidth: '400px' }}>
              <input
                className="form-input"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Price Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Price Range</span>
                <span>$0 - ${priceRange[1]}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={priceRange[1]} 
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                style={{ width: '150px', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort By:</span>
              <select 
                className="form-select" 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                style={{ width: '180px' }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Product Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {activeCategory !== 'all' && (
                    <div className="glass" style={{ padding: '0.4rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--primary)' }}>
                        Category: {activeCategory}
                        <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchParams({})} />
                    </div>
                )}
                {search && (
                    <div className="glass" style={{ padding: '0.4rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--primary)' }}>
                        Search: {search}
                        <X size={12} style={{ cursor: 'pointer' }} onClick={() => { setSearch(''); setSearchParams({}); }} />
                    </div>
                )}
                {(activeCategory !== 'all' || search) && (
                    <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}>
                        Clear All
                    </button>
                )}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing <strong>{filtered.length}</strong> products
            </div>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
            <div className="product-grid">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
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
