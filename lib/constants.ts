import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: { en: "Home", te: "హోమ్" }, href: "/" },
  { label: { en: "About", te: "మా గురించి" }, href: "/about" },
  { label: { en: "Services", te: "సేవలు" }, href: "/services" },
  { label: { en: "Events", te: "ఉత్సవాలు" }, href: "/events" },
  { label: { en: "Donations", te: "విరాళాలు" }, href: "/donations" },
  { label: { en: "Contact", te: "సంప్రదించండి" }, href: "/contact" },
];

export const TEMPLE_NAME = {
  en: "Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam",
  te: "శ్రీ శ్రీ శ్రీ వైభవ వేంకటేశ్వర స్వామి దేవస్థానం",
};

export const TEMPLE_NAME_SHORT = {
  en: "Venkateswara Swamy Temple",
  te: "వేంకటేశ్వర స్వామి దేవస్థానం",
};