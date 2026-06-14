import type {
  ServiceItem,
  EventItem,
  AnnouncementItem,
  AboutData,
  GalleryItem,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

function resolveMediaUrl(image: string | null): string | null {
  if (!image) return null;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${API_ORIGIN}${image}`;
  }

  return image;
}

export interface HeroSlide {
  id: number;
  title_en: string;
  title_te: string;
  subtitle_en: string;
  subtitle_te: string;
  image: string;
  display_order: number;
}

export interface HomeApiResponse {
  hero_slides: HeroSlide[];
  [key: string]: unknown;
}

export async function fetchHeroData(): Promise<HomeApiResponse> {
  const res = await fetch(`${API_BASE}/home/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/sevas/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data: ServiceItem[] = await res.json();

  return data.sort((a, b) => a.display_order - b.display_order);
}

export async function fetchEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/events/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data: EventItem[] = await res.json();

  return data
    .map((event) => ({
      ...event,
      image: resolveMediaUrl(event.image),
    }))
    .sort((a, b) => {
      const featuredSort = Number(b.is_featured) - Number(a.is_featured);

      if (featuredSort !== 0) {
        return featuredSort;
      }

      const aDateTime = `${a.event_date}T${a.event_time ?? "00:00:00"}`;
      const bDateTime = `${b.event_date}T${b.event_time ?? "00:00:00"}`;

      return new Date(aDateTime).getTime() - new Date(bDateTime).getTime();
    });
}

export async function fetchAnnouncements(): Promise<AnnouncementItem[]> {
  const res = await fetch(`${API_BASE}/news/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data: AnnouncementItem[] = await res.json();

  const today = new Date().toISOString().slice(0, 10);

  return data
    .filter((item) => !item.expiry_date || item.expiry_date >= today)
    .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned));
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const res = await fetch(`${API_BASE}/gallery/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data: GalleryItem[] = await res.json();

  return data
    .sort((a, b) => a.display_order - b.display_order)
    .map((gallery) => ({
      ...gallery,
      images: [...gallery.images].sort(
        (a, b) => a.display_order - b.display_order
      ),
    }));
}

export async function fetchAboutData(): Promise<AboutData> {
  const res = await fetch(`${API_BASE}/about/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data: AboutData = await res.json();

  return {
    ...data,
    slokas: [...(data.slokas ?? [])].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    ),
  };
}