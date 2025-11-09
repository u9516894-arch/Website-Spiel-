# 🚀 Nächste Schritte - So geht's weiter!

## ✅ Aktueller Status

- ✅ Code ist fertig und funktioniert lokal
- ✅ Supabase-Integration ist implementiert
- ✅ Dependencies sind installiert

---

## 📋 Was du jetzt tun musst:

### Schritt 1: Supabase einrichten (5-10 Minuten)

1. **Gehe zu [supabase.com](https://supabase.com)** und erstelle einen Account (falls noch nicht vorhanden)

2. **Erstelle ein neues Projekt**:
   - Klicke auf **"New Project"**
   - **Name**: `spiel-guide-pro` (oder wie du möchtest)
   - **Database Password**: Wähle ein sicheres Passwort ⚠️ **WICHTIG: Speichere es!**
   - **Region**: Wähle die nächstgelegene (z.B. "West EU (Ireland)")
   - Klicke **"Create new project"**
   - ⏳ Warte 2-3 Minuten

3. **Kopiere die API Keys**:
   - Gehe zu **Settings** (⚙️) → **API**
   - Kopiere:
     - **Project URL** (z.B. `https://xxxxx.supabase.co`)
     - **anon public** Key (langer String)

4. **Erstelle die Datenbank-Tabellen**:
   - Gehe zu **SQL Editor** (im linken Menü)
   - Klicke auf **"New query"**
   - Öffne die Datei `supabase-schema.sql` in deinem Projekt
   - Kopiere den **kompletten Inhalt**
   - Füge ihn in den SQL Editor ein
   - Klicke **"Run"** (oder Cmd/Ctrl + Enter)
   - ✅ Du solltest "Success" sehen

---

### Schritt 2: Environment Variables setzen

#### 2.1 Lokal (.env Datei)

Erstelle eine `.env` Datei im Root-Verzeichnis deines Projekts:

```env
VITE_SUPABASE_URL=https://deine-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
```

**Beispiel:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

#### 2.2 Testen (lokal)

```bash
npm run dev
```

Öffne `http://localhost:8080` und teste:
- ✅ Karriere-Seite bearbeiten (Passwort: **2673**)
- ✅ Getränkekarte hochladen
- ✅ Flyer hochladen
- ✅ Veranstaltungen ändern

---

### Schritt 3: GitHub Repository erstellen (falls noch nicht vorhanden)

```bash
# Initialisiere Git (falls noch nicht geschehen)
git init
git add .
git commit -m "Initial commit"

# Erstelle Repository auf GitHub und verbinde es
git remote add origin https://github.com/dein-username/dein-repo.git
git push -u origin main
```

---

### Schritt 4: Vercel Deployment

#### Option A: Über GitHub (empfohlen)

1. **Gehe zu [vercel.com](https://vercel.com)** und logge dich ein
2. Klicke **"Add New Project"**
3. **Verbinde mit GitHub** (wenn noch nicht verbunden)
4. **Wähle dein Repository** aus
5. **Konfiguration**:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (Root)
   - **Build Command**: `npm run build` (sollte automatisch erkannt werden)
   - **Output Directory**: `dist` (sollte automatisch erkannt werden)
6. **Environment Variables hinzufügen**:
   - Klicke auf **"Environment Variables"**
   - Füge hinzu:
     - `VITE_SUPABASE_URL` = deine Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = dein anon Key
   - Wähle **Production**, **Preview** und **Development**
   - Klicke **Save**
7. Klicke **"Deploy"**
8. ⏳ Warte 2-3 Minuten

#### Option B: Über Vercel CLI

```bash
# Installiere Vercel CLI (falls noch nicht installiert)
npm install -g vercel

# Deploye
vercel

# Folge den Anweisungen und füge Environment Variables hinzu
```

---

### Schritt 5: Fertig! 🎉

Nach dem ersten Deploy:

- ✅ Website ist live auf Vercel
- ✅ Alle Änderungen werden automatisch aus Supabase geladen
- ✅ **Kein neuer Deploy nötig** für Content-Änderungen!

---

## 🔄 Wie funktioniert es danach?

### Content-Änderungen (kein Deploy nötig):
1. Kunde öffnet die Website
2. Klickt auf bearbeitbare Bereiche (mit Passwort **2673**)
3. Ändert Inhalte
4. Klickt auf "Speichern"
5. **Sofort für alle Nutzer sichtbar** ✨

### Code-Änderungen (Deploy nötig):
- Nur wenn du den **Code** änderst → neuer Deploy
- Content-Änderungen → **kein Deploy nötig**

---

## 📝 Checkliste

- [ ] Supabase Account erstellt
- [ ] Supabase Projekt erstellt
- [ ] SQL-Schema ausgeführt (`supabase-schema.sql`)
- [ ] API Keys kopiert
- [ ] `.env` Datei erstellt (lokal)
- [ ] Lokal getestet (`npm run dev`)
- [ ] GitHub Repository erstellt (optional, aber empfohlen)
- [ ] Vercel Projekt erstellt
- [ ] Environment Variables in Vercel gesetzt
- [ ] Erster Deploy durchgeführt
- [ ] Website getestet (live)

---

## ⚠️ Wichtige Hinweise

1. **`.env` Datei**: Wird NICHT zu GitHub gepusht (ist bereits in `.gitignore`)
2. **Environment Variables**: Müssen sowohl lokal als auch in Vercel gesetzt werden
3. **Storage Bucket**: Muss öffentlich sein für Bilder
4. **RLS Policies**: Müssen öffentliches Lesen erlauben

---

## 🆘 Hilfe bei Problemen

**Fehler beim SQL-Schema?**
→ Stelle sicher, dass du das komplette Script kopiert hast

**Bilder werden nicht hochgeladen?**
→ Prüfe Storage Bucket Policies in Supabase

**Environment Variables funktionieren nicht?**
→ Prüfe, ob die Variablen in Vercel korrekt gesetzt sind

**Website zeigt alte Daten?**
→ Browser-Cache leeren oder Hard Refresh (Cmd/Ctrl + Shift + R)

---

## 📞 Nächste Schritte

1. **Starte mit Schritt 1** (Supabase einrichten)
2. **Teste lokal** bevor du deployst
3. **Deploye auf Vercel**
4. **Fertig!** 🎉

Viel Erfolg! 🚀

