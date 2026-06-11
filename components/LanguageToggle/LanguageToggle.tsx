"use client";

import { useLanguageContext } from "@/contexts/LanguageContext";
import styles from "./LanguageToggle.module.css";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageContext();

  const isTelugu = language === "te";

  const handleToggle = () => {
    setLanguage(isTelugu ? "en" : "te");
  };

  return (
    <button
      type="button"
      className={styles.langToggle}
      onClick={handleToggle}
      aria-label={isTelugu ? "Switch language to English" : "భాషను తెలుగుకు మార్చండి"}
      title={isTelugu ? "Switch to English" : "తెలుగుకు మార్చండి"}
    >
      <span className={styles.globe} aria-hidden="true">
        🌐
      </span>
      <span className={styles.label} lang={isTelugu ? "en" : "te"}>
        {isTelugu ? "EN" : "తె"}
      </span>
    </button>
  );
}