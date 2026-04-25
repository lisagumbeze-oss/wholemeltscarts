import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <>
      <SEO 
        title="My Wishlist | Whole Melt Extracts"
        description="View your saved premium extracts and flavors. Keep track of your favorite Whole Melt products."
        canonical="/wishlist"
      />

      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="section-header text-center animate-reveal">
            <span className="section-header__tag">Saved Items</span>
            <h1 className="section-header__title">My <span className="text-gradient">Wishlist</span></h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="glass" style={{ padding: '5rem 2rem', textAlign: 'center', borderRadius: '2rem', border: '1px solid var(--glass-border)' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Heart size={40} style={{ color: 'var(--text-muted)' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your wishlist is empty</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                Save your favorite premium extracts here to keep track of them for later.
              </p>
              <Link to="/shop" className="btn btn-primary">
                Explore Shop <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="product-grid animate-reveal">
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
