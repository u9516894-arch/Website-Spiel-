import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Edit2, Save, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getCareerContent, saveCareerContent, CareerContent } from "@/lib/supabase-api";
import oktayPhoto from "@/assets/oktay-kahyalar.jpg";

const ADMIN_PASSWORD = "2673";


const defaultContent: CareerContent = {
  title: "Karriere",
  subtitle: "Werde Teil unseres Teams",
  section1Title: "Arbeiten Sie mit uns",
  section1Text: "Wir sind immer auf der Suche nach motivierten und engagierten Mitarbeitern, die unser Team verstärken möchten. Bei uns erwarten Sie spannende Aufgaben in einem dynamischen Umfeld.",
  section1BenefitsTitle: "Was wir bieten:",
  benefits: [
    "Ein freundliches und motiviertes Team",
    "Flexible Arbeitszeiten",
    "Attraktive Vergütung",
    "Entwicklungsmöglichkeiten",
    "Ein modernes Arbeitsumfeld"
  ],
  section2Title: "Offene Stellen",
  section2Text: "Aktuell suchen wir für unsere Standorte in verschiedenen Bereichen nach Verstärkung. Haben Sie Interesse? Dann freuen wir uns auf Ihre Bewerbung!",
  jobs: [
    { title: "Servicekraft (m/w/d)", description: "Teilzeit/Vollzeit • Spielothek Spieltreff & Basement Bar" },
    { title: "Techniker/in (m/w/d)", description: "Vollzeit • O.K Automaten" }
  ],
  section3Title: "Kontakt",
  section3Text: "Senden Sie Ihre Bewerbungsunterlagen gerne per E-Mail oder rufen Sie uns an:",
  email: "jobs@spielothek-entertainment.de",
  phone: "+49 176 73520302"
};

const Karriere = () => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [content, setContent] = useState<CareerContent>(defaultContent);

  // Lade gespeicherte Inhalte beim Start
  useEffect(() => {
    const loadContent = async () => {
      try {
        const saved = await getCareerContent();
        if (saved) {
          setContent(saved);
        }
      } catch (e) {
        console.error("Fehler beim Laden der gespeicherten Inhalte", e);
      }
    };
    loadContent();
  }, []);

  // Speichere Inhalte bei Änderungen
  const saveContent = async () => {
    try {
      await saveCareerContent(content);
      setIsEditMode(false);
      toast({
        title: "Erfolg",
        description: "Änderungen wurden gespeichert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowPasswordDialog(false);
      setPasswordInput("");
      toast({
        title: "Erfolg",
        description: "Edit-Modus aktiviert.",
      });
    } else {
      toast({
        title: "Fehler",
        description: "Falsches Passwort.",
        variant: "destructive",
      });
      setPasswordInput("");
    }
  };

  const handleSubtitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPasswordDialog(true);
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = value;
    setContent({ ...content, benefits: newBenefits });
  };

  const addBenefit = () => {
    setContent({
      ...content,
      benefits: [...content.benefits, ""]
    });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = content.benefits.filter((_, i) => i !== index);
    setContent({ ...content, benefits: newBenefits });
  };

  const updateJob = (index: number, field: "title" | "description", value: string) => {
    const newJobs = [...content.jobs];
    newJobs[index] = { ...newJobs[index], [field]: value };
    setContent({ ...content, jobs: newJobs });
  };

  const addJob = () => {
    setContent({
      ...content,
      jobs: [...content.jobs, { title: "", description: "" }]
    });
  };

  const removeJob = (index: number) => {
    const newJobs = content.jobs.filter((_, i) => i !== index);
    setContent({ ...content, jobs: newJobs });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border py-8 px-4 shadow-[var(--shadow-glow)]">
        <div className="container mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isEditMode ? (
                <Input
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="text-4xl md:text-5xl font-bold text-center bg-transparent border-none focus-visible:ring-0 p-0"
                />
              ) : (
                <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {content.title}
                </h1>
              )}
              <div className="relative text-center mt-2">
                {isEditMode ? (
                  <Input
                    value={content.subtitle}
                    onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                    className="text-center bg-transparent border-none focus-visible:ring-0 p-0 text-muted-foreground"
                  />
                ) : (
                  <p
                    className="text-center text-muted-foreground cursor-pointer inline-block select-none"
                    onClick={handleSubtitleClick}
                    title="Klicken zum Bearbeiten"
                  >
                    {content.subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 ml-8">
              <Avatar className="h-20 w-20 border-2 border-accent">
                <AvatarImage src={oktayPhoto} alt="Oktay Kahyalar" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">OK</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Geschäftsführer:</p>
                <p className="text-sm font-semibold">Oktay Kahyalar</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1: Arbeiten Sie mit uns */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-lg">
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label>Titel</Label>
                  <Input
                    value={content.section1Title}
                    onChange={(e) => setContent({ ...content, section1Title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Text</Label>
                  <Textarea
                    value={content.section1Text}
                    onChange={(e) => setContent({ ...content, section1Text: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Überschrift "Was wir bieten"</Label>
                  <Input
                    value={content.section1BenefitsTitle}
                    onChange={(e) => setContent({ ...content, section1BenefitsTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Vorteile</Label>
                  <div className="space-y-2">
                    {content.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          placeholder={`Vorteil ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBenefit(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addBenefit} className="w-full">
                      + Vorteil hinzufügen
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{content.section1Title}</h2>
                <p className="text-muted-foreground mb-6">{content.section1Text}</p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{content.section1BenefitsTitle}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {content.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Section 2: Offene Stellen */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-lg">
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label>Titel</Label>
                  <Input
                    value={content.section2Title}
                    onChange={(e) => setContent({ ...content, section2Title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Text</Label>
                  <Textarea
                    value={content.section2Text}
                    onChange={(e) => setContent({ ...content, section2Text: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Stellenangebote</Label>
                  <div className="space-y-4">
                    {content.jobs.map((job, index) => (
                      <div key={index} className="bg-secondary p-4 rounded-lg space-y-2">
                        <Input
                          value={job.title}
                          onChange={(e) => updateJob(index, "title", e.target.value)}
                          placeholder="Stellenbezeichnung"
                        />
                        <Input
                          value={job.description}
                          onChange={(e) => updateJob(index, "description", e.target.value)}
                          placeholder="Beschreibung"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeJob(index)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Entfernen
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addJob} className="w-full">
                      + Stelle hinzufügen
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{content.section2Title}</h2>
                <p className="text-muted-foreground mb-6">{content.section2Text}</p>
                <div className="space-y-4">
                  {content.jobs.map((job, index) => (
                    <div key={index} className="bg-secondary p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Section 3: Kontakt */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-lg">
            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <Label>Titel</Label>
                  <Input
                    value={content.section3Title}
                    onChange={(e) => setContent({ ...content, section3Title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Text</Label>
                  <Textarea
                    value={content.section3Text}
                    onChange={(e) => setContent({ ...content, section3Text: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>E-Mail</Label>
                  <Input
                    type="email"
                    value={content.email}
                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Telefon</Label>
                  <Input
                    type="tel"
                    value={content.phone}
                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{content.section3Title}</h2>
                <p className="text-muted-foreground mb-6">{content.section3Text}</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <a href={`mailto:${content.email}`} className="text-primary hover:underline">
                      {content.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                      {content.phone}
                    </a>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Edit Mode Controls */}
          {isEditMode && (
            <div className="fixed bottom-8 right-8 flex gap-2">
              <Button onClick={saveContent} size="lg">
                <Save className="mr-2 h-4 w-4" />
                Speichern
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  setIsEditMode(false);
                  // Lade gespeicherte Inhalte neu
                  try {
                    const saved = await getCareerContent();
                    if (saved) {
                      setContent(saved);
                    }
                  } catch (e) {
                    console.error("Fehler beim Laden", e);
                  }
                }}
                size="lg"
              >
                <X className="mr-2 h-4 w-4" />
                Abbrechen
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>Impressum</span>
            <span>|</span>
            <span>Datenschutz</span>
          </div>
        </div>
      </footer>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort eingeben</DialogTitle>
            <DialogDescription>
              Bitte geben Sie das Passwort ein, um die Seite zu bearbeiten.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Passwort"
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={handlePasswordSubmit}>Bestätigen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Karriere;
