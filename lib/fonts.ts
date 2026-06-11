import {
  Cinzel,
  Cormorant_Garamond,
  Mallanna,
  Ponnala,
  Noto_Serif_Telugu,
} from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const mallanna = Mallanna({
  subsets: ["telugu"],
  weight: "400",
  variable: "--font-mallanna",
  display: "swap",
});

export const ponnala = Ponnala({
  subsets: ["telugu"],
  weight: "400",
  variable: "--font-ponnala",
  display: "swap",
});

export const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-telugu",
  display: "swap",
});