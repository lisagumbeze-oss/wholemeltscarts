import { createContext, useContext, useState, useEffect } from 'react';

import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('wm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('wm_cart', JSON.stringify(cart));
  }, [cart]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
    
    addToast(
      'Added to Cart', 
      `${product.name} has been added to your basket.`,
      'success'
    );
    
    openDrawer(); // Automatically open drawer on add
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, drawerOpen, openDrawer, closeDrawer }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
