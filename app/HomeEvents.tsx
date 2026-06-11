"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchServices } from "@/lib/api";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import type { ServiceItem } from "@/types";
import styles from "./page.module.css";

export function HomeServices() {
  const { t, language } = useLanguageContext();
  const fetcher = useCallback(() => fetchServices(), []);
  const { data, loading } = useApi<ServiceItem[]>(fetcher);

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <div className="container">
        <DividerOrnament symbol="✦" />
        <div className={styles.sectionHeader}>
          <h2 id="services-heading" className={styles.sectionTitle} lang={language}>
            {t({ en: "Daily Sevas & Services", te: "నిత్య సేవలు" })}
          </h2>
          <p className={styles.sectionSubtitle} lang={language}>
            {t({
              en: "Participate in our sacred daily rituals and offerings to Lord Venkateswara",
              te: "శ్రీ వేంకటేశ్వర స్వామి నిత్య సేవలలో పాల్గొనండి",
            })}
          </p>
        </div>

        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {data?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        <div className={styles.viewAll}>
          <Link href="/services" className={styles.viewAllLink} lang={language}>
            {t({ en: "View All Services →", te: "అన్ని సేవలు చూడండి →" })}
          </Link>
        </div>
      </div>
    </section>
  );
}