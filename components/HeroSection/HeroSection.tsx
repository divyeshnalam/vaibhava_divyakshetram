"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { fetchHeroData, type HeroSlide } from "@/lib/api";
import styles from "./HeroSection.module.css";

const CHANTING_URL =
  "https://pub-3b07bf9ba3e44f8a921369b87870b682.r2.dev/Chanting.mp3";

const SLIDE_DURATION = 1500;

/* ─── Icons ────────────────────────────────────────────────────── */
function IconMuted() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconSound() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

/* ─── Component ────────────────────────────────────────────────── */
export function HeroSection() {
  const fetcher = useCallback(() => fetchHeroData(), []);
  const { data, loading, error } = useApi(fetcher);

  const slides: HeroSlide[] = data?.hero_slides ?? [];

  /* Carousel */
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Audio */
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setTimeout(() => {
      goTo((activeIndex + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex, slides.length]);

  function goTo(index: number) {
    if (transitioning || index === activeIndex) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPrevIndex(activeIndex);
    setTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => {
      setPrevIndex(null);
      setTransitioning(false);
    }, 900);
  }

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }
    setMuted((p) => !p);
  };

  /* Loading */
  if (loading) {
    return (
      <section className={styles.hero} aria-busy="true" aria-label="Loading">
        <div className={styles.loadingPulse} />
      </section>
    );
  }

  /* Error or no slides — show maroon fallback, don't crash */
  if (error || slides.length === 0) {
    return (
      <section className={styles.hero} aria-label="Temple">
        <div className={styles.bgFallback} />
        <audio ref={audioRef} src={CHANTING_URL} loop preload="auto" muted />
        <button type="button" className={styles.audioBtn} onClick={toggleAudio}
          aria-label={muted ? "Unmute vedic chanting" : "Mute vedic chanting"}>
          {muted ? <IconMuted /> : <IconSound />}
        </button>
      </section>
    );
  }

  return (
    <section className={styles.hero} aria-label="Temple image slideshow">

      {/* Slides */}
      <div className={styles.slideTrack} aria-hidden="true">

        {/* Outgoing */}
        {prevIndex !== null && (
          <div
            className={`${styles.slide} ${styles.slideOut}`}
            style={{ backgroundImage: `url(${slides[prevIndex].image})` }}
          />
        )}

        {/* All slides — only active one is visible */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === activeIndex ? styles.slideActive : styles.slideHidden}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        <div className={styles.vignette} />
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <nav className={styles.dots} aria-label="Slide navigation">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            />
          ))}
        </nav>
      )}

      {/* Audio */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={CHANTING_URL} loop preload="auto" muted />
      <button
        type="button"
        className={styles.audioBtn}
        onClick={toggleAudio}
        aria-label={muted ? "Unmute vedic chanting" : "Mute vedic chanting"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? <IconMuted /> : <IconSound />}
      </button>

    </section>
  );
}