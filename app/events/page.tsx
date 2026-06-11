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
  const { t } = useLanguageContext();
  const fetcher = useCallback(() => fetchEvents(), []);
  const { data, loading } = useApi<EventItem[]>(fetcher);

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />
          <h1 className={styles.pageTitle}>
            {t({ en: "Festivals & Events", te: "ఉత్సవాలు" })}
          </h1>
          <p className={styles.pageSubtitle}>
            {t({
              en: "Celebrate the divine with us throughout the year",
              te: "సంవత్సరం పొడవునా మాతో పాటు దైవాన్ని ఆరాధించండి",
            })}
          </p>
        </div>
      </section>

      <section className={styles.eventsSection} aria-labelledby="evt-heading">
        <div className="container">
          <h2 id="evt-heading" className="sr-only">
            {t({ en: "All Events", te: "అన్ని ఉత్సవాలు" })}
          </h2>
          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {data?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}