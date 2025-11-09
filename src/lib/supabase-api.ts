import { supabase, uploadImageToSupabase } from './supabase';

// ============================================
// KARRIERE CONTENT API
// ============================================

export interface CareerContent {
  title: string;
  subtitle: string;
  section1Title: string;
  section1Text: string;
  section1BenefitsTitle: string;
  benefits: string[];
  section2Title: string;
  section2Text: string;
  jobs: Array<{ title: string; description: string }>;
  section3Title: string;
  section3Text: string;
  email: string;
  phone: string;
}

export const getCareerContent = async (): Promise<CareerContent | null> => {
  if (!supabase) {
    // Fallback to localStorage
    const saved = localStorage.getItem('karriere_content');
    return saved ? JSON.parse(saved) : null;
  }

  const { data, error } = await supabase
    .from('career_content')
    .select('value')
    .eq('key', 'main')
    .single();

  if (error || !data) return null;
  return data.value as CareerContent;
};

export const saveCareerContent = async (content: CareerContent): Promise<void> => {
  if (!supabase) {
    // Fallback to localStorage
    localStorage.setItem('karriere_content', JSON.stringify(content));
    return;
  }

  const { error } = await supabase
    .from('career_content')
    .upsert({
      key: 'main',
      value: content,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'key'
    });

  if (error) throw error;
};

// ============================================
// DRINKS MENU API
// ============================================

export const getDrinksMenu = async (): Promise<string[]> => {
  if (!supabase) {
    const saved = localStorage.getItem('basement_bar_drinks_menu');
    if (saved) {
      const data = JSON.parse(saved);
      return data.images || [];
    }
    return [];
  }

  const { data, error } = await supabase
    .from('drinks_menu')
    .select('images')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return [];
  return data.images || [];
};

export const saveDrinksMenu = async (images: string[]): Promise<void> => {
  if (!supabase) {
    localStorage.setItem('basement_bar_drinks_menu', JSON.stringify({ images }));
    return;
  }

  // Check if record exists
  const { data: existing } = await supabase
    .from('drinks_menu')
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('drinks_menu')
      .update({ images, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('drinks_menu')
      .insert({ images });
    if (error) throw error;
  }
};

// ============================================
// FLYERS API
// ============================================

export const getFlyer = async (flyerNumber: 1 | 2): Promise<string | null> => {
  if (!supabase) {
    const key = flyerNumber === 1 ? 'basement_bar_flyer1' : 'basement_bar_flyer2';
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      return data.image || null;
    }
    return null;
  }

  const { data, error } = await supabase
    .from('flyers')
    .select('image_url')
    .eq('flyer_number', flyerNumber)
    .single();

  if (error || !data) return null;
  return data.image_url || null;
};

export const saveFlyer = async (flyerNumber: 1 | 2, imageUrl: string): Promise<void> => {
  if (!supabase) {
    const key = flyerNumber === 1 ? 'basement_bar_flyer1' : 'basement_bar_flyer2';
    localStorage.setItem(key, JSON.stringify({ image: imageUrl }));
    return;
  }

  const { error } = await supabase
    .from('flyers')
    .upsert({
      flyer_number: flyerNumber,
      image_url: imageUrl,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'flyer_number'
    });

  if (error) throw error;
};

// ============================================
// EVENTS API
// ============================================

export interface EventsData {
  title: string;
  items: string[];
}

export const getEvents = async (): Promise<EventsData | null> => {
  if (!supabase) {
    const saved = localStorage.getItem('basement_bar_events');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  }

  const { data, error } = await supabase
    .from('events')
    .select('title, items')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return { title: data.title, items: data.items || [] };
};

export const saveEvents = async (events: EventsData): Promise<void> => {
  if (!supabase) {
    localStorage.setItem('basement_bar_events', JSON.stringify(events));
    return;
  }

  // Check if record exists
  const { data: existing } = await supabase
    .from('events')
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('events')
      .update({
        title: events.title,
        items: events.items,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('events')
      .insert({
        title: events.title,
        items: events.items
      });
    if (error) throw error;
  }
};

// ============================================
// IMAGE UPLOAD (with Supabase Storage)
// ============================================

export const uploadImage = async (file: File, category: 'drinks' | 'flyers' | 'other'): Promise<string> => {
  // Try Supabase Storage first
  if (supabase) {
    try {
      return await uploadImageToSupabase(file, category);
    } catch (error) {
      console.error('Supabase upload failed, falling back to base64:', error);
    }
  }

  // Fallback: Convert to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

