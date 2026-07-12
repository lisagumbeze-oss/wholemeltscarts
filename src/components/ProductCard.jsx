import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const activePrice = parseFloat(product.price);
  const hasSale = product.original_price && parseFloat(product.original_price) > activePrice;
  const stock = (parseInt(product.id) % 15) + 2;
  const isLowStock = stock < 8;
  const isSaved = isInWishlist(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug || product.id}`}>
        <div className="product-card__image-wrapper">
          {hasSale && <span className="product-card__badge">Sale</span>}
          {isLowStock && !hasSale && (
            <span className="product-card__badge product-card__badge--alert">Low Stock</span>
          )}

          <button
            type="button"
            className={`product-card__wishlist-btn${isSaved ? ' is-saved' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          <img
            className="product-card__image"
            src={product.images?.[0] || product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
              const currentSrc = e.target.src;
              const base = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
              const currentExt = currentSrc.substring(currentSrc.lastIndexOf('.')).toLowerCase();
              const nextIndex = extensions.indexOf(currentExt) + 1;
              if (nextIndex > 0 && nextIndex < extensions.length) {
                e.target.src = base + extensions[nextIndex];
              } else if (nextIndex === 0) {
                e.target.src = base + extensions[0];
              } else {
                e.target.src = 'https://placehold.co/400x400/141414/D4AF37?text=Whole+Melt';
              }
            }}
          />
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__category">{(product.category || '').replace('-', ' ')}</div>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <div className="product-card__meta">
          <div>
            <span className="product-card__price">${activePrice.toFixed(2)}</span>
            {hasSale && (
              <span className="product-card__price--old">
                ${parseFloat(product.original_price).toFixed(2)}
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
