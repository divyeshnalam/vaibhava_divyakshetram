import type { Metadata, Viewport } from "next";
import {
  cinzel,
  cormorant,
  mallanna,
  ponnala,
  notoSerifTelugu,
} from "@/lib/fonts";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam",
    template: "%s | Venkateswara Swamy Temple",
  },
  description:
    "Official website of Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam — a sacred temple dedicated to Lord Venkateswara.",
  keywords: [
    "Venkateswara",
    "Temple",
    "Devasthanam",
    "Hindu Temple",
    "Tirupati",
    "Seva",
    "Darshan",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vaibhava Venkateswara Swamy Devasthanam",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B0000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="te"
      suppressHydrationWarning
      className={`
        ${cinzel.variable}
        ${cormorant.variable}
        ${mallanna.variable}
        ${ponnala.variable}
        ${notoSerifTelugu.variable}
      `}
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LanguageProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}