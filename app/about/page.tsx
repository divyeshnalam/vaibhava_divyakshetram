"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchAboutData } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { AboutData } from "@/types";
import styles from "./page.module.css";

export default function AboutPage() {
  const { t } = useLanguageContext();
  const fetcher = useCallback(() => fetchAboutData(), []);
  const { data, loading } = useApi<AboutData>(fetcher);

  return (
    <div className={styles.page}>
      {/* Page Hero */}
      <section className={styles.pageHero} aria-label="About page header">
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />
          <h1 className={styles.pageTitle}>
            {t({ en: "About the Temple", te: "దేవాలయం గురించి" })}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={styles.contentSection}
        aria-labelledby="about-heading"
      >
        <div className={`container ${styles.contentInner}`}>
          {loading || !data ? (
            <div className={styles.loading}>
              {t({ en: "Loading...", te: "లోడ్ అవుతోంది..." })}
            </div>
          ) : (
            <>
              <h2 id="about-heading" className={styles.heading}>
                {t(data.heading)}
              </h2>
              <DividerOrnament />
              <div className={styles.bodyText}>
                {data.body.map((para, i) => (
                  <p key={i} className={styles.para}>
                    {t(para)}
                  </p>
                ))}
              </div>
              <blockquote className={styles.historyBlock}>
                <p className={styles.historyText}>{t(data.history)}</p>
                <footer className={styles.historyFooter}>
                  — {t({ en: "Temple Records", te: "దేవాలయ అభిలేఖాలు" })}
                </footer>
              </blockquote>
            </>
          )}
        </div>
      </section>
    </div>
  );
}