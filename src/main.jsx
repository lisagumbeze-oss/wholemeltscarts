import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import './index.css';

import App from './App';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ShippingPage from './pages/ShippingPage';
import WholesalePage from './pages/WholesalePage';
import StrainLibraryPage from './pages/StrainLibraryPage';
import LabHubPage from './pages/LabHubPage';
import WishlistPage from './pages/WishlistPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminSupport from './pages/admin/AdminSupport';
import AdminMarketing from './pages/admin/AdminMarketing';
import AdminLogin from './pages/admin/AdminLogin';
import AppRoot from './components/AppRoot';

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      // Pathless layout: `path: '/'` only matched the exact root URL and sent /shop etc. to the splat → home.
      {
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'shop', element: <ShopPage /> },
          { path: 'product/:slug', element: <ProductPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'wishlist', element: <WishlistPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'faq', element: <FAQPage /> },
          { path: 'blog', element: <BlogPage /> },
          { path: 'blog/:slug', element: <BlogPostPage /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'privacy', element: <PrivacyPage /> },
          { path: 'terms', element: <TermsPage /> },
          { path: 'shipping', element: <ShippingPage /> },
          { path: 'wholesale', element: <WholesalePage /> },
          { path: 'strains', element: <StrainLibraryPage /> },
          { path: 'lab-results', element: <LabHubPage /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
      {
        path: 'admin/login',
        element: <AdminLogin />,
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'products', element: <AdminProducts /> },
          { path: 'orders', element: <AdminOrders /> },
          { path: 'customers', element: <AdminCustomers /> },
          { path: 'analytics', element: <AdminAnalytics /> },
          { path: 'blog', element: <AdminBlog /> },
          { path: 'coupons', element: <AdminCoupons /> },
          { path: 'support', element: <AdminSupport /> },
          { path: 'marketing', element: <AdminMarketing /> },
          { path: 'settings', element: <AdminSettings /> },
          { path: '*', element: <Navigate to="/admin" replace /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </HelmetProvider>
  </StrictMode>,
);
