"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchAboutData } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { AboutData, AboutSlokaItem } from "@/types";
import styles from "./page.module.css";

function getLocalizedSlokaValue(
  sloka: AboutSlokaItem,
  enKey: string,
  teKey: string,
  language: "en" | "te"
) {
  const value = language === "te" ? sloka[teKey] : sloka[enKey];

  return typeof value === "string" ? value : "";
}

export default function AboutPage() {
  const { t, language } = useLanguageContext();
  const fetcher = useCallback(() => fetchAboutData(), []);
  const { data, loading, error } = useApi<AboutData>(fetcher);

  const templeInfo = data?.temple_information;

  const templeName = templeInfo
    ? language === "te"
      ? templeInfo.temple_name_te
      : templeInfo.temple_name_en
    : "";

  const history = templeInfo
    ? language === "te"
      ? templeInfo.history_te
      : templeInfo.history_en
    : "";

  const address = templeInfo
    ? language === "te"
      ? templeInfo.address_te
      : templeInfo.address_en
    : "";

  return (
    <div className={styles.page}>
      <section className={styles.pageHero} aria-label="About page header">
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />

          <h1 className={styles.pageTitle} lang={language}>
            {t({ en: "About the Temple", te: "దేవాలయం గురించి" })}
          </h1>
        </div>
      </section>

      <section
        className={styles.contentSection}
        aria-labelledby="about-heading"
      >
        <div className={`container ${styles.contentInner}`}>
          {loading ? (
            <div className={styles.loading} lang={language}>
              {t({ en: "Loading...", te: "లోడ్ అవుతోంది..." })}
            </div>
          ) : error ? (
            <div className={styles.messageBox} lang={language}>
              {t({
                en: "Unable to load temple information right now. Please try again later.",
                te: "ప్రస్తుతం దేవాలయ సమాచారాన్ని లోడ్ చేయలేకపోతున్నాము. దయచేసి తర్వాత ప్రయత్నించండి.",
              })}
            </div>
          ) : !templeInfo ? (
            <div className={styles.messageBox} lang={language}>
              {t({
                en: "Temple information is not available at the moment.",
                te: "ప్రస్తుతం దేవాలయ సమాచారం అందుబాటులో లేదు.",
              })}
            </div>
          ) : (
            <>
              <div className={styles.introCard}>
                <p className={styles.eyebrow} lang={language}>
                  {t({ en: "Temple Information", te: "దేవాలయ సమాచారం" })}
                </p>

                <h2 id="about-heading" className={styles.heading} lang={language}>
                  {templeName}
                </h2>

                <DividerOrnament />

                {history ? (
                  <div className={styles.historyBlock}>
                    <h3 className={styles.blockTitle} lang={language}>
                      {t({ en: "History", te: "చరిత్ర" })}
                    </h3>
                    <p className={styles.historyText} lang={language}>
                      {history}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className={styles.infoGrid}>
                <article className={styles.infoCard}>
                  <h3 className={styles.infoTitle} lang={language}>
                    {t({ en: "Address", te: "చిరునామా" })}
                  </h3>

                  <p className={styles.infoText} lang={language}>
                    {address || t({ en: "Not available", te: "అందుబాటులో లేదు" })}
                  </p>

                  {templeInfo.google_maps_link ? (
                    <a
                      href={templeInfo.google_maps_link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.actionLink}
                      lang={language}
                    >
                      {t({ en: "Open in Google Maps", te: "గూగుల్ మ్యాప్స్‌లో తెరవండి" })}
                    </a>
                  ) : null}
                </article>

                <article className={styles.infoCard}>
                  <h3 className={styles.infoTitle} lang={language}>
                    {t({ en: "Contact", te: "సంప్రదించండి" })}
                  </h3>

                  <div className={styles.contactList}>
                    {templeInfo.phone_number ? (
                      <a
                        href={`tel:${templeInfo.phone_number}`}
                        className={styles.contactLink}
                      >
                        <span className={styles.contactLabel} lang={language}>
                          {t({ en: "Phone", te: "ఫోన్" })}
                        </span>
                        <span>{templeInfo.phone_number}</span>
                      </a>
                    ) : null}

                    {templeInfo.email ? (
                      <a
                        href={`mailto:${templeInfo.email}`}
                        className={styles.contactLink}
                      >
                        <span className={styles.contactLabel} lang={language}>
                          {t({ en: "Email", te: "ఇమెయిల్" })}
                        </span>
                        <span>{templeInfo.email}</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              </div>

              {data.slokas.length > 0 ? (
                <section
                  className={styles.slokasSection}
                  aria-labelledby="slokas-heading"
                >
                  <h2 id="slokas-heading" className={styles.sectionHeading} lang={language}>
                    {t({ en: "Slokas", te: "శ్లోకాలు" })}
                  </h2>

                  <div className={styles.slokasGrid}>
                    {data.slokas.map((sloka, index) => {
                      const title = getLocalizedSlokaValue(
                        sloka,
                        "title_en",
                        "title_te",
                        language
                      );

                      const text = getLocalizedSlokaValue(
                        sloka,
                        "text_en",
                        "text_te",
                        language
                      );

                      const meaning = getLocalizedSlokaValue(
                        sloka,
                        "meaning_en",
                        "meaning_te",
                        language
                      );

                      if (!title && !text && !meaning) return null;

                      return (
                        <article
                          key={sloka.id ?? index}
                          className={styles.slokaCard}
                        >
                          {title ? (
                            <h3 className={styles.slokaTitle} lang={language}>
                              {title}
                            </h3>
                          ) : null}

                          {text ? (
                            <p className={styles.slokaText} lang={language}>
                              {text}
                            </p>
                          ) : null}

                          {meaning ? (
                            <p className={styles.slokaMeaning} lang={language}>
                              {meaning}
                            </p>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}