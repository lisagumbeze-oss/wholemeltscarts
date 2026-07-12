import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SocialProof from './components/SocialProof';
import AbandonedCartReminder from './components/AbandonedCartReminder';
import BackToTop from './components/BackToTop';
import AIConcierge from './components/AIConcierge';
import BottomNav from './components/BottomNav';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <SocialProof />
      <AbandonedCartReminder />
      <BackToTop />
      <AIConcierge />
      <main style={{ minHeight: '60vh' }}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
