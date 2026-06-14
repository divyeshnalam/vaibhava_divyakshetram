"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchEvents } from "@/lib/api";
import { EventCard } from "@/components/EventCard/EventCard";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { EventItem } from "@/types";
import styles from "./page.module.css";

export default function EventsPage() {
  const { t, language } = useLanguageContext();
  const fetcher = useCallback(() => fetchEvents(), []);
  const { data, loading, error } = useApi<EventItem[]>(fetcher);

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />

          <h1 className={styles.pageTitle} lang={language}>
            {t({ en: "Festivals & Events", te: "ఉత్సవాలు" })}
          </h1>

          <p className={styles.pageSubtitle} lang={language}>
            {t({
              en: "Celebrate the divine with us throughout the year",
              te: "సంవత్సరం పొడవునా మాతో పాటు దైవాన్ని ఆరాధించండి",
            })}
          </p>
        </div>
      </section>

      <section className={styles.eventsSection} aria-labelledby="evt-heading">
        <div className="container">
          <h2 id="evt-heading" className="sr-only" lang={language}>
            {t({ en: "All Events", te: "అన్ని ఉత్సవాలు" })}
          </h2>

          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : error ? (
            <div className={styles.messageBox} lang={language}>
              {t({
                en: "Unable to load events right now. Please try again later.",
                te: "ప్రస్తుతం ఉత్సవాలను లోడ్ చేయలేకపోతున్నాము. దయచేసి తర్వాత ప్రయత్నించండి.",
              })}
            </div>
          ) : data?.length ? (
            <div className={styles.grid}>
              {data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className={styles.messageBox} lang={language}>
              {t({
                en: "No events are available at the moment.",
                te: "ప్రస్తుతం ఎటువంటి ఉత్సవాలు అందుబాటులో లేవు.",
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}