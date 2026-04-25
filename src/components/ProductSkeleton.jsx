export default function ProductSkeleton() {
  return (
    <div className="product-card" style={{ pointerEvents: 'none' }}>
      <div className="product-card__image-wrapper" style={{ aspectRatio: '1', background: 'var(--bg-card)' }}>
        <div className="skeleton" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="product-card__body">
        <div className="skeleton" style={{ width: '40%', height: '12px', marginBottom: '0.75rem' }} />
        <div className="skeleton" style={{ width: '90%', height: '18px', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ width: '70%', height: '18px', marginBottom: '1rem' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="skeleton" style={{ width: '30%', height: '24px' }} />
          <div className="skeleton" style={{ width: '50px', height: '32px' }} />
        </div>
      </div>
    </div>
  );
}
