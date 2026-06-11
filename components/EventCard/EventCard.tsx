"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";
import type { EventItem } from "@/types";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useLanguageContext();

  return (
    <article className={`${styles.card} hover-elevate`}>
      <div className={styles.tagRow}>
        <span className={styles.tag}>{t(event.tag)}</span>
      </div>
      <h3 className={styles.title}>{t(event.title)}</h3>
      <time className={styles.date}>{t(event.date)}</time>
      <p className={styles.description}>{t(event.description)}</p>
    </article>
  );
}