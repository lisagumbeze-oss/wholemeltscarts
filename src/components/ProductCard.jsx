import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="product-card__image-wrapper">
          {product.badge && <span className="product-card__badge">{product.badge}</span>}
          <img
            className="product-card__image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.target.src = 'https://placehold.co/400x400/141414/D4AF37?text=Whole+Melt'; }}
          />
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__category">{product.category.replace('-', ' ')}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="product-card__price">${product.salePrice || product.price}</span>
            {product.salePrice && <span className="product-card__price--old">${product.price}</span>}
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
