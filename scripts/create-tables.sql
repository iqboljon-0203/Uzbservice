-- Supabase SQL Editor orqali bajaring
-- Barcha jadvallarni yaratadi

-- 1. site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL,
  lang text NOT NULL DEFAULT 'ru',
  data jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, lang)
);

-- 2. services
CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id text UNIQUE NOT NULL,
  title_ru text NOT NULL DEFAULT '',
  title_uz text NOT NULL DEFAULT '',
  desc_ru text NOT NULL DEFAULT '',
  desc_uz text NOT NULL DEFAULT '',
  image text DEFAULT '',
  price_note_ru text DEFAULT '',
  price_note_uz text DEFAULT '',
  badge_ru text DEFAULT '',
  badge_uz text DEFAULT '',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  author_ru text NOT NULL DEFAULT '',
  author_uz text NOT NULL DEFAULT '',
  avatar text DEFAULT '',
  rating int DEFAULT 5,
  text_ru text NOT NULL DEFAULT '',
  text_uz text NOT NULL DEFAULT '',
  service_ru text DEFAULT '',
  service_uz text DEFAULT '',
  date_ru text DEFAULT '',
  date_uz text DEFAULT '',
  sort_order int DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 4. counters
CREATE TABLE IF NOT EXISTS counters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  counter_id text UNIQUE NOT NULL,
  target int NOT NULL DEFAULT 0,
  suffix text DEFAULT '+',
  label_ru text NOT NULL DEFAULT '',
  label_uz text NOT NULL DEFAULT '',
  icon text DEFAULT '',
  sort_order int DEFAULT 0
);

-- 5. service_details
CREATE TABLE IF NOT EXISTS service_details (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title_ru text NOT NULL DEFAULT '',
  title_uz text NOT NULL DEFAULT '',
  subtitle_ru text NOT NULL DEFAULT '',
  subtitle_uz text NOT NULL DEFAULT '',
  hero_image text DEFAULT '',
  badge_ru text DEFAULT '',
  badge_uz text DEFAULT '',
  price_from_ru text DEFAULT '',
  price_from_uz text DEFAULT '',
  brands text[] DEFAULT '{}',
  symptom_title_ru text DEFAULT '',
  symptom_title_uz text DEFAULT '',
  symptom_desc_ru text DEFAULT '',
  symptom_desc_uz text DEFAULT '',
  symptom_items jsonb DEFAULT '[]',
  seo_text jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. breakdowns
CREATE TABLE IF NOT EXISTS breakdowns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service_detail_slug text NOT NULL REFERENCES service_details(slug) ON DELETE CASCADE,
  breakdown_id text NOT NULL,
  title_ru text NOT NULL DEFAULT '',
  title_uz text NOT NULL DEFAULT '',
  description_ru text NOT NULL DEFAULT '',
  description_uz text NOT NULL DEFAULT '',
  price_ru text DEFAULT '',
  price_uz text DEFAULT '',
  icon_type text DEFAULT 'power',
  image text DEFAULT '',
  sort_order int DEFAULT 0
);

-- 7. leads
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text DEFAULT '',
  phone text NOT NULL,
  service text DEFAULT '',
  comment text DEFAULT '',
  lang text DEFAULT 'ru',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- RLS (Row Level Security) sozlamalari
-- Umumiy o'qish huquqi (anon key bilan)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE breakdowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public o'qish
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read counters" ON counters FOR SELECT USING (true);
CREATE POLICY "Public read service_details" ON service_details FOR SELECT USING (true);
CREATE POLICY "Public read breakdowns" ON breakdowns FOR SELECT USING (true);

-- Leads: Hamma insert qilishi mumkin, lekin o'qish faqat service_role
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (auth.role() = 'service_role');

-- Service role: barcha jadvallarda to'liq huquq
CREATE POLICY "Service role full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access services" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access reviews" ON reviews FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access counters" ON counters FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access service_details" ON service_details FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access breakdowns" ON breakdowns FOR ALL USING (auth.role() = 'service_role');
