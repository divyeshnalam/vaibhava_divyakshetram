import type {
  HeroData,
  ServiceItem,
  EventItem,
  AnnouncementItem,
  AboutData,
  DonationTier,
  ContactInfo,
  GalleryItem,
} from "@/types";

// Simulated API responses — replace with real fetch() calls to your backend
// lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

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
  // other fields (slokas, featured_events, pinned_news) are used by other sections
  [key: string]: unknown;
}

export async function fetchHeroData(): Promise<HomeApiResponse> {
  const res = await fetch(`${API_BASE}/home/`, {
    next: { revalidate: 60 }, // ISR-friendly if you move to server components later
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/sevas/`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
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

export async function fetchEvents(): Promise<EventItem[]> {
  return [
    {
      id: "1",
      title: { en: "Brahmotsavam", te: "బ్రహ్మోత్సవం" },
      date: { en: "July 15 – 22, 2026", te: "జూలై 15–22, 2026" },
      description: {
        en: "The grandest annual festival spanning nine days with processions, divine music, and elaborate sevas.",
        te: "తొమ్మిది రోజుల గొప్ప వార్షిక ఉత్సవం — ఊరేగింపులు, సంగీతం మరియు విస్తారమైన సేవలతో.",
      },
      tag: { en: "Annual Festival", te: "వార్షిక ఉత్సవం" },
    },
    {
      id: "2",
      title: { en: "Vaikunta Ekadashi", te: "వైకుంఠ ఏకాదశి" },
      date: { en: "January 10, 2026", te: "జనవరి 10, 2026" },
      description: {
        en: "The most sacred Ekadashi; devotees observe fast and participate in special midnight darshan.",
        te: "అత్యంత పవిత్రమైన ఏకాదశి; భక్తులు ఉపవాసం ఉండి అర్ధరాత్రి దర్శనంలో పాల్గొంటారు.",
      },
      tag: { en: "Sacred Day", te: "పవిత్ర దినం" },
    },
    {
      id: "3",
      title: { en: "Ugadi Celebrations", te: "ఉగాది వేడుకలు" },
      date: { en: "March 30, 2026", te: "మార్చి 30, 2026" },
      description: {
        en: "Telugu New Year celebrated with panchangam reading, special pujas, and prasadam distribution.",
        te: "పంచాంగ పఠనం, ప్రత్యేక పూజలు మరియు ప్రసాదం పంపిణీతో తెలుగు నూతన సంవత్సరం.",
      },
      tag: { en: "New Year", te: "నూతన సంవత్సరం" },
    },
    {
      id: "4",
      title: { en: "Sri Rama Navami", te: "శ్రీ రామ నవమి" },
      date: { en: "April 6, 2026", te: "ఏప్రిల్ 6, 2026" },
      description: {
        en: "Birthday of Lord Rama observed with Ramayana parayanam, bhajans, and Kalyanotsavam.",
        te: "రామాయణ పారాయణం, భజనలు మరియు కళ్యాణోత్సవంతో శ్రీరాముని జన్మదినం.",
      },
      tag: { en: "Divine Birthday", te: "దైవ జన్మదినం" },
    },
  ];
}

export async function fetchAboutData(): Promise<AboutData> {
  return {
    heading: {
      en: "About Our Temple",
      te: "మా దేవాలయం గురించి",
    },
    body: [
      {
        en: "Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam is a divine sanctuary consecrated to Lord Venkateswara — the presiding deity of the Kali Yuga, known as the giver of all boons.",
        te: "శ్రీ శ్రీ శ్రీ వైభవ వేంకటేశ్వర స్వామి దేవస్థానం కలియుగ ప్రభువు అయిన శ్రీ వేంకటేశ్వర స్వామికి అంకితమైన పవిత్ర ఆలయం.",
      },
      {
        en: "Built in the traditional Agama Shastra style, the temple follows the sacred Vaikhanasa Agama rituals, preserving centuries of devotional tradition.",
        te: "సాంప్రదాయ ఆగమ శాస్త్ర నిర్మాణ శైలిలో నిర్మించబడిన ఈ ఆలయం వైఖానస ఆగమ రీతిలో పూజలు నిర్వహిస్తుంది.",
      },
      {
        en: "The temple serves thousands of devotees daily, offering a space for prayer, reflection, and community. Our trained priests perform each seva with utmost devotion and adherence to Vedic tradition.",
        te: "ఈ దేవాలయం రోజూ వేల మంది భక్తులకు సేవలందిస్తోంది. మా అర్చకులు ప్రతి సేవను వేద సంప్రదాయం ప్రకారం అత్యంత భక్తిభావంతో నిర్వహిస్తారు.",
      },
    ],
    history: {
      en: "Founded in 1987 by a group of devoted families, the temple has grown from a small prayer hall into a full-fledged religious complex serving the spiritual needs of the community.",
      te: "1987లో భక్తిపరమైన కుటుంబాల సమూహంచే స్థాపించబడిన ఈ ఆలయం చిన్న ప్రార్థనా మందిరం నుండి పూర్తి స్థాయి మత సముదాయంగా అభివృద్ధి చెందింది.",
    },
  };
}

export async function fetchDonationTiers(): Promise<DonationTier[]> {
  return [
    {
      id: "1",
      name: { en: "Annadanam", te: "అన్నదానం" },
      amount: 501,
      description: {
        en: "Sponsor a day's free meal for visiting devotees and the underprivileged",
        te: "భక్తులకు మరియు నిరుపేదలకు ఒక రోజు ఉచిత భోజనం",
      },
    },
    {
      id: "2",
      name: { en: "Nitya Archana", te: "నిత్య అర్చన" },
      amount: 1116,
      description: {
        en: "Fund daily flower offerings and archana for an entire month",
        te: "ఒక మాసం పాటు నిత్య పుష్ప అర్చనకు నిధి",
      },
    },
    {
      id: "3",
      name: { en: "Utsava Sponsor", te: "ఉత్సవ స్పాన్సర్" },
      amount: 5001,
      description: {
        en: "Become the primary sponsor of a festival day and receive special blessings",
        te: "ఒక పండుగ రోజుకు ముఖ్య స్పాన్సర్ అయి విశేష ఆశీర్వాదాలు పొందండి",
      },
    },
    {
      id: "4",
      name: { en: "Temple Development", te: "దేవాలయ అభివృద్ధి" },
      amount: 10001,
      description: {
        en: "Contribute to the temple's ongoing construction and maintenance",
        te: "దేవాలయ నిర్మాణం మరియు నిర్వహణకు సహకరించండి",
      },
    },
  ];
}

export async function fetchContactInfo(): Promise<ContactInfo> {
  return {
    address: {
      en: "123 Temple Road, Devotee Nagar, Hyderabad — 500001, Telangana",
      te: "123 ఆలయ రోడ్డు, భక్త నగర్, హైదరాబాద్ — 500001, తెలంగాణ",
    },
    phone: "+91 40 2345 6789",
    email: "info@vaibhavavenkateswara.org",
    hours: {
      en: "Mon–Sun: 6:00 AM – 12:00 PM & 4:00 PM – 8:30 PM",
      te: "సోమ–ఆది: ఉ. 6:00 – మ. 12:00 & సా. 4:00 – రా. 8:30",
    },
  };
}