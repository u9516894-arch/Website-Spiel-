import { Link } from "react-router-dom";

const Datenschutz = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 md:py-8 px-4 shadow-[var(--shadow-glow)]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-3">
            <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors">
              ← Zurück zur Startseite
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Datenschutzerklärung</h1>
          
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 space-y-6 text-sm md:text-base">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">1. Verantwortliche Stelle</h2>
              <p className="mb-2">Verantwortlich für die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
              <div className="ml-4 space-y-1">
                <p>Oktay Kahyalar</p>
                <p>Basement Bar & Spielothek Spieltreff</p>
                <p>Kressenstein 18</p>
                <p>95326 Kulmbach</p>
                <p>Telefon: +49 176 73520302</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="mb-2">Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist, um unseren Betrieb ordnungsgemäß zu führen, Anfragen zu bearbeiten oder gesetzliche Pflichten zu erfüllen.</p>
              <p className="mb-2">Zu den verarbeiteten Daten können gehören:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Name und Telefonnummer (z. B. bei Reservierungen oder Rückfragen)</li>
                <li>ggf. Videoaufzeichnungen im Eingangs- oder Spielbereich (zur Wahrung des Hausrechts und der Sicherheit)</li>
                <li>Daten, die im Rahmen gesetzlicher Aufbewahrungspflichten (z. B. Buchhaltung) anfallen</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">3. Zweck der Datenverarbeitung</h2>
              <p className="mb-2">Die Verarbeitung erfolgt zu folgenden Zwecken:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Kommunikation mit Gästen und Lieferanten</li>
                <li>Organisation des Geschäftsbetriebs</li>
                <li>Sicherheit und Schutz des Eigentums (Videoüberwachung, sofern vorhanden)</li>
                <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">4. Rechtsgrundlagen der Verarbeitung</h2>
              <p className="mb-2">Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage von:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen)</li>
                <li>Art. 6 Abs. 1 lit. c DSGVO (Erfüllung gesetzlicher Pflichten)</li>
                <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, z. B. Sicherheit oder Kommunikation)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">5. Weitergabe von Daten</h2>
              <p>Eine Weitergabe personenbezogener Daten an Dritte erfolgt ausschließlich, wenn sie zur Vertragserfüllung, aufgrund gesetzlicher Pflichten oder berechtigter Interessen erforderlich ist.</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">6. Dauer der Speicherung</h2>
              <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">7. Rechte der betroffenen Personen</h2>
              <p className="mb-2">Betroffene Personen haben das Recht:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Auskunft über gespeicherte Daten zu verlangen (Art. 15 DSGVO),</li>
                <li>unrichtige Daten berichtigen zu lassen (Art. 16 DSGVO),</li>
                <li>Daten löschen zu lassen (Art. 17 DSGVO),</li>
                <li>die Verarbeitung einzuschränken (Art. 18 DSGVO),</li>
                <li>der Verarbeitung zu widersprechen (Art. 21 DSGVO),</li>
                <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO),</li>
                <li>sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).</li>
              </ul>
              <div className="mt-4">
                <p className="font-semibold mb-2">Zuständige Aufsichtsbehörde:</p>
                <div className="ml-4 space-y-1">
                  <p>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</p>
                  <p>Promenade 18</p>
                  <p>91522 Ansbach</p>
                  <p>Web: <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.lda.bayern.de</a></p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">8. Datensicherheit</h2>
              <p>Es werden geeignete technische und organisatorische Maßnahmen getroffen, um personenbezogene Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen.</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
              <p>Diese Datenschutzerklärung wird regelmäßig überprüft und bei Bedarf angepasst, um aktuellen rechtlichen Anforderungen zu entsprechen.</p>
              <p className="mt-2 text-muted-foreground">Stand: November 2025</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
            <span>|</span>
            <Link to="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Datenschutz;

