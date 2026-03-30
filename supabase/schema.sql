-- Whole Melts Extracts PostgreSQL Schema
-- Execute this entire file in the Supabase SQL Editor.

-- 1. Create the Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    price NUMERIC NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    original_price NUMERIC,
    description TEXT,
    category TEXT,
    strain TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Service Role can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Service Role can update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Service Role can delete products" ON public.products FOR DELETE USING (true);


-- 2. Create the Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    count INTEGER DEFAULT 0
);

-- Enable RLS for Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.categories FOR SELECT USING (true);
CREATE POLICY "Service Role can insert categories" ON public.categories FOR INSERT WITH CHECK (true);

-- 3. Create the Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    account_detail TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Service Role can view orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Service Role can update orders" ON public.orders FOR UPDATE USING (true);

-- 4. Create the Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL, -- 'payment', 'shipping', 'coupon'
    config JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.settings FOR SELECT USING (true);
CREATE POLICY "Service Role can insert settings" ON public.settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Service Role can update settings" ON public.settings FOR UPDATE USING (true);
CREATE POLICY "Service Role can delete settings" ON public.settings FOR DELETE USING (true);
