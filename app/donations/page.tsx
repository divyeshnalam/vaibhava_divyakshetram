"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchDonationTiers } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { DonationTier } from "@/types";
import styles from "./page.module.css";

export default function DonationsPage() {
  const { t, language } = useLanguageContext();
  const fetcher = useCallback(() => fetchDonationTiers(), []);
  const { data, loading } = useApi<DonationTier[]>(fetcher);

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />
          <h1 className={styles.pageTitle}>
            {t({ en: "Make a Donation", te: "విరాళం ఇవ్వండి" })}
          </h1>
          <p className={styles.pageSubtitle}>
            {t({
              en: "Your seva and generosity sustain our sacred traditions",
              te: "మీ సేవ మరియు దాతృత్వం మా పవిత్ర సంప్రదాయాలను నిలబెడుతుంది",
            })}
          </p>
        </div>
      </section>

      <section className={styles.donationSection}>
        <div className="container">
          <DividerOrnament />

          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {data?.map((tier) => (
                <article key={tier.id} className={`${styles.card} hover-elevate`}>
                  <div className={styles.cardAmount}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.amountNum}>
                      {tier.amount.toLocaleString(
                        language === "te" ? "te-IN" : "en-IN"
                      )}
                    </span>
                  </div>
                  <h3 className={styles.tierName}>{t(tier.name)}</h3>
                  <p className={styles.tierDesc}>{t(tier.description)}</p>
                  <button className={styles.donateBtn} type="button">
                    {t({ en: "Donate Now", te: "ఇప్పుడు విరాళం ఇవ్వండి" })}
                  </button>
                </article>
              ))}
            </div>
          )}

          <div className={styles.note}>
            <p>
              {t({
                en: "All donations are eligible for tax exemption under Section 80G of the Income Tax Act.",
                te: "అన్ని విరాళాలు ఆదాయ పన్ను చట్టం యొక్క సెక్షన్ 80G కింద పన్ను మినహాయింపుకు అర్హమైనవి.",
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}