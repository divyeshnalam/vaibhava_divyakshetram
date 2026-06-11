"use client";

import Image from "next/image";
import { useLanguageContext } from "@/contexts/LanguageContext";
import type { ServiceItem } from "@/types";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { language } = useLanguageContext();

  const name = language === "te" ? service.name_te : service.name_en;
  const description =
    language === "te" ? service.description_te : service.description_en;

  return (
    <article className={`${styles.card} hover-elevate`}>
      <div className={styles.imageWrapper} aria-hidden="true">
        {service.image ? (
          <Image
            src={service.image}
            alt={name}
            fill
            className={styles.image}
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderSymbol} aria-hidden="true">
              🪔
            </span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}