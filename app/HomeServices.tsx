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
  const { t } = useLanguageContext();
  const fetcher = useCallback(() => fetchServices(), []);
  const { data, loading, error, refetch } = useApi<ServiceItem[]>(fetcher);

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      );
    }

    if (error || !data || data.length === 0) {
      return (
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>
            {t({
              en: "Unable to load sevas at this time.",
              te: "సేవలను లోడ్ చేయడం సాధ్యపడలేదు.",
            })}
          </p>
          <button
            className={styles.retryButton}
            onClick={refetch}
            type="button"
          >
            {t({ en: "Reload", te: "మళ్ళీ ప్రయత్నించండి" })}
          </button>
        </div>
      );
    }

    return (
      <div className={styles.grid}>
        {data.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <div className="container">
        <DividerOrnament symbol="✦" />
        <div className={styles.sectionHeader}>
          <h2 id="services-heading" className={styles.sectionTitle}>
            {t({ en: "Daily Sevas & Services", te: "నిత్య సేవలు" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t({
              en: "Participate in our sacred daily rituals and offerings to Lord Venkateswara",
              te: "శ్రీ వేంకటేశ్వర స్వామి నిత్య సేవలలో పాల్గొనండి",
            })}
          </p>
        </div>

        {renderContent()}

        {!loading && !error && data && data.length > 0 && (
          <div className={styles.viewAll}>
            <Link href="/services" className={styles.viewAllLink}>
              {t({ en: "View All Services →", te: "అన్ని సేవలు చూడండి →" })}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}