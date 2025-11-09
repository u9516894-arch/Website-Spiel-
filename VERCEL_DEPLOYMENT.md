# 🚀 Vercel Deployment & Supabase Setup

## Warum Supabase?

Aktuell verwendet die Website `localStorage` - das funktioniert **NICHT** für eine öffentliche Website, weil:
- ❌ Daten werden nur im Browser des Kunden gespeichert
- ❌ Andere Nutzer sehen die Änderungen nicht
- ❌ Daten gehen verloren, wenn der Browser-Cache gelöscht wird

**Mit Supabase:**
- ✅ Daten werden zentral in der Cloud gespeichert
- ✅ Alle Nutzer sehen die gleichen Inhalte
- ✅ Änderungen sind sofort für alle sichtbar
- ✅ Kein neuer Deploy nötig!

---

## Schritt 1: Supabase einrichten

### 1.1 Account & Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle einen Account
2. Klicke auf **"New Project"**
3. Fülle aus:
   - **Name**: `spiel-guide-pro`
   - **Database Password**: Wähle ein sicheres Passwort (⚠️ **WICHTIG: Speichere es!**)
   - **Region**: Wähle die nächstgelegene (z.B. "West EU (Ireland)")
4. Klicke **"Create new project"**
5. ⏳ Warte 2-3 Minuten

### 1.2 API Keys kopieren

1. Gehe zu **Settings** (⚙️) → **API**
2. Kopiere:
   - **Project URL** (z.B. `https://xxxxx.supabase.co`)
   - **anon public** Key

### 1.3 Datenbank-Schema erstellen

1. Gehe zu **SQL Editor** im Supabase Dashboard
2. Klicke auf **"New query"**
3. Kopiere das SQL-Script aus `supabase-schema.sql` (wird gleich erstellt)
4. Führe es aus (Run oder Cmd/Ctrl + Enter)

---

## Schritt 2: Environment Variables

### 2.1 Lokal (.env Datei)

Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
VITE_SUPABASE_URL=https://deine-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
```

### 2.2 In Vercel

1. Gehe zu deinem Vercel Projekt
2. **Settings** → **Environment Variables**
3. Füge hinzu:
   - `VITE_SUPABASE_URL` = deine Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = dein anon Key
4. Wähle **Production**, **Preview** und **Development**
5. Klicke **Save**

---

## Schritt 3: Code-Migration

Der Code wird automatisch von `localStorage` auf Supabase migriert. Die Dateien werden angepasst.

---

## Schritt 4: Vercel Deployment

### 4.1 Erster Deploy

1. **GitHub Repository erstellen** (falls noch nicht vorhanden)
2. **Vercel Projekt erstellen**:
   - Gehe zu [vercel.com](https://vercel.com)
   - Klicke **"Add New Project"**
   - Verbinde mit GitHub
   - Wähle dein Repository
   - Setze **Framework Preset**: Vite
   - Setze **Root Directory**: `.` (Root)
   - Füge Environment Variables hinzu (siehe Schritt 2.2)
   - Klicke **Deploy**

3. ⏳ Warte auf den ersten Deploy (2-3 Minuten)

### 4.2 Nach dem ersten Deploy

**Das war's!** 🎉

- ✅ Website ist live
- ✅ Alle Änderungen werden automatisch aus Supabase geladen
- ✅ **Kein neuer Deploy nötig** für Content-Änderungen!

---

## Wie funktioniert es?

1. **Erster Deploy**: Website wird auf Vercel deployed
2. **Content-Änderungen**: 
   - Kunde loggt sich ein (Passwort)
   - Ändert Inhalte über die Website
   - Daten werden in Supabase gespeichert
   - **Sofort für alle Nutzer sichtbar** - kein neuer Deploy!

3. **Code-Änderungen**: 
   - Nur wenn du Code änderst → neuer Deploy nötig
   - Content-Änderungen → **kein Deploy nötig**

---

## Wichtige Hinweise

- **Storage Bucket**: Muss öffentlich sein für Bilder
- **RLS Policies**: Öffentliches Lesen erlauben
- **Backup**: Supabase erstellt automatisch Backups
- **Kosten**: Supabase Free Tier ist ausreichend für den Start

---

## Troubleshooting

**Fehler "Missing Supabase environment variables"?**
→ Prüfe Environment Variables in Vercel

**Bilder werden nicht angezeigt?**
→ Prüfe Storage Bucket Policies

**Änderungen werden nicht gespeichert?**
→ Prüfe RLS Policies (müssen öffentliches Lesen erlauben)

