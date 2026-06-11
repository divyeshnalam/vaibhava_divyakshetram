"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchServices } from "@/lib/api";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { ServiceItem } from "@/types";
import styles from "./page.module.css";

export default function ServicesPage() {
  const { t } = useLanguageContext();
  const fetcher = useCallback(() => fetchServices(), []);
  const { data, loading } = useApi<ServiceItem[]>(fetcher);

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />
          <h1 className={styles.pageTitle}>
            {t({ en: "Sevas & Services", te: "సేవలు" })}
          </h1>
          <p className={styles.pageSubtitle}>
            {t({
              en: "Book and participate in our sacred daily rituals",
              te: "మా పవిత్ర నిత్య సేవలలో పాల్గొనండి మరియు బుక్ చేసుకోండి",
            })}
          </p>
        </div>
      </section>

      <section className={styles.servicesSection} aria-labelledby="svc-heading">
        <div className="container">
          <h2 id="svc-heading" className="sr-only">
            {t({ en: "All Services", te: "అన్ని సేవలు" })}
          </h2>

          {loading ? (
            <div className={styles.grid}>
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
        </div>
      </section>
    </div>
  );
}