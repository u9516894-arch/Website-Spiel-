# Supabase Storage Policies Fix

Wenn Bilder hochgeladen werden können, aber nicht gespeichert werden, liegt es wahrscheinlich an den Storage Policies.

## Lösung:

1. Gehe zu deinem Supabase Dashboard
2. Klicke auf **Storage** → **Policies**
3. Wähle den Bucket **`images`** aus
4. Stelle sicher, dass folgende Policies existieren:

### Policy 1: Public Upload (INSERT)
```sql
CREATE POLICY "Public upload access" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'images');
```

### Policy 2: Public Update (UPDATE)
```sql
CREATE POLICY "Public update access" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'images');
```

### Policy 3: Public Delete (DELETE)
```sql
CREATE POLICY "Public delete access" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'images');
```

## Falls die Policies nicht existieren:

1. Gehe zu **Storage** → **Policies**
2. Klicke auf **New Policy**
3. Erstelle die drei Policies oben
4. Oder führe das SQL-Script `supabase-fix-policies.sql` erneut aus

## Alternative: Vollständiges SQL-Script

Falls du alle Policies neu erstellen willst, führe dieses Script im SQL Editor aus:

```sql
-- Lösche alte Policies falls vorhanden
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;
DROP POLICY IF EXISTS "Public delete access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Erstelle neue öffentliche Policies
CREATE POLICY "Public upload access" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public update access" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'images');

CREATE POLICY "Public delete access" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'images');
```

## Nach dem Fix:

1. Seite neu laden
2. Versuche erneut ein Bild hochzuladen
3. Schaue in die Browser-Konsole (F12) für Fehlermeldungen
4. Die Fehlermeldungen sollten jetzt auch in der Toast-Benachrichtigung angezeigt werden

