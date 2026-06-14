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
  id: number;
  title_en: string;
  title_te: string;
  description_en: string;
  description_te: string;
  significance_en: string;
  significance_te: string;
  image: string | null;
  event_date: string;
  event_time: string | null;
  is_featured: boolean;
  created_at: string;
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

export interface TempleInformation {
  temple_name_en: string;
  temple_name_te: string;
  history_en: string;
  history_te: string;
  address_en: string;
  address_te: string;
  phone_number: string;
  email: string;
  google_maps_link: string;
}

export interface AboutSlokaItem {
  id?: number;
  title_en?: string;
  title_te?: string;
  text_en?: string;
  text_te?: string;
  meaning_en?: string;
  meaning_te?: string;
  display_order?: number;
  [key: string]: string | number | boolean | null | undefined;
}

export interface AboutData {
  temple_information: TempleInformation;
  slokas: AboutSlokaItem[];
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