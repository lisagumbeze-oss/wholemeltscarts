import { useState, useEffect } from 'react';
import { products } from '../data/products';

const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Miami', 'Atlanta', 'Denver', 'Seattle'];
const NAMES = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Skyler', 'Charlie', 'Peyton', 'Quinn', 'Avery'];

export default function SocialProof() {
  const [purchase, setPurchase] = useState(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const showNewPurchase = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomTime = Math.floor(Math.random() * 55) + 5;

      setPurchase({
        product: randomProduct,
        city: randomCity,
        name: randomName,
        time: randomTime
      });
      setExiting(false);

      // Hide after 6 seconds
      setTimeout(() => {
        setExiting(true);
      }, 6000);
    };

    // Initial delay before first popup
    const timer = setTimeout(showNewPurchase, 8000);

    // Repeat every 20-30 seconds
    const interval = setInterval(() => {
      showNewPurchase();
    }, Math.random() * (30000 - 20000) + 20000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!purchase) return null;

  return (
    <div className={`social-proof-popup ${exiting ? 'exit' : ''}`}>
      <img 
        src={purchase.product.images?.[0] || purchase.product.image} 
        alt={purchase.product.name} 
        className="social-proof-popup__img" 
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
