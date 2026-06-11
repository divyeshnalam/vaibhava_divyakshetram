"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
import { fetchGallery } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import type { GalleryImageItem, GalleryItem } from "@/types";
import styles from "./Gallery.module.css";

interface HomeGalleryImage extends GalleryImageItem {
  albumNameEn: string;
  albumNameTe: string;
}

export function Gallery() {
  const { t, language } = useLanguageContext();

  const fetcher = useCallback(() => fetchGallery(), []);
  const { data, loading, error, refetch } = useApi<GalleryItem[]>(fetcher);

  const images = useMemo<HomeGalleryImage[]>(() => {
    if (!data) return [];

    return data
      .flatMap((album) =>
        album.images.map((image) => ({
          ...image,
          albumNameEn: album.name_en,
          albumNameTe: album.name_te,
        }))
      )
      .sort((a, b) => a.display_order - b.display_order);
  }, [data]);

  const homeImages = images.slice(0, 6);

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.galleryGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeleton} />
          ))}
        </div>
      );
    }

    if (error || !data || images.length === 0) {
      return (
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>
            {t({
              en: "Unable to load gallery at this time.",
              te: "గ్యాలరీని లోడ్ చేయడం సాధ్యపడలేదు.",
            })}
          </p>

          <button className={styles.retryButton} onClick={refetch} type="button">
            {t({ en: "Reload", te: "మళ్ళీ ప్రయత్నించండి" })}
          </button>
        </div>
      );
    }

    return (
      <>
        <div className={styles.galleryGrid}>
          {homeImages.map((item) => {
            const caption =
              language === "te" ? item.caption_te : item.caption_en;

            const albumName =
              language === "te" ? item.albumNameTe : item.albumNameEn;

            const imageAlt = caption?.trim() || albumName || "Temple gallery";

            return (
              <figure key={item.id} className={styles.imageCard}>
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
                  <figcaption className={styles.caption}>{caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>

        <div className={styles.viewMore}>
          <Link href="/gallery" className={styles.viewMoreLink}>
            {t({ en: "View More Gallery →", te: "మరిన్ని చిత్రాలు చూడండి →" })}
          </Link>
        </div>
      </>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className="container">
        <DividerOrnament symbol="✦" />

        <div className={styles.sectionHeader}>
          <h2 id="gallery-heading" className={styles.sectionTitle}>
            {t({ en: "Temple Gallery", te: "దేవాలయ గ్యాలరీ" })}
          </h2>

          <p className={styles.sectionSubtitle}>
            {t({
              en: "Sacred moments, festivals, and divine celebrations from our temple",
              te: "మా దేవాలయంలోని పవిత్ర క్షణాలు, పండుగలు మరియు దైవిక వేడుకలు",
            })}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
}