import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  getDrinksMenu, 
  saveDrinksMenu, 
  getFlyer, 
  saveFlyer, 
  getEvents, 
  saveEvents,
  uploadImage,
  EventsData
} from "@/lib/supabase-api";
import { MapPin, Clock, Phone, Save, X, Plus } from "lucide-react";

import heroImage from "@/assets/hero-spielothek.png";
import spielothek1 from "@/assets/spielothek-new-1.png";
import spielothek2 from "@/assets/spielothek-new-2.png";
import spielothek3 from "@/assets/spielothek-new-3.png";
import drinksMenu from "@/assets/drinks-menu.jpg";
import drinksMenuFrontDefault from "@/assets/drinks-menu-front-new.jpg";
import drinksMenuBackDefault from "@/assets/drinks-menu-back.jpg";
import bar1 from "@/assets/bar-new-1.png";
import bar2 from "@/assets/bar-new-2.png";
import bar3 from "@/assets/bar-new-3.png";
import bar4 from "@/assets/bar-new-4.png";
import automaten1 from "@/assets/automaten-new-1.png";
import automaten2 from "@/assets/automaten-new-2.png";
import automaten3 from "@/assets/automaten-new-3.png";
import automaten4 from "@/assets/automaten-new-4.png";
import oktayPhoto from "@/assets/oktay-kahyalar.jpg";
import basementBarLogo from "@/assets/basement-bar-logo.png";

const ADMIN_PASSWORD = "2673";
const MAX_IMAGES = 3;

const Index = () => {
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showFlyerPasswordDialog, setShowFlyerPasswordDialog] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<"flyer1" | "flyer2" | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFlyerEditMode, setIsFlyerEditMode] = useState(false);
  const [savedImages, setSavedImages] = useState<string[]>([drinksMenuFrontDefault, drinksMenuBackDefault]);
  const [tempImages, setTempImages] = useState<string[]>([drinksMenuFrontDefault, drinksMenuBackDefault]);
  const [savedFlyer1, setSavedFlyer1] = useState<string>("");
  const [tempFlyer1, setTempFlyer1] = useState<string>("");
  const [savedFlyer2, setSavedFlyer2] = useState<string>("");
  const [tempFlyer2, setTempFlyer2] = useState<string>("");
  const [showEventsPasswordDialog, setShowEventsPasswordDialog] = useState(false);
  const [isEventsEditMode, setIsEventsEditMode] = useState(false);
  const [savedEvents, setSavedEvents] = useState<EventsData>({
    title: "Veranstaltungen/Angebote",
    items: ["Happy Hour täglich", "Live-Musik am Wochenende"]
  });
  const [tempEvents, setTempEvents] = useState<EventsData>({
    title: "Veranstaltungen/Angebote",
    items: ["Happy Hour täglich", "Live-Musik am Wochenende"]
  });

  // Lade gespeicherte Daten beim Start
  useEffect(() => {
    const loadData = async () => {
      try {
        // Lade Getränkekarte
        const drinks = await getDrinksMenu();
        if (drinks.length > 0) {
          setSavedImages(drinks);
          setTempImages(drinks);
        }

        // Lade Flyer
        const flyer1 = await getFlyer(1);
        if (flyer1) {
          setSavedFlyer1(flyer1);
          setTempFlyer1(flyer1);
        }

        const flyer2 = await getFlyer(2);
        if (flyer2) {
          setSavedFlyer2(flyer2);
          setTempFlyer2(flyer2);
        }

        // Lade Veranstaltungen/Angebote
        const events = await getEvents();
        if (events) {
          setSavedEvents(events);
          setTempEvents(events);
        }
      } catch (e) {
        console.error("Fehler beim Laden der Daten", e);
      }
    };
    loadData();
  }, []);

  const handleGetränkekarteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPasswordDialog(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowPasswordDialog(false);
      setPasswordInput("");
      // Setze tempImages auf gespeicherte Bilder beim Start des Edit-Modus
      setTempImages([...savedImages]);
      toast({
        title: "Erfolg",
        description: "Sie können jetzt Bilder hochladen.",
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

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const imageUrl = await uploadImage(file, 'drinks');
      const newImages = [...tempImages];
      newImages[index] = imageUrl;
      setTempImages(newImages);
      
      toast({
        title: "Bild geladen",
        description: `Bild ${index + 1} wurde geladen (noch nicht gespeichert).`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Hochladen des Bildes.",
        variant: "destructive",
      });
    }
  };

  const addImageSlot = () => {
    if (tempImages.length < MAX_IMAGES) {
      setTempImages([...tempImages, ""]);
    } else {
      toast({
        title: "Hinweis",
        description: `Maximal ${MAX_IMAGES} Bilder erlaubt.`,
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = tempImages.filter((_, i) => i !== index);
    setTempImages(newImages);
    toast({
      title: "Bild entfernt",
      description: "Bild wurde entfernt (noch nicht gespeichert).",
    });
  };

  const handleSaveDrinksMenu = async () => {
    const imagesToSave = tempImages.filter(img => img !== "");
    try {
      await saveDrinksMenu(imagesToSave);
      setSavedImages(imagesToSave);
      setIsEditMode(false);
      toast({
        title: "Erfolg",
        description: imagesToSave.length > 0 
          ? "Getränkekarte wurde gespeichert." 
          : "Alle Bilder wurden entfernt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = async () => {
    // Zurück zu gespeicherten Bildern
    try {
      const saved = await getDrinksMenu();
      if (saved.length > 0) {
        setTempImages(saved);
        setSavedImages(saved);
      } else {
        setTempImages([...savedImages]);
      }
    } catch (e) {
      setTempImages([...savedImages]);
    }
    setIsEditMode(false);
    toast({
      title: "Abgebrochen",
      description: "Änderungen wurden verworfen.",
    });
  };

  // Flyer Funktionen
  const handleFlyerClick = (flyer: "flyer1" | "flyer2") => {
    setEditingFlyer(flyer);
    setShowFlyerPasswordDialog(true);
  };

  const handleFlyerPasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsFlyerEditMode(true);
      setShowFlyerPasswordDialog(false);
      setPasswordInput("");
      // Setze temp auf gespeicherte Werte
      if (editingFlyer === "flyer1") {
        setTempFlyer1(savedFlyer1);
      } else {
        setTempFlyer2(savedFlyer2);
      }
      toast({
        title: "Erfolg",
        description: "Sie können jetzt den Flyer ändern.",
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

  const handleFlyerUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file, 'flyers');
      if (editingFlyer === "flyer1") {
        setTempFlyer1(imageUrl);
      } else {
        setTempFlyer2(imageUrl);
      }
      toast({
        title: "Bild geladen",
        description: "Bild wurde geladen (noch nicht gespeichert).",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Hochladen des Bildes.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveFlyer = () => {
    if (editingFlyer === "flyer1") {
      setTempFlyer1("");
    } else {
      setTempFlyer2("");
    }
    toast({
      title: "Bild entfernt",
      description: "Bild wurde entfernt (noch nicht gespeichert).",
    });
  };

  const handleSaveFlyer = async () => {
    try {
      if (editingFlyer === "flyer1") {
        await saveFlyer(1, tempFlyer1 || "");
        setSavedFlyer1(tempFlyer1);
      } else {
        await saveFlyer(2, tempFlyer2 || "");
        setSavedFlyer2(tempFlyer2);
      }
      setIsFlyerEditMode(false);
      setEditingFlyer(null);
      toast({
        title: "Erfolg",
        description: tempFlyer1 || tempFlyer2 
          ? "Flyer wurde gespeichert." 
          : "Flyer wurde entfernt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern.",
        variant: "destructive",
      });
    }
  };

  const cancelFlyerEdit = async () => {
    try {
      if (editingFlyer === "flyer1") {
        const saved = await getFlyer(1);
        if (saved) {
          setTempFlyer1(saved);
          setSavedFlyer1(saved);
        } else {
          setTempFlyer1(savedFlyer1);
        }
      } else {
        const saved = await getFlyer(2);
        if (saved) {
          setTempFlyer2(saved);
          setSavedFlyer2(saved);
        } else {
          setTempFlyer2(savedFlyer2);
        }
      }
    } catch (e) {
      if (editingFlyer === "flyer1") {
        setTempFlyer1(savedFlyer1);
      } else {
        setTempFlyer2(savedFlyer2);
      }
    }
    setIsFlyerEditMode(false);
    setEditingFlyer(null);
    toast({
      title: "Abgebrochen",
      description: "Änderungen wurden verworfen.",
    });
  };

  // Veranstaltungen/Angebote Funktionen
  const handleEventsClick = () => {
    setShowEventsPasswordDialog(true);
  };

  const handleEventsPasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsEventsEditMode(true);
      setShowEventsPasswordDialog(false);
      setPasswordInput("");
      setTempEvents({ ...savedEvents });
      toast({
        title: "Erfolg",
        description: "Sie können jetzt die Veranstaltungen/Angebote ändern.",
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

  const updateEventItem = (index: number, value: string) => {
    const newItems = [...tempEvents.items];
    newItems[index] = value;
    setTempEvents({ ...tempEvents, items: newItems });
  };

  const addEventItem = () => {
    setTempEvents({
      ...tempEvents,
      items: [...tempEvents.items, ""]
    });
  };

  const removeEventItem = (index: number) => {
    if (tempEvents.items.length > 1) {
      const newItems = tempEvents.items.filter((_, i) => i !== index);
      setTempEvents({ ...tempEvents, items: newItems });
    }
  };

  const handleSaveEvents = async () => {
    const itemsToSave = tempEvents.items.filter(item => item.trim() !== "");
    if (itemsToSave.length === 0) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie mindestens ein Angebot ein.",
        variant: "destructive",
      });
      return;
    }
    
    const dataToSave: EventsData = {
      title: tempEvents.title,
      items: itemsToSave
    };
    
    try {
      await saveEvents(dataToSave);
      setSavedEvents(dataToSave);
      setIsEventsEditMode(false);
      toast({
        title: "Erfolg",
        description: "Veranstaltungen/Angebote wurden gespeichert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const cancelEventsEdit = async () => {
    try {
      const saved = await getEvents();
      if (saved) {
        setTempEvents(saved);
        setSavedEvents(saved);
      } else {
        setTempEvents({ ...savedEvents });
      }
    } catch (e) {
      setTempEvents({ ...savedEvents });
    }
    setIsEventsEditMode(false);
    toast({
      title: "Abgebrochen",
      description: "Änderungen wurden verworfen.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border py-8 px-4 shadow-[var(--shadow-glow)]">
        <div className="container mx-auto">
          <nav className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 border-2 border-accent rounded-full overflow-hidden bg-card flex items-center justify-center">
              <img src={basementBarLogo} alt="Basement Bar Logo" className="h-full w-full object-cover" />
            </div>
            <Link to="/karriere" className="text-foreground hover:text-primary font-medium transition-colors">
              Karriere
            </Link>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Spielothek, Entertainment & Gastronomie
              </h1>
              <p className="text-center text-muted-foreground mt-2">
                Ihre Anlaufstelle für Unterhaltung, Gastronomie & Drinks
              </p>
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

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Spielothek Spieltreff" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <Accordion type="single" collapsible className="w-full space-y-6">
          {/* Spielothek Spieltreff */}
          <AccordionItem value="spieltreff" className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-6 hover:bg-secondary transition-colors text-xl font-semibold">
              Spielothek Spieltreff
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                      <p className="text-sm text-muted-foreground">Täglich: 14:00 - 02:00 Uhr</p>
                      <p className="text-sm text-muted-foreground italic">Außer an stillen Feiertagen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Adresse</h3>
                      <p className="text-sm text-muted-foreground">Kressenstein 18</p>
                      <p className="text-sm text-muted-foreground">95326 Kulmbach</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Telefon</h3>
                      <p className="text-sm text-muted-foreground">+49 176 73520302</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <img src={spielothek1} alt="Spielothek Spieltreff Interior 1" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={spielothek2} alt="Spielothek Spieltreff Interior 2" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={spielothek3} alt="Spielothek Spieltreff Interior 3" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Basement Bar */}
          <AccordionItem value="basement" className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-6 hover:bg-secondary transition-colors text-xl font-semibold">
              Basement Bar
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                      <p className="text-sm text-muted-foreground">Täglich: 14:00 - 02:00 Uhr</p>
                      <p className="text-sm text-muted-foreground italic">Außer an stillen Feiertagen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Adresse</h3>
                      <p className="text-sm text-muted-foreground">Kressenstein 18</p>
                      <p className="text-sm text-muted-foreground">95326 Kulmbach</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Telefon</h3>
                      <p className="text-sm text-muted-foreground">+49 176 73520302</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <div 
                      className="w-5 h-5 text-accent mt-1 flex-shrink-0 cursor-pointer"
                      onClick={handleEventsClick}
                    >
                      🎉
                    </div>
                    <div className="flex-1">
                      {isEventsEditMode ? (
                        <div className="space-y-3">
                          <div>
                            <Label>Titel</Label>
                            <Input
                              value={tempEvents.title}
                              onChange={(e) => setTempEvents({ ...tempEvents, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Angebote</Label>
                            <div className="space-y-2">
                              {tempEvents.items.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                  <Input
                                    value={item}
                                    onChange={(e) => updateEventItem(index, e.target.value)}
                                    placeholder={`Angebot ${index + 1}`}
                                  />
                                  {tempEvents.items.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeEventItem(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button variant="outline" onClick={addEventItem} className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Angebot hinzufügen
                              </Button>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button onClick={handleSaveEvents} className="flex-1">
                              <Save className="mr-2 h-4 w-4" />
                              Speichern
                            </Button>
                            <Button variant="outline" onClick={cancelEventsEdit}>
                              <X className="mr-2 h-4 w-4" />
                              Abbrechen
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold mb-2">{savedEvents.title}</h3>
                          {savedEvents.items.map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground">{item}</p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-center">
                    {isFlyerEditMode && editingFlyer === "flyer1" ? (
                      <div className="w-full space-y-4">
                        {tempFlyer1 && (
                          <div className="relative">
                            <img 
                              src={tempFlyer1} 
                              alt="Flyer 1" 
                              className="w-full rounded-lg shadow-lg mb-2 max-h-96 object-contain"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={handleRemoveFlyer}
                              title="Bild entfernen"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFlyerUpload(file);
                          }}
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveFlyer} className="flex-1">
                            <Save className="mr-2 h-4 w-4" />
                            Speichern
                          </Button>
                          <Button variant="outline" onClick={cancelFlyerEdit}>
                            <X className="mr-2 h-4 w-4" />
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="bg-secondary/50 border-2 border-dashed border-border rounded-lg h-64 w-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleFlyerClick("flyer1")}
                      >
                        {savedFlyer1 ? (
                          <img 
                            src={savedFlyer1} 
                            alt="Flyer 1" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-3 text-lg cursor-pointer"
                      onClick={handleGetränkekarteClick}
                      title="Klicken zum Bearbeiten"
                    >
                      Getränkekarte
                    </h3>
                    {isEditMode ? (
                      <div className="space-y-4">
                        {tempImages.map((image, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Bild {index + 1}</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImage(index)}
                                title="Bild entfernen"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {image && (
                              <img 
                                src={image} 
                                alt={`Getränkekarte ${index + 1}`} 
                                className="w-full rounded-lg shadow-lg mb-2 max-h-96 object-contain"
                              />
                            )}
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(index, file);
                              }}
                            />
                          </div>
                        ))}
                        {tempImages.length < MAX_IMAGES && (
                          <Button
                            variant="outline"
                            onClick={addImageSlot}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Weitere Seite hinzufügen ({tempImages.length}/{MAX_IMAGES})
                          </Button>
                        )}
                        <div className="flex gap-2 pt-4">
                          <Button onClick={handleSaveDrinksMenu} className="flex-1">
                            <Save className="mr-2 h-4 w-4" />
                            Speichern
                          </Button>
                          <Button
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {savedImages.map((image, index) => (
                            <CarouselItem key={index}>
                              <img 
                                src={image} 
                                alt={`Basement Bar Getränkekarte ${index + 1}`} 
                                className="w-full rounded-lg shadow-lg" 
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {isFlyerEditMode && editingFlyer === "flyer2" ? (
                      <div className="w-full space-y-4">
                        {tempFlyer2 && (
                          <div className="relative">
                            <img 
                              src={tempFlyer2} 
                              alt="Flyer 2" 
                              className="w-full rounded-lg shadow-lg mb-2 max-h-96 object-contain"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={handleRemoveFlyer}
                              title="Bild entfernen"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFlyerUpload(file);
                          }}
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveFlyer} className="flex-1">
                            <Save className="mr-2 h-4 w-4" />
                            Speichern
                          </Button>
                          <Button variant="outline" onClick={cancelFlyerEdit}>
                            <X className="mr-2 h-4 w-4" />
                            Abbrechen
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="bg-secondary/50 border-2 border-dashed border-border rounded-lg h-64 w-full flex items-center justify-center cursor-pointer"
                        onClick={() => handleFlyerClick("flyer2")}
                      >
                        {savedFlyer2 ? (
                          <img 
                            src={savedFlyer2} 
                            alt="Flyer 2" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Galerie</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <img src={bar1} alt="Basement Bar Interior 1" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={bar2} alt="Basement Bar Interior 2" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={bar3} alt="Basement Bar Interior 3" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={bar4} alt="Basement Bar Interior 4" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* O.K Automaten */}
          <AccordionItem value="automaten" className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-6 hover:bg-secondary transition-colors text-xl font-semibold">
              O.K Automaten
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Adresse</h3>
                      <p className="text-sm text-muted-foreground">Kressenstein 18</p>
                      <p className="text-sm text-muted-foreground">95326 Kulmbach</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 rounded-lg">
                    <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Telefon</h3>
                      <p className="text-sm text-muted-foreground">+49 176 73520302</p>
                      <p className="text-sm text-muted-foreground">Mo-So: 09:00 - 22:00 Uhr</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Unser Service</h3>
                      <p className="text-foreground leading-relaxed">
                        Aufstellung von Geldspielautomaten und Unterhaltungsgeräten – zuverlässig, fair und individuell auf Ihre Bedürfnisse abgestimmt.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <img src={automaten1} alt="O.K Automaten Interior 1" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={automaten2} alt="O.K Automaten Interior 2" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={automaten3} alt="O.K Automaten Interior 3" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                  <img src={automaten4} alt="O.K Automaten Interior 4" className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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

      {/* Password Dialog für Getränkekarte */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort eingeben</DialogTitle>
            <DialogDescription>
              Bitte geben Sie das Passwort ein, um die Getränkekarte zu bearbeiten.
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

      {/* Password Dialog für Flyer */}
      <Dialog open={showFlyerPasswordDialog} onOpenChange={setShowFlyerPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort eingeben</DialogTitle>
            <DialogDescription>
              Bitte geben Sie das Passwort ein, um den Flyer zu bearbeiten.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Passwort"
              onKeyDown={(e) => e.key === "Enter" && handleFlyerPasswordSubmit()}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowFlyerPasswordDialog(false);
                setEditingFlyer(null);
              }}>
                Abbrechen
              </Button>
              <Button onClick={handleFlyerPasswordSubmit}>Bestätigen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Dialog für Veranstaltungen/Angebote */}
      <Dialog open={showEventsPasswordDialog} onOpenChange={setShowEventsPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort eingeben</DialogTitle>
            <DialogDescription>
              Bitte geben Sie das Passwort ein, um die Veranstaltungen/Angebote zu bearbeiten.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Passwort"
              onKeyDown={(e) => e.key === "Enter" && handleEventsPasswordSubmit()}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEventsPasswordDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleEventsPasswordSubmit}>Bestätigen</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
