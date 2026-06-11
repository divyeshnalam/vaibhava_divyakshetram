"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchGallery } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
import type { GalleryItem } from "@/types";
import styles from "./page.module.css";

export default function GalleryPage() {
  const { t, language } = useLanguageContext();

  const fetcher = useCallback(() => fetchGallery(), []);
  const { data, loading, error, refetch } = useApi<GalleryItem[]>(fetcher);

  const hasImages =
    data?.some((category) => category.images && category.images.length > 0) ??
    false;

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <DiyaFlicker count={3} size="sm" />
          <DividerOrnament symbol="ॐ" />

          <h1 className={styles.pageTitle}>
            {t({ en: "Temple Gallery", te: "దేవాలయ గ్యాలరీ" })}
          </h1>

          <p className={styles.pageSubtitle}>
            {t({
              en: "Sacred memories, festivals, rituals, and divine celebrations",
              te: "పవిత్ర జ్ఞాపకాలు, పండుగలు, ఆచారాలు మరియు దైవిక వేడుకలు",
            })}
          </p>
        </div>
      </section>

      <section
        className={styles.gallerySection}
        aria-labelledby="gallery-heading"
      >
        <div className="container">
          <h2 id="gallery-heading" className="sr-only">
            {t({ en: "All Gallery Images", te: "అన్ని గ్యాలరీ చిత్రాలు" })}
          </h2>

          {loading ? (
            <div className={styles.categories}>
              {Array.from({ length: 2 }).map((_, categoryIndex) => (
                <div key={categoryIndex} className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.titleSkeleton} />
                  </div>

                  <div className={styles.grid}>
                    {Array.from({ length: 6 }).map((_, imageIndex) => (
                      <div key={imageIndex} className={styles.skeleton} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p className={styles.errorMessage}>
                {t({
                  en: "Unable to load gallery at this time.",
                  te: "గ్యాలరీని లోడ్ చేయడం సాధ్యపడలేదు.",
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
          ) : !data || data.length === 0 || !hasImages ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>
                {t({
                  en: "No gallery images are available right now.",
                  te: "ప్రస్తుతం గ్యాలరీ చిత్రాలు అందుబాటులో లేవు.",
                })}
              </p>
            </div>
          ) : (
            <div className={styles.categories}>
              {data.map((category) => {
                const categoryName =
                  language === "te" ? category.name_te : category.name_en;

                if (!category.images || category.images.length === 0) {
                  return null;
                }

                return (
                  <article key={category.id} className={styles.category}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryLine} />

                      <h3 className={styles.categoryTitle}>{categoryName}</h3>

                      <span className={styles.categoryLine} />
                    </div>

                    <div className={styles.grid}>
                      {category.images.map((item) => {
                        const caption =
                          language === "te"
                            ? item.caption_te
                            : item.caption_en;

                        const imageAlt =
                          caption?.trim() ||
                          categoryName ||
                          t({
                            en: "Temple gallery image",
                            te: "దేవాలయ గ్యాలరీ చిత్రం",
                          });

                        return (
                          <figure
                            key={`${category.id}-${item.id}`}
                            className={styles.imageCard}
                          >
                            <div className={styles.imageWrapper}>
                              <Image
                                src={item.image}
                                alt={imageAlt}
                                fill
                                className={styles.image}
                                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>

                            {caption?.trim() && (
                              <figcaption className={styles.caption}>
                                {caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}