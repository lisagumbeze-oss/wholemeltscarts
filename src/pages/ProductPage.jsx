import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Minus, Plus, Loader2, ShieldCheck, Microscope } from 'lucide-react';
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
  const stockCount = (parseInt(product.id) % 15) + 2;
  const isLowStock = stockCount < 8;

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

          <div className="pdp">
            <div className="pdp__gallery">
              <div className="pdp__stage">
                <img src={mainImage} alt={product.name} />
              </div>

              {product.images && product.images.length > 1 && (
                <div className="pdp__thumbs">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`pdp__thumb${mainImage === img ? ' is-active' : ''}`}
                      onClick={() => setMainImage(img)}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="pdp__category">{product.category.replace('-', ' ')}</span>
              <h1 className="pdp__title">{product.name}</h1>
              {product.strain && <span className="pdp__strain">{product.strain}</span>}

              <div className="pdp__price">
                <span className="pdp__price-now">${activePrice.toFixed(2)}</span>
                {hasSale && (
                  <span className="pdp__price-was">${parseFloat(product.original_price).toFixed(2)}</span>
                )}
              </div>

              <div className={`pdp__stock${isLowStock ? ' pdp__stock--low' : ''}`}>
                <span className="pdp__stock-dot" />
                {isLowStock ? `Only ${stockCount} units left` : 'In stock — ready to ship'}
              </div>

              <p className="pdp__desc">
                Premium {product.category.replace('-', ' ')} from Whole Melt Extracts. Clean extraction,
                full-spectrum flavor, and lab-tested potency.
              </p>

              <div className="pdp__bulk">
                <div className="pdp__bulk-label">Bulk savings</div>
                <div className="pdp__bulk-grid">
                  <div><strong>5+ units</strong><span>Save 10%</span></div>
                  <div><strong>10+ units</strong><span>Save 15%</span></div>
                  <div><strong>20+ units</strong><span>Save 25%</span></div>
                </div>
              </div>

              {product.variations && product.variations.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Select quantity</label>
                  <select
                    className="form-select"
                    value={selectedVariation?.name || ''}
                    onChange={(e) => setSelectedVariation(product.variations.find(v => v.name === e.target.value))}
                  >
                    {product.variations.map(v => (
                      <option key={v.name} value={v.name}>{v.name} — ${v.price}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pdp__buy">
                <div className="cart-item__qty">
                  <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1 }}
                  onClick={() => {
                    const productToCart = selectedVariation
                      ? { ...product, id: `${product.id}-${selectedVariation.name}`, name: `${product.name} (${selectedVariation.name})`, price: selectedVariation.price, original_price: selectedVariation.price }
                      : product;
                    addToCart(productToCart, qty);
                  }}
                >
                  <ShoppingBag size={18} /> Add to Cart — ${(activePrice * qty).toFixed(2)}
                </button>
              </div>

              <div className="pdp__trust">
                <div>Lab tested & certified</div>
                <div>Organic ingredients</div>
                <div>2–3 day shipping</div>
                <div>Discreet packaging</div>
              </div>
            </div>
          </div>

          <div className="pdp-tabs">
            <button type="button" className={activeTab === 'description' ? 'is-active' : ''} onClick={() => setActiveTab('description')}>
              Description
            </button>
            <button type="button" className={activeTab === 'reviews' ? 'is-active' : ''} onClick={() => setActiveTab('reviews')}>
              Reviews
            </button>
            <button type="button" className={activeTab === 'related' ? 'is-active' : ''} onClick={() => setActiveTab('related')}>
              Related
            </button>
          </div>

          <div className="pdp-panel">
            {activeTab === 'description' && (
              <div className="animate-reveal">
                <h3>About {product.name}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Experience the pinnacle of purity and potency with our {product.name}. Crafted using proprietary
                  extraction methods, this premium {product.category.replace('-', ' ')} preserves full-spectrum
                  cannabinoids and terpenes.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  <li>100% organic, carefully sourced premium cannabis</li>
                  <li>Zero additives, cutting agents, or artificial flavors</li>
                  <li>Rigorously lab-tested for pesticides, heavy metals, and residual solvents</li>
                  <li>{product.strain ? `Expertly curated ${product.strain} strain profile` : 'Expertly curated strain profile'}</li>
                </ul>
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Microscope size={18} /> Technical specifications
                </h4>
                <div className="pdp__bulk-grid" style={{ textAlign: 'left' }}>
                  <div><strong>Extraction</strong><span>Cold-filtered solventless</span></div>
                  <div><strong>Terpene profile</strong><span>High-retention preservation</span></div>
                  <div><strong>Verification</strong><span><ShieldCheck size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Official batch</span></div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-reveal">
                <h3>Customer reviews</h3>
                <p style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  ★★★★★ 5.0/5 <span style={{ color: 'var(--text-muted)' }}>({product.reviews?.length || 0} reviews)</span>
                </p>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev, index) => (
                    <div key={index} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <strong>{rev.user}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          {new Date(rev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No reviews yet for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'related' && (
              <div className="animate-reveal">
                {relatedProducts.length > 0 ? (
                  <div className="product-grid">
                    {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No related products found.</p>
                )}
              </div>
            )}
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
