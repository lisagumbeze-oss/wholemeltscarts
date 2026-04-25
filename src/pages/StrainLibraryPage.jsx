import React, { useState } from 'react';
import { Search, Filter, Info, ArrowUpRight, Zap, Target, Leaf } from 'lucide-react';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }} className="animate-reveal">
            {[
              { label: 'Total Flavors', value: stats.total, icon: <Zap size={20} /> },
              { label: 'Heavy Indica', value: stats.indica, icon: <Leaf size={20} className="text-secondary" /> },
              { label: 'Pure Sativa', value: stats.sativa, icon: <Target size={20} className="text-secondary" /> },
              { label: 'Balanced Hybrids', value: stats.hybrid, icon: <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--secondary)' }} /> }
            ].map((stat, i) => (
              <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', opacity: 0.7 }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
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
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['All', 'Indica', 'Sativa', 'Hybrid'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`btn ${activeFilter === filter ? 'btn-secondary' : 'glass'}`}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>Desired Effect:</span>
              {['All', 'Relaxing', 'Energetic', 'Creative'].map(effect => (
                <button 
                  key={effect}
                  onClick={() => setActiveEffect(effect)}
                  className={`btn btn-sm ${activeEffect === effect ? 'btn-primary' : 'glass'}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ Strain Grid ═══ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredProducts.map((p, i) => (
              <div key={p.id} className="glass card-hover animate-reveal" style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                <div style={{ height: '240px', position: 'relative', background: 'rgba(255,255,255,0.03)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                    <span style={{ 
                      padding: '0.4rem 0.8rem', 
                      background: 'rgba(0,0,0,0.6)', 
                      backdropFilter: 'blur(10px)', 
                      borderRadius: '2rem', 
                      fontSize: '0.7rem', 
                      fontWeight: 600,
                      color: p.strain === 'Indica' ? '#8e44ad' : p.strain === 'Sativa' ? '#f1c40f' : '#2ecc71',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {p.strain.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem' }}>Extracted 2025</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem' }}>{p.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)' }}>${p.price}</div>
                    <Link to={`/product/${p.slug || p.id}`} className="btn glass" style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                      Profile Details <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center" style={{ padding: '5rem 0', opacity: 0.5 }}>
              <Info size={48} style={{ margin: '0 auto 1.5rem' }} />
              <h3>No strains matching "{searchTerm}"</h3>
              <p>Try searching for a different terpene profile or category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
