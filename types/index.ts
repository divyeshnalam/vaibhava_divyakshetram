export type Language = "en" | "te";

export interface TranslatedText {
  en: string;
  te: string;
}

export interface NavItem {
  label: TranslatedText;
  href: string;
}

export interface HeroData {
  templeTitle: TranslatedText;
  tagline: TranslatedText;
  ctaPrimary: TranslatedText;
  ctaSecondary: TranslatedText;
}

// Matches the actual API response from /api/sevas/
export interface ServiceItem {
  id: number;
  name_en: string;
  name_te: string;
  description_en: string;
  description_te: string;
  image: string | null;
  display_order: number;
}

export interface EventItem {
  id: string;
  title: TranslatedText;
  date: TranslatedText;
  description: TranslatedText;
  tag: TranslatedText;
}

export interface AnnouncementItem {
  id: number;
  title_en: string;
  title_te: string;
  content_en: string;
  content_te: string;
  publish_date: string;
  expiry_date: string | null;
  is_pinned: boolean;
}

export interface AboutData {
  heading: TranslatedText;
  body: TranslatedText[];
  history: TranslatedText;
}

export interface DonationTier {
  id: string;
  name: TranslatedText;
  amount: number;
  description: TranslatedText;
}

export interface ContactInfo {
  address: TranslatedText;
  phone: string;
  email: string;
  hours: TranslatedText;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface GalleryImageItem {
  id: number;
  image: string;
  caption_en: string;
  caption_te: string;
  display_order: number;
}

export interface GalleryItem {
  id: number;
  name_en: string;
  name_te: string;
  display_order: number;
  images: GalleryImageItem[];
}