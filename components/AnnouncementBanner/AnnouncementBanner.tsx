"use client";

import { useMemo, useState } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchAnnouncements } from "@/lib/api";
import Link from "next/link";
import styles from "./AnnouncementBanner.module.css";

export function AnnouncementBanner() {
  const { t, language } = useLanguageContext();
  const { data, loading, error } = useApi(fetchAnnouncements);
  const [isPaused, setIsPaused] = useState(false);

  const items = data ?? [];

  const tickerText = useMemo(() => {
    return items
      .map((item) => (language === "te" ? item.title_te : item.title_en))
      .join("   ❧   ");
  }, [items, language]);

  if (loading || error || items.length === 0) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="News updates"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.label}>
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="0"
            y="0"
            width="16"
            height="14"
            rx="2"
            fill="currentColor"
            opacity="0.15"
          />
          <rect
            x="2"
            y="3"
            width="12"
            height="1.5"
            rx="0.75"
            fill="currentColor"
          />
          <rect
            x="2"
            y="6.25"
            width="9"
            height="1.5"
            rx="0.75"
            fill="currentColor"
          />
          <rect
            x="2"
            y="9.5"
            width="11"
            height="1.5"
            rx="0.75"
            fill="currentColor"
          />
        </svg>

        <span>{t({ en: "News Update", te: "వార్తలు" })}</span>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.tickerWrap} aria-live="polite">
        <div
          className={`${styles.ticker} ${isPaused ? styles.paused : ""}`}
          style={
            {
              "--duration": `${Math.max(items.length * 2, 5)}s`,
            } as React.CSSProperties
          }
        >
          <span className={styles.tickerInner}>{tickerText}</span>
          <span className={styles.tickerInner} aria-hidden="true">
            {tickerText}
          </span>
        </div>
      </div>

      <Link href="/news" className={styles.viewAll}>
        {t({ en: "View All", te: "అన్నీ చూడండి" })}

        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </div>
  );
}