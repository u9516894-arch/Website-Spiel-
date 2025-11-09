import { Link } from "react-router-dom";

const Impressum = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Impressum</h1>
          
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 space-y-6 text-sm md:text-base">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Basement Bar & Spielothek Spieltreff</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Inhaber & Geschäftsführer:</p>
                <p>Oktay Kahyalar</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Adresse:</p>
                <p>Kressenstein 18</p>
                <p>95326 Kulmbach</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Telefon:</p>
                <p>+49 176 73520302</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Öffnungszeiten:</p>
                <p>14:00 - 02:00 Uhr</p>
                <p>Außer an stillen Feiertagen</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Zuständige Aufsichtsbehörde:</p>
                <p>Landratsamt Kulmbach</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
                <p>Oktay Kahyalar</p>
                <p>Kressenstein 18</p>
                <p>95326 Kulmbach</p>
              </div>
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

export default Impressum;

