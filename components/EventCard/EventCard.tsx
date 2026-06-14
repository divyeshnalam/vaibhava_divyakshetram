"use client";

import Image from "next/image";
import { useLanguageContext } from "@/contexts/LanguageContext";
import type { EventItem } from "@/types";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: EventItem;
}

function formatEventDate(date: string, language: "en" | "te") {
  const locale = language === "te" ? "te-IN" : "en-IN";
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function formatEventTime(time: string | null, language: "en" | "te") {
  if (!time) return "";

  const locale = language === "te" ? "te-IN" : "en-IN";
  const parsedTime = new Date(`2000-01-01T${time}`);

  if (Number.isNaN(parsedTime.getTime())) {
    return time;
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedTime);
}

export function EventCard({ event }: EventCardProps) {
  const { language, t } = useLanguageContext();

  const title = language === "te" ? event.title_te : event.title_en;
  const description =
    language === "te" ? event.description_te : event.description_en;
  const significance =
    language === "te" ? event.significance_te : event.significance_en;

  const eventDate = formatEventDate(event.event_date, language);
  const eventTime = formatEventTime(event.event_time, language);

  const badgeText = event.is_featured
    ? t({ en: "Featured Event", te: "ప్రత్యేక ఉత్సవం" })
    : t({ en: "Upcoming Event", te: "రాబోయే ఉత్సవం" });

  return (
    <article className={`${styles.card} hover-elevate`}>
      <div className={styles.imageWrapper}>
        {event.image ? (
          <Image
            src={event.image}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.placeholderSymbol}>🛕</span>
          </div>
        )}

        <span
          className={`${styles.badge} ${
            event.is_featured ? styles.featuredBadge : ""
          }`}
        >
          {badgeText}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.meta}>
          <time dateTime={event.event_date} className={styles.date}>
            {eventDate}
          </time>

          {eventTime ? (
            <>
              <span className={styles.dot} aria-hidden="true">
                •
              </span>
              <span className={styles.time}>{eventTime}</span>
            </>
          ) : null}
        </div>

        <p className={styles.description}>{description}</p>

        {significance.trim() ? (
          <div className={styles.significance}>
            <h4 className={styles.significanceTitle}>
              {t({ en: "Significance", te: "ప్రాముఖ్యత" })}
            </h4>
            <p className={styles.significanceText}>{significance}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}