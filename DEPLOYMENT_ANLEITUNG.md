# 🚀 Deployment-Anleitung: Einmal deployen, dann automatisch aktualisiert

## ✅ Was wurde gemacht?

Die Website wurde von `localStorage` auf **Supabase** migriert. Das bedeutet:

- ✅ **Einmal deployen** auf Vercel
- ✅ **Danach**: Alle Content-Änderungen sind **sofort für alle Nutzer sichtbar**
- ✅ **Kein neuer Deploy nötig** für Content-Änderungen!

---

## 📋 Schritt-für-Schritt Setup

### Schritt 1: Supabase einrichten

1. **Account erstellen**: [supabase.com](https://supabase.com)
2. **Neues Projekt erstellen**:
   - Name: `spiel-guide-pro`
   - Region: Wähle die nächstgelegene
   - Database Password: Wähle ein sicheres Passwort (⚠️ **speichere es!**)
3. **Warte 2-3 Minuten** bis das Projekt fertig ist

### Schritt 2: Datenbank-Schema erstellen

1. Gehe zu **SQL Editor** im Supabase Dashboard
2. Klicke **"New query"**
3. Kopiere den **kompletten Inhalt** aus `supabase-schema.sql`
4. Füge ihn ein und klicke **"Run"** (oder Cmd/Ctrl + Enter)
5. ✅ Du solltest "Success" sehen

### Schritt 3: API Keys kopieren

1. Gehe zu **Settings** → **API**
2. Kopiere:
   - **Project URL** (z.B. `https://xxxxx.supabase.co`)
   - **anon public** Key

### Schritt 4: Environment Variables setzen

#### Lokal (.env Datei):
Erstelle eine `.env` Datei im Root-Verzeichnis:

```env
VITE_SUPABASE_URL=https://deine-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
```

#### In Vercel:
1. Gehe zu deinem Vercel Projekt
2. **Settings** → **Environment Variables**
3. Füge hinzu:
   - `VITE_SUPABASE_URL` = deine Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = dein anon Key
4. Wähle **Production**, **Preview** und **Development**
5. Klicke **Save**

### Schritt 5: Dependencies installieren

```bash
npm install
```

### Schritt 6: Testen (lokal)

```bash
npm run dev
```

Öffne `http://localhost:8080` und teste:
- Karriere-Seite bearbeiten
- Getränkekarte hochladen
- Flyer hochladen
- Veranstaltungen ändern

### Schritt 7: Vercel Deployment

#### Option A: GitHub Integration (empfohlen)

1. **Repository zu GitHub pushen**
2. Gehe zu [vercel.com](https://vercel.com)
3. Klicke **"Add New Project"**
4. Verbinde mit GitHub
5. Wähle dein Repository
6. **Framework Preset**: Vite
7. **Root Directory**: `.` (Root)
8. **Environment Variables**: Füge die Supabase-Variablen hinzu (siehe Schritt 4)
9. Klicke **Deploy**

#### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Folge den Anweisungen und füge die Environment Variables hinzu.

---

## 🎉 Nach dem ersten Deploy

**Das war's!** 🎉

- ✅ Website ist live
- ✅ Alle Änderungen werden automatisch aus Supabase geladen
- ✅ **Kein neuer Deploy nötig** für Content-Änderungen!

---

## 🔄 Wie funktioniert es?

### Content-Änderungen (kein Deploy nötig):
1. Kunde loggt sich ein (Passwort: **2673**)
2. Ändert Inhalte über die Website
3. Daten werden in Supabase gespeichert
4. **Sofort für alle Nutzer sichtbar** ✨

### Code-Änderungen (Deploy nötig):
- Nur wenn du den **Code** änderst → neuer Deploy
- Content-Änderungen → **kein Deploy nötig**

---

## 📝 Was wird in Supabase gespeichert?

- ✅ **Karriere-Inhalte** (alle Texte, Stellenangebote)
- ✅ **Getränkekarte** (bis zu 3 Bilder)
- ✅ **Flyer 1 & 2** (Bilder)
- ✅ **Veranstaltungen/Angebote** (Titel und Liste)

---

## 🔒 Sicherheit

- **Passwort-Schutz**: Alle Edit-Funktionen sind mit Passwort **2673** geschützt
- **RLS Policies**: Öffentliches Lesen erlaubt, Schreiben nur mit Passwort
- **Storage**: Bilder werden in Supabase Storage gespeichert

---

## ⚠️ Wichtige Hinweise

1. **Storage Bucket**: Der `images` Bucket muss öffentlich sein
2. **RLS Policies**: Müssen öffentliches Lesen erlauben
3. **Fallback**: Wenn Supabase nicht konfiguriert ist, verwendet die App `localStorage` (nur für Entwicklung!)

---

## 🐛 Troubleshooting

**Fehler "Missing Supabase environment variables"?**
→ Prüfe Environment Variables in Vercel

**Bilder werden nicht angezeigt?**
→ Prüfe Storage Bucket Policies in Supabase

**Änderungen werden nicht gespeichert?**
→ Prüfe RLS Policies (müssen öffentliches Lesen erlauben)

**Website zeigt alte Daten?**
→ Browser-Cache leeren oder Hard Refresh (Cmd/Ctrl + Shift + R)

---

## 📞 Support

Bei Problemen:
1. Prüfe die Browser-Konsole (F12)
2. Prüfe Supabase Logs: **Logs** → **Postgres Logs**
3. Prüfe Vercel Logs: **Deployments** → **Logs**

