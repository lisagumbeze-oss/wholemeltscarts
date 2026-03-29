import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);
