"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchEvents } from "@/lib/api";
import { EventCard } from "@/components/EventCard/EventCard";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import type { EventItem } from "@/types";
import styles from "./page.module.css";

export function HomeEvents() {
  const { t, language } = useLanguageContext();
  const fetcher = useCallback(() => fetchEvents(), []);
  const { data, loading, error } = useApi<EventItem[]>(fetcher);

  const homeEvents = data?.slice(0, 2) ?? [];

  return (
    <section className={styles.section} aria-labelledby="events-heading">
      <div className="container">
        <DividerOrnament symbol="✦" />

        <div className={styles.sectionHeader}>
          <h2
            id="events-heading"
            className={styles.sectionTitle}
            lang={language}
          >
            {t({ en: "Festivals & Events", te: "ఉత్సవాలు" })}
          </h2>

          <p className={styles.sectionSubtitle} lang={language}>
            {t({
              en: "Celebrate upcoming temple festivals, special pujas, and divine events with us",
              te: "రాబోయే ఆలయ ఉత్సవాలు, ప్రత్యేక పూజలు మరియు దైవ కార్యక్రమాలలో మాతో పాల్గొనండి",
            })}
          </p>
        </div>

        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : error ? (
          <div className={styles.messageBox}>
            {t({
              en: "Unable to load events right now. Please try again later.",
              te: "ప్రస్తుతం ఉత్సవాలను లోడ్ చేయలేకపోతున్నాము. దయచేసి తర్వాత ప్రయత్నించండి.",
            })}
          </div>
        ) : homeEvents.length > 0 ? (
          <div className={styles.grid}>
            {homeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className={styles.messageBox}>
            {t({
              en: "No upcoming events are available at the moment.",
              te: "ప్రస్తుతం రాబోయే ఉత్సవాలు అందుబాటులో లేవు.",
            })}
          </div>
        )}

        <div className={styles.viewAll}>
          <Link href="/events" className={styles.viewAllLink} lang={language}>
            {t({ en: "View All Events →", te: "అన్ని ఉత్సవాలు చూడండి →" })}
          </Link>
        </div>
      </div>
    </section>
  );
}
