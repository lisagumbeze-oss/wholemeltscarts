import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import lifestyleBanner from '../assets/images/lifestyle-disposable.png';
import { X } from 'lucide-react';
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

        if (prodRes.error || finalProducts.length === 0 || (finalProducts.length > 0 && !finalProducts[0].slug)) {
          finalProducts = localProducts;
        }

        setProducts(finalProducts);

        if (catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data);
        } else {
          const uniqueCats = [...new Set(localProducts.map(p => p.category))];
          setCategories([
            { id: 'all', name: 'All Products', count: localProducts.length },
            ...uniqueCats.map(c => ({
              id: c,
              name: c.replace('-', ' '),
              count: localProducts.filter(lp => lp.category === c).length
            }))
          ]);
        }
      } catch {
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (loading) return [];
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    result = result.filter(p => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

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

      <div
        className="shop-hero"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(6,6,6,0.72), rgba(6,6,6,0.92)), url(${lifestyleBanner})` }}
      >
        <div className="container">
          <h1 className="page-header__title">Shop</h1>
          <p className="page-header__desc">
            Disposables, carts, and solventless concentrates — curated from the official catalog.
          </p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="shop-toolbar">
            <div className="shop-toolbar__search">
              <label className="shop-toolbar__label" htmlFor="shop-search">Search</label>
              <input
                id="shop-search"
                className="form-input"
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="shop-toolbar__side">
              <div className="shop-toolbar__field">
                <span className="shop-toolbar__label">Price up to ${priceRange[1]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value, 10)])}
                  style={{ width: '150px', accentColor: 'var(--primary)' }}
                />
              </div>

              <div className="shop-toolbar__field">
                <label className="shop-toolbar__label" htmlFor="shop-sort">Sort</label>
                <select
                  id="shop-sort"
                  className="form-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ width: '180px' }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="shop-meta">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {activeCategory !== 'all' && (
                <span className="shop-chip">
                  {activeCategory.replace('-', ' ')}
                  <button type="button" aria-label="Clear category" onClick={() => setSearchParams({})}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {search && (
                <span className="shop-chip">
                  “{search}”
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => { setSearch(''); setSearchParams({}); }}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {(activeCategory !== 'all' || search) && (
                <button type="button" className="shop-clear" onClick={clearFilters}>Clear all</button>
              )}
            </div>
            <div>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> products
            </div>
          </div>

          <div className="shop-cats">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`shop-cat${activeCategory === cat.id ? ' is-active' : ''}`}
                onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="product-grid">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="empty-state" style={{ minHeight: '30vh' }}>
              <p>No products found matching your search.</p>
              <button type="button" className="btn btn-outline" onClick={clearFilters}>Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
