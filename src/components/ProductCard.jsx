import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const activePrice = parseFloat(product.price);
  const hasSale = product.original_price && parseFloat(product.original_price) > activePrice;

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug || product.id}`}>
        <div className="product-card__image-wrapper">
          {hasSale && <span className="product-card__badge">Sale</span>}
          <img
            className="product-card__image"
            src={product.images?.[0] || product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.target.src = 'https://placehold.co/400x400/141414/D4AF37?text=Whole+Melt'; }}
          />
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__category">{product.category.replace('-', ' ')}</div>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="product-card__price">${activePrice.toFixed(2)}</span>
            {hasSale && <span className="product-card__price--old">${parseFloat(product.original_price).toFixed(2)}</span>}
          </div>
          <button
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
