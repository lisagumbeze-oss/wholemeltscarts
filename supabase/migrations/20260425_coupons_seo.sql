-- Migration: Add Coupons and SEO Tables
-- Domain 5: Coupons & Promotions
-- Domain 8: SEO & Metadata

-- 1. Create Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage', 'fixed_cart', 'fixed_product', 'free_shipping'
    amount NUMERIC NOT NULL DEFAULT 0,
    min_spend NUMERIC DEFAULT 0,
    max_spend NUMERIC,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'scheduled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active coupons" ON public.coupons FOR SELECT USING (status = 'active');
CREATE POLICY "Service Role can manage coupons" ON public.coupons FOR ALL USING (true);

-- 2. Create Global SEO Table
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    site_title TEXT NOT NULL DEFAULT 'Whole Melts Extracts',
    site_description TEXT,
    og_image TEXT,
    robots_txt TEXT DEFAULT 'User-agent: *\nAllow: /',
    google_analytics_id TEXT,
    facebook_pixel_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for SEO
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view SEO settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Service Role can manage SEO settings" ON public.seo_settings FOR ALL USING (true);

-- 3. Update Products for SEO (if not exists)
-- This is just a reminder, Supabase will ignore if columns exist.
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS seo_title TEXT;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS seo_description TEXT;
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 4. Create Blog Posts Table (if missing from previous turn)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    author TEXT DEFAULT 'Admin',
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published'
    seo_title TEXT,
    seo_description TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Blog
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Service Role can manage blog posts" ON public.blog_posts FOR ALL USING (true);
