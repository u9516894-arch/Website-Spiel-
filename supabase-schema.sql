-- ============================================
-- SUPABASE DATENBANK-SCHEMA
-- Kopiere diesen gesamten Inhalt in den SQL Editor von Supabase
-- ============================================

-- Tabelle für Karriere-Inhalte
CREATE TABLE IF NOT EXISTS career_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabelle für Getränkekarte (Basement Bar)
CREATE TABLE IF NOT EXISTS drinks_menu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabelle für Flyer (Basement Bar)
CREATE TABLE IF NOT EXISTS flyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flyer_number INTEGER NOT NULL CHECK (flyer_number IN (1, 2)),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(flyer_number)
);

-- Tabelle für Veranstaltungen/Angebote (Basement Bar)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_career_content_updated_at BEFORE UPDATE ON career_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drinks_menu_updated_at BEFORE UPDATE ON drinks_menu
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flyers_updated_at BEFORE UPDATE ON flyers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage Bucket für Bilder
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies (öffentlicher Zugriff für Lesen)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Row Level Security aktivieren
ALTER TABLE career_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE drinks_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE flyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Öffentliches Lesen erlauben
CREATE POLICY "Public read access" ON career_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON drinks_menu FOR SELECT USING (true);
CREATE POLICY "Public read access" ON flyers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);

-- Initialdaten einfügen
INSERT INTO drinks_menu (images) VALUES (ARRAY[]::TEXT[])
ON CONFLICT DO NOTHING;

INSERT INTO events (title, items) VALUES ('Veranstaltungen/Angebote', ARRAY['Happy Hour täglich', 'Live-Musik am Wochenende'])
ON CONFLICT DO NOTHING;

