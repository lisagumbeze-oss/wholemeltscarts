import { useState, useEffect, useRef } from 'react';
import { products } from '../data/products';

const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Miami', 'Atlanta', 'Denver', 'Seattle'];
const NAMES = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Skyler', 'Charlie', 'Peyton', 'Quinn', 'Avery'];

export default function SocialProof() {
  const [purchase, setPurchase] = useState(null);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const showNext = () => {
      if (cancelled) return;
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomTime = Math.floor(Math.random() * 55) + 5;

      setPurchase({ product: randomProduct, city: randomCity, name: randomName, time: randomTime });
      setExiting(false);

      // Hide after 6 seconds
      timerRef.current = setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        // Schedule next popup 15-25s after hiding
        timerRef.current = setTimeout(showNext, Math.random() * 10000 + 15000);
      }, 6000);
    };

    // Initial delay before first popup
    timerRef.current = setTimeout(showNext, 10000);

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, []);

  if (!purchase) return null;

  return (
    <div className={`social-proof-popup ${exiting ? 'exit' : ''}`}>
      <img 
        src={purchase.product.images?.[0] || purchase.product.image} 
        alt={purchase.product.name} 
        className="social-proof-popup__img"
        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
      />
      <div className="social-proof-popup__content">
        <div className="social-proof-popup__text">
          <strong>{purchase.name}</strong> from <strong>{purchase.city}</strong> recently purchased <strong>{purchase.product.name}</strong>
        </div>
        <div className="social-proof-popup__time">
          Verified Purchase • {purchase.time} mins ago
        </div>
      </div>
    </div>
  );
}
