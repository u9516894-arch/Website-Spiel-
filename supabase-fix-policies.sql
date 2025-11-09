-- ============================================
-- FIX: RLS Policies für INSERT und UPDATE hinzufügen
-- Kopiere diesen Code in den SQL Editor von Supabase und führe ihn aus
-- ============================================

-- Policies für INSERT (Hinzufügen)
CREATE POLICY "Public insert access" ON career_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON drinks_menu FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON flyers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON events FOR INSERT WITH CHECK (true);

-- Policies für UPDATE (Ändern)
CREATE POLICY "Public update access" ON career_content FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON drinks_menu FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON flyers FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON events FOR UPDATE USING (true);

-- Storage Policies für öffentlichen Upload (ohne Authentifizierung)
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

CREATE POLICY "Public upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Public update access" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Public delete access" ON storage.objects FOR DELETE USING (bucket_id = 'images');

