import { AnnouncementBanner } from "@/components/AnnouncementBanner/AnnouncementBanner";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { HomeServices } from "./HomeServices";
import { Gallery } from "@/components/Gallery/Gallery";
import { HomeEvents } from "./HomeEvents";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBanner />
      <HomeServices />
      <Gallery />
      <HomeEvents />
    </>
  );
}