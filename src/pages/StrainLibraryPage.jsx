import { useState } from 'react';
import { Search, Info, Zap, Target, Leaf } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function StrainLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeEffect, setActiveEffect] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.strain === activeFilter;
    
    // Virtual effect filter based on strain type
    const productEffect = p.strain === 'Indica' ? 'Relaxing' : p.strain === 'Sativa' ? 'Energetic' : 'Creative';
    const matchesEffect = activeEffect === 'All' || productEffect === activeEffect;
    
    return matchesSearch && matchesFilter && matchesEffect;
  });

  const stats = {
    total: products.length,
    indica: products.filter(p => p.strain === 'Indica').length,
    sativa: products.filter(p => p.strain === 'Sativa').length,
    hybrid: products.filter(p => p.strain === 'Hybrid').length,
  };

  return (
    <>
      <SEO 
        title="Whole Melt Extracts Strain Library | Official Flavor Index"
        description="Explore the complete Whole Melt Extracts strain encyclopedia. From live resin sugar to premium disposables, find your perfect Indica, Sativa, or Hybrid profile."
        canonical="/strains"
      />

      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="section-header text-center animate-reveal">
            <span className="section-header__tag">Official Index</span>
            <h1 className="section-header__title">The <span className="text-gradient">Strain Library</span></h1>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
              A comprehensive encyclopedia of every flavor, profile, and extraction batch in our master collection. 
              Find the perfect terpene profile for your next session.
            </p>
          </div>

          {/* ═══ Stats Bar ═══ */}
          <div className="service-strip animate-reveal" style={{ marginBottom: '2.5rem' }}>
            {[
              { label: 'Total flavors', value: stats.total, icon: <Zap size={18} /> },
              { label: 'Indica', value: stats.indica, icon: <Leaf size={18} /> },
              { label: 'Sativa', value: stats.sativa, icon: <Target size={18} /> },
              { label: 'Hybrid', value: stats.hybrid, icon: <Info size={18} /> },
            ].map((stat) => (
              <div key={stat.label} className="service-strip__item">
                <div className="service-strip__icon">{stat.icon}</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>{stat.value}</div>
                <div className="service-strip__desc">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ═══ Search & Filters ═══ */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', flexWrap: 'wrap' }} className="animate-reveal">
            <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
              <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="text" 
                placeholder="Search strains (e.g. Sour Apple, Acai, Gelato...)" 
                className="form-input"
                style={{ paddingLeft: '3.5rem', margin: 0 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="shop-cats">
              {['All', 'Indica', 'Sativa', 'Hybrid'].map(filter => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shop-cat${activeFilter === filter ? ' is-active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="shop-cats" style={{ marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.25rem' }}>Effect:</span>
              {['All', 'Relaxing', 'Energetic', 'Creative'].map(effect => (
                <button
                  key={effect}
                  type="button"
                  onClick={() => setActiveEffect(effect)}
                  className={`shop-cat${activeEffect === effect ? ' is-active' : ''}`}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state" style={{ minHeight: '30vh' }}>
              <Info size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <h3>No strains matching "{searchTerm}"</h3>
              <p>Try a different terpene profile or category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
