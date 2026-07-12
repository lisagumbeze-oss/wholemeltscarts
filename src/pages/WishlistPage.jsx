import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
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
          <div className="section-header section-header--center animate-reveal">
            <span className="section-header__tag">Saved items</span>
            <h1 className="section-header__title">My <span className="text-gradient">wishlist</span></h1>
          </div>

          {wishlist.length === 0 ? (
            <div className="empty-state">
              <Heart size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <h2>Your wishlist is empty</h2>
              <p>Save products you love and come back when you're ready.</p>
              <Link to="/shop" className="btn btn-primary">Browse shop <ArrowRight size={16} /></Link>
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
