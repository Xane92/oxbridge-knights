-- migrate-projects.sql
-- One-time migration of projects from data/manifest.json into public.projects.
-- Run manually in the Supabase SQL Editor.
--
-- Columns: id, title, type, category, location, date, year, tier, legacy, images (text[]), sort_order.
-- sort_order is assigned by year descending (newest = lowest number); ties broken by original manifest order.
-- Every INSERT upserts via ON CONFLICT (id) DO UPDATE, so re-running this file is safe (no duplicates, no errors).

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p03', 'Mixed-Use Development', 'Mixed-Use Development', 'Mixed-Use', 'Victoria Island, Lagos', 'May 2026', 2026, 'hero', false, ARRAY['p03_a.webp'], 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p04', 'Mixed-Use Development', 'Mixed-Use Development', 'Mixed-Use', 'Parkview, Ikoyi, Lagos', 'June 2026', 2026, 'gallery', false, ARRAY['p04_a.webp', 'p04_b.webp'], 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p17', 'Mixed-Use Development', 'Mixed-Use Development', 'Mixed-Use', 'Victoria Island, Lagos', 'April 2026', 2026, 'hero', false, ARRAY['p17_a.webp'], 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p30', 'Private Boutique Hotel', 'Hospitality', 'Commercial & Civic', 'Ikoyi, Lagos', 'February 2026', 2026, 'gallery', false, ARRAY['p30_a.webp'], 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p31', 'Residential Interior Design', 'Interior Design', 'Interiors', 'Eti-Osa, Lagos', 'January 2026', 2026, 'hero', false, ARRAY['p31_a.webp', 'p32_a.webp'], 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p33', 'Residential Interior Design', 'Interior Design', 'Interiors', 'F.C.T. Abuja', 'January 2026', 2026, 'hero', false, ARRAY['p33_a.webp'], 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p38', 'Masjid Design', 'Religious', 'Commercial & Civic', 'Muscat, Oman', 'January 2026', 2026, 'gallery', false, ARRAY['p38_a.webp'], 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p43', 'Office Building', 'Commercial Office', 'Commercial & Civic', 'Lekki, Lagos', 'March 2026', 2026, 'hero', false, ARRAY['p43_a.webp'], 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p52', 'Sporting Facility', 'Recreational', 'Recreational', 'Muscat, Oman', 'March 2026', 2026, 'hero', false, ARRAY['p52_a.webp'], 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p05', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Ikoyi, Lagos', 'August 2025', 2025, 'hero', false, ARRAY['p05_a.webp'], 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p06', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Victoria Island, Lagos', 'November 2025', 2025, 'hero', false, ARRAY['p06_a.webp'], 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p07', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Ikoyi, Lagos', 'April 2025', 2025, 'gallery', false, ARRAY['p07_a.webp'], 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p08', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Eti-Osa, Lagos', 'December 2025', 2025, 'hero', false, ARRAY['p08_a.webp'], 13)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p09', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Parkview, Ikoyi, Lagos', 'November 2025', 2025, 'gallery', false, ARRAY['p09_a.webp'], 14)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p10', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Osborne, Ikoyi, Lagos', 'January 2025', 2025, 'gallery', false, ARRAY['p10_a.webp'], 15)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p11', 'Multi-Residential Development', 'Multi-Residential', 'Multi-Residential', 'Banana Island, Ikoyi, Lagos', 'April 2025', 2025, 'hero', false, ARRAY['p11_a.webp'], 16)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p12', 'Multi-Residential Development (Aquila)', 'Multi-Residential', 'Multi-Residential', 'Lekki Scheme 1, Lagos', 'September 2025', 2025, 'gallery', false, ARRAY['p12_a.webp'], 17)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p18', 'Neo-Classical Residential Villa', 'Private Residence', 'Private Residence', 'Owerri, Imo State', 'October 2025', 2025, 'gallery', false, ARRAY['p18_a.webp'], 18)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p19', 'Terrace Housing', 'Multi-Residential', 'Multi-Residential', 'Eti-Osa, Lagos', 'February 2025', 2025, 'hero', false, ARRAY['p19_a.webp'], 19)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p22', 'Terrace Housing Development', 'Multi-Residential', 'Multi-Residential', 'Lekki Foreshore, Lagos', 'December 2025', 2025, 'gallery', false, ARRAY['p22_a.webp'], 20)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p23', 'Private Residential Development', 'Private Residence', 'Private Residence', 'Ikoyi, Lagos', 'November 2025', 2025, 'hero', false, ARRAY['p23_a.webp'], 21)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p24', 'Semi-Detached Development', 'Multi-Residential', 'Multi-Residential', 'Eti-Osa, Lagos', 'June 2025', 2025, 'hero', false, ARRAY['p24_a.webp'], 22)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p25', 'Terrace Housing', 'Multi-Residential', 'Multi-Residential', 'Eti-Osa, Lagos', 'March 2025', 2025, 'hero', false, ARRAY['p25_a.webp'], 23)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p26', 'Semi-Detached Development', 'Multi-Residential', 'Multi-Residential', 'Lekki Foreshore, Lagos', 'July 2025', 2025, 'gallery', false, ARRAY['p26_a.webp'], 24)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p28', 'Gated Estate Development', 'Multi-Residential', 'Multi-Residential', 'Ibadan, Oyo State', 'July 2025', 2025, 'hero', false, ARRAY['p28_a.webp'], 25)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p29', 'Residential Terrace Housing', 'Multi-Residential', 'Multi-Residential', 'VGC, Lagos', 'May 2025', 2025, 'hero', false, ARRAY['p29_a.webp'], 26)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p34', 'Interior Design', 'Interior Design', 'Interiors', 'Lekki Scheme 1, Lagos', 'December 2025', 2025, 'gallery', false, ARRAY['p34_a.webp', 'p35_a.webp'], 27)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p36', 'Executive Lounge', 'Interior Design', 'Interiors', 'Ikeja, Lagos', 'July 2025', 2025, 'gallery', false, ARRAY['p36_a.webp'], 28)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p41', 'Innovation Hub', 'Institutional', 'Commercial & Civic', 'Enugu, Enugu State', 'March 2025', 2025, 'hero', false, ARRAY['p41_a.webp'], 29)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p42', 'Office Development', 'Commercial Office', 'Commercial & Civic', 'F.C.T. Abuja', 'April 2025', 2025, 'gallery', false, ARRAY['p42_b.webp'], 30)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p49', 'Soccer Stadium', 'Recreational', 'Recreational', 'Eti-Osa, Lagos', 'December 2025', 2025, 'hero', false, ARRAY['p49_a.webp'], 31)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p50', 'Gymnasium & Sporting Arena', 'Recreational', 'Recreational', 'Victoria Island, Lagos', 'October 2025', 2025, 'hero', false, ARRAY['p50_a.webp'], 32)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p51', 'Sporting & Wellness Facility', 'Recreational', 'Recreational', 'Eko Atlantic, Lagos', 'June 2025', 2025, 'hero', false, ARRAY['p51_a.webp'], 33)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p02', 'Residential High-Rise Development', 'Residential High-Rise', 'Residential High-Rise', 'Ikoyi, Lagos', 'December 2024', 2024, 'gallery', false, ARRAY['p02_a.webp', 'p02_b.webp'], 34)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p13', 'Residential High-Rise Development', 'Residential High-Rise', 'Residential High-Rise', 'Victoria Island, Lagos', 'May 2024', 2024, 'gallery', false, ARRAY['p13_a.webp', 'p13_b.webp'], 35)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p15', 'Residential High-Rise Development', 'Residential High-Rise', 'Residential High-Rise', 'Parkview, Ikoyi, Lagos', 'August 2024', 2024, 'gallery', false, ARRAY['p15_a.webp'], 36)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p37', 'Pentecostal Church HQ', 'Religious', 'Commercial & Civic', 'Lagos', 'January 2024', 2024, 'hero', false, ARRAY['p37_a.webp'], 37)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p39', 'Boutique Hotel Design', 'Hospitality', 'Commercial & Civic', 'Port Harcourt', 'September 2024', 2024, 'hero', false, ARRAY['p39_a.webp'], 38)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p14', 'Residential High-Rise Development', 'Residential High-Rise', 'Residential High-Rise', 'Ikoyi, Lagos', 'June 2023', 2023, 'hero', false, ARRAY['p14_a.webp'], 39)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p40', 'Boutique Hotel Design', 'Hospitality', 'Commercial & Civic', 'Lagos', 'June 2023', 2023, 'hero', false, ARRAY['p40_a.webp'], 40)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p01', 'Residential High-Rise Building', 'Residential High-Rise', 'Residential High-Rise', 'Ikoyi, Lagos', 'July 2022', 2022, 'gallery', false, ARRAY['p01_a.webp', 'p01_b.webp'], 41)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p20', 'Private Waterfront Residence', 'Private Residence', 'Private Residence', 'VGC, Lagos', 'August 2022', 2022, 'hero', false, ARRAY['p20_a.webp'], 42)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p21', 'Private Waterfront Residence', 'Private Residence', 'Private Residence', 'Ikorodu, Lagos', 'September 2022', 2022, 'hero', false, ARRAY['p21_a.webp'], 43)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p44', '1500-Capacity Multipurpose Event Hall', 'Institutional', 'Commercial & Civic', 'Abuja', 'October 2022', 2022, 'hero', false, ARRAY['p44_a.webp'], 44)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p16', 'High-Rise Residential Development', 'Residential High-Rise', 'Residential High-Rise', 'Lekki Free Trade Zone, Lagos', 'February 2017', 2017, 'gallery', true, ARRAY['p16_a.webp'], 45)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p27', 'Semi-Detached Residential (Siamese)', 'Multi-Residential', 'Multi-Residential', 'Lekki County Homes, Lagos', 'October 2017', 2017, 'gallery', true, ARRAY['p27_a.webp'], 46)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p46', 'Commercial Bank (Providus)', 'Commercial', 'Commercial & Civic', 'Allen Avenue, Ikeja', 'December 2017', 2017, 'gallery', true, ARRAY['p46_a.webp'], 47)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p45', 'Commercial Development', 'Commercial', 'Commercial & Civic', 'Lekki Scheme 1, Lagos', 'November 2016', 2016, 'hero', true, ARRAY['p45_a.webp'], 48)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p47', 'Phil''s Fast Food & Bar', 'Commercial', 'Commercial & Civic', 'UNILAG, Lagos', 'January 2016', 2016, 'hero', true, ARRAY['p47_a.webp'], 49)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

INSERT INTO public.projects (id, title, type, category, location, date, year, tier, legacy, images, sort_order) VALUES
  ('p48', 'Commercial Bank', 'Commercial', 'Commercial & Civic', 'Bode Thomas, Surulere', 'March 2016', 2016, 'gallery', true, ARRAY['p48_a.webp'], 50)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, type = EXCLUDED.type, category = EXCLUDED.category, location = EXCLUDED.location, date = EXCLUDED.date, year = EXCLUDED.year, tier = EXCLUDED.tier, legacy = EXCLUDED.legacy, images = EXCLUDED.images, sort_order = EXCLUDED.sort_order;

-- Expected row count: 50 projects (44 with legacy = false, 6 with legacy = true).
