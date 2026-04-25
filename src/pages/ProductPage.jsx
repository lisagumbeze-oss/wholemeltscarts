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
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();
        
        let found = data;
        if (error || !found) {
            found = localProducts.find(p => p.slug === slug || p.id === slug);
        }
        
        if (found) {
            setProduct(found);
            setMainImage(found.images?.[0] || found.image);

            // Track Recently Viewed
            const viewed = JSON.parse(localStorage.getItem('wm_viewed') || '[]');
            const updated = [found, ...viewed.filter(p => p.id !== found.id)].slice(0, 5);
            localStorage.setItem('wm_viewed', JSON.stringify(updated));
            setRecentlyViewed(updated.filter(p => p.id !== found.id));

            // Set Related Products
            const related = localProducts
                .filter(p => p.category === found.category && p.id !== found.id)
                .slice(0, 4);
            setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (product?.variations?.length > 0) {
      setSelectedVariation(product.variations[0]);
    } else {
      setSelectedVariation(null);
    }
  }, [product]);

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
        title={`${product.name} - ${product.category}`}
        description={`Buy premium ${product.name} ${product.category} from Whole Melt Extracts. Lab tested, high potency, and official quality guaranteed.`}
        canonical={`/product/${product.slug || product.id}`}
        ogImage={product.images?.[0] || product.image}
        ogType="product"
        schema={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.images?.[0] || product.image],
          "description": product.description || `Premium quality ${product.name} ${product.category} from Whole Melt Extracts.`,
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
            {/* Image & Gallery */}
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', padding: '1rem' }}>
                <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', cursor: 'zoom-in' }}>
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="hover-zoom"
                    style={{ width: '100%', transition: 'transform 0.8s var(--ease)' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className="glass"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        padding: '0.25rem', 
                        borderRadius: '0.75rem', 
                        border: mainImage === img ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={img} alt={`${product.name} ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                    </button>
                  ))}
                </div>
              )}
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

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>${activePrice.toFixed(2)}</span>
                {hasSale && <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${parseFloat(product.original_price).toFixed(2)}</span>}
              </div>

              {/* Stock Urgency */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div className="animate-glow" style={{ width: '8px', height: '8px', borderRadius: '50%', background: (parseInt(product.id) % 15 + 2) < 8 ? '#ff4d4f' : '#2ecc71' }}></div>
                <span style={{ color: (parseInt(product.id) % 15 + 2) < 8 ? '#ff4d4f' : '#2ecc71', fontWeight: 600 }}>
                  {(parseInt(product.id) % 15 + 2) < 8 
                    ? `Only ${parseInt(product.id) % 15 + 2} units left in stock!` 
                    : 'In Stock - Ready to Ship'}
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                Premium quality {product.category.replace('-', ' ')} from Whole Melt Extracts. Made with organic ingredients and clean extraction methods for a high-quality, pure experience. Lab tested for safety and potency.
              </p>

              {/* Volume Discounts */}
              <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                  🔥 Bulk Savings Available
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'center', padding: '0.5rem', borderRight: '1px solid var(--glass-border)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>5+ Units</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>Save 10%</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.5rem', borderRight: '1px solid var(--glass-border)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>10+ Units</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>Save 15%</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>20+ Units</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>Save 25%</div>
                  </div>
                </div>
              </div>

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
                                <div className="animate-glow" style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', padding: '0.2rem 0.5rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '4px', width: 'fit-content' }}>
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
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <div className="section-header">
                <span className="section-header__tag">Recommendations</span>
                <h2 className="section-header__title">Related <span className="text-gradient">Strains</span></h2>
              </div>
              <div className="product-grid">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <div className="section-header">
                <span className="section-header__tag">Browsing History</span>
                <h2 className="section-header__title">Recently <span className="text-gradient">Viewed</span></h2>
              </div>
              <div className="product-grid">
                {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
