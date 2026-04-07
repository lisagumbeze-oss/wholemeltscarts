import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Minus, Plus, Loader2, ShieldCheck, Microscope, Thermometer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import SEO from '../components/SEO';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariation, setSelectedVariation] = useState(null);

  useEffect(() => {
    if (product?.variations?.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [product]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      
      if (data) {
        // Fallback: merge local reviews if DB has none
        if (!data.reviews || data.reviews.length === 0) {
          const localMatch = localProducts.find(lp => lp.name.trim().toLowerCase() === data.name.trim().toLowerCase());
          if (localMatch?.reviews) data.reviews = localMatch.reviews;
        }
        setProduct(data);
        const { data: relData } = await supabase.from('products').select('*').eq('category', data.category).neq('slug', data.slug).limit(4);
        if (relData) setRelated(relData);
      } else {
        // ULTIMATE FALLBACK: Try finding in local data if DB fails (e.g. during schema sync)
        const localMatch = localProducts.find(lp => lp.slug === slug);
        if (localMatch) {
          console.log('Using local fallback for product:', slug);
          setProduct(localMatch);
          // Find related in local
          const relatedLocal = localProducts
            .filter(lp => lp.category === localMatch.category && lp.slug !== localMatch.slug)
            .slice(0, 4);
          setRelated(relatedLocal);
        }
      }
      setLoading(false);
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '10rem 0' }}>
         <Loader2 className="animate-spin" style={{ animation: 'spin 1.5s linear infinite', color: 'var(--primary)', margin: '0 auto' }} size={40} />
         <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h1>Product not found</h1>
        <Link to="/shop" className="btn btn-outline" style={{ marginTop: '2rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const activePrice = selectedVariation ? parseFloat(selectedVariation.price) : parseFloat(product.price);
  const hasSale = !selectedVariation && product.original_price && parseFloat(product.original_price) > activePrice;

  return (
    <>
      <SEO 
        title={product.name}
        description={`Buy ${product.name} at Whole Melt Extracts. Premium ${product.category.replace('-', ' ')}${product.strain ? ` (${product.strain})` : ''} crafted for quality and potency. Discreet shipping available.`}
        canonical={`/product/${product.slug}`}
        ogImage={product.images?.[0] || product.image}
        ogType="product"
        schema={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.images?.[0] || product.image],
          "description": product.description || `Premium ${product.category} from Whole Melt Extracts.`,
          "sku": product.id,
          "brand": {
            "@type": "Brand",
            "name": "Whole Melt Extracts"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://wholemeltscarts.us/product/${product.slug}`,
            "priceCurrency": "USD",
            "price": activePrice,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": product.reviews?.length || 10
          }
        }}
      />
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link> <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
            <Link to="/shop">Shop</Link> <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
            <Link to={`/shop?category=${product.category}`}>{product.category.replace('-', ' ')}</Link> <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
            <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            {/* Image */}
            <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', padding: '1rem' }}>
              <img
                src={product.images?.[0] || product.image}
                alt={product.name}
                style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                onError={(e) => { 
                    const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
                    const currentSrc = e.target.src;
                    const base = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                    // Check if currentSrc actually contains a dot for extension
                    if (currentSrc.lastIndexOf('.') === -1) {
                      e.target.src = 'https://placehold.co/600x600/141414/D4AF37?text=Whole+Melt';
                      return;
                    }
                    const currentExt = currentSrc.substring(currentSrc.lastIndexOf('.')).toLowerCase();
                    
                    const nextIndex = extensions.indexOf(currentExt) + 1;
                    if (nextIndex > 0 && nextIndex < extensions.length) {
                        e.target.src = base + extensions[nextIndex];
                    } else if (nextIndex === 0) {
                        e.target.src = base + extensions[0];
                    } else {
                        e.target.src = 'https://placehold.co/600x600/141414/D4AF37?text=Whole+Melt';
                    }
                }}
              />
            </div>

            {/* Info */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {product.category.replace('-', ' ')}
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              {product.strain && (
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', border: '1px solid var(--glass-border)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {product.strain}
                </span>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>${activePrice.toFixed(2)}</span>
                {hasSale && <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${parseFloat(product.original_price).toFixed(2)}</span>}
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                Premium quality {product.category.replace('-', ' ')} from Whole Melt Extracts. Made with organic ingredients and clean extraction methods for a high-quality, pure experience. Lab tested for safety and potency.
              </p>

              {product.variations && product.variations.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Quantity:</label>
                  <select 
                    value={selectedVariation?.name || ''} 
                    onChange={(e) => setSelectedVariation(product.variations.find(v => v.name === e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', outline: 'none' }}
                  >
                    {product.variations.map(v => (
                       <option key={v.name} value={v.name} style={{ background: '#141414', color: 'white' }}>{v.name} - ${v.price}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Qty + Add to Cart */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                <div className="cart-item__qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => {
                  const productToCart = selectedVariation 
                    ? { ...product, id: `${product.id}-${selectedVariation.name}`, name: `${product.name} (${selectedVariation.name})`, price: selectedVariation.price, original_price: selectedVariation.price }
                    : product;
                  addToCart(productToCart, qty);
                }} style={{ flex: 1 }}>
                  <ShoppingBag size={18} /> Add to Cart — ${(activePrice * qty).toFixed(2)}
                </button>
              </div>

              {/* Trust */}
              <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div>✓ Lab Tested & Certified</div>
                  <div>✓ Organic Ingredients</div>
                  <div>✓ 2-3 Day Shipping</div>
                  <div>✓ Discreet Packaging</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div style={{ marginTop: '5rem' }}>
            <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '3rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <button 
                onClick={() => setActiveTab('description')}
                style={{ background: 'none', border: 'none', borderBottom: activeTab === 'description' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'description' ? 'var(--primary)' : 'var(--text-secondary)', padding: '0.75rem 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)' }}
              >
                Product Description
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                style={{ background: 'none', border: 'none', borderBottom: activeTab === 'reviews' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'reviews' ? 'var(--primary)' : 'var(--text-secondary)', padding: '0.75rem 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)' }}
              >
                Reviews
              </button>
              <button 
                onClick={() => setActiveTab('related')}
                style={{ background: 'none', border: 'none', borderBottom: activeTab === 'related' ? '2px solid var(--primary)' : '2px solid transparent', color: activeTab === 'related' ? 'var(--primary)' : 'var(--text-secondary)', padding: '0.75rem 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)' }}
              >
                You May Also Like
              </button>
            </div>

            <div className="tab-content" style={{ minHeight: '300px' }}>
              {activeTab === 'description' && (
                <div className="glass animate-reveal" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.4rem' }}>About {product.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                    Experience the pinnacle of purity and potency with our {product.name}. Crafted using our proprietary extraction methods, this premium {product.category.replace('-', ' ')} preserves the full spectrum of cannabinoids and terpenes, delivering an unmatched flavor profile and profound effects.
                  </p>
                  <ul style={{ color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '2rem', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                    <li>100% Organic, carefully sourced premium cannabis</li>
                    <li>Zero additives, cutting agents, or artificial flavors</li>
                    <li>Rigorously lab-tested for pesticides, heavy metals, and residual solvents</li>
                    <li>{product.strain ? `Expertly curated ${product.strain} strain profile` : 'Expertly curated strain profile'}</li>
                  </ul>

                  <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Microscope size={18} className="text-secondary" /> Technical Specifications
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Extraction</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Cold-Filtered Solventless</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Terpene Profile</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>High-Retention Preservation</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Verification</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldCheck size={14} /> Official Batch
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="glass animate-reveal" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                     <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem' }}>Customer Reviews</h3>
                     <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                       {'★'.repeat(5)} 5.0/5 <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'normal' }}>({product.reviews?.length || 0} Reviews)</span>
                     </span>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((rev, index) => (
                        <div key={index}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div>
                                <strong style={{ color: 'var(--text-primary)' }}>{rev.user}</strong>
                                <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                    <ShieldCheck size={12} /> Verified Buyer
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(rev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span style={{ color: 'var(--primary)' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                            </div>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>"{rev.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: 'var(--text-muted)' }}>No reviews yet for this product.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div className="animate-reveal">
                  {related.length > 0 ? (
                    <div className="product-grid" style={{ paddingTop: '1rem' }}>
                      {related.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                  ) : (
                    <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                      <p style={{ color: 'var(--text-muted)' }}>No related products found at this time.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
