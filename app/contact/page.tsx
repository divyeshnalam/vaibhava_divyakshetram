"use client";

import { useCallback } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useApi } from "@/hooks/useApi";
// import { fetchContactInfo } from "@/lib/api";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { DiyaFlicker } from "@/components/DiyaFlicker/DiyaFlicker";
// import type { ContactInfo } from "@/types";
import styles from "./page.module.css";

export default function ContactPage() {
  const { t } = useLanguageContext();
  // const fetcher = useCallback(() => fetchContactInfo(), []);
  // const { data, loading } = useApi<ContactInfo>(fetcher);

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
<div className={styles.messageCard}>
                <h2 className={styles.cardHeading}>
                  {t({ en: "Send an Enquiry", te: "విచారణ పంపండి" })}
                </h2>
                <DividerOrnament />
                <p className={styles.messageNote}>
                  {t({
                    en: "For seva bookings, donations, or general enquiries, please call or email us. Our team responds within one business day.",
                    te: "సేవ బుకింగ్‌లు, విరాళాలు లేదా సాధారణ విచారణల కోసం దయచేసి ఫోన్ చేయండి లేదా ఇమెయిల్ చేయండి. మా బృందం ఒక పని దినం లోపు స్పందిస్తుంది.",
                  })}
                </p>

                <div className={styles.ctaRow}>
                  <a
                    href={`tel:+914023456789`}
                    className={styles.ctaPhone}
                  >
                    📞{" "}
                    {t({ en: "Call the Temple", te: "దేవాలయాన్ని కాల్ చేయండి" })}
                  </a>
                 <a 
                    href="mailto:info@vaibhavavenkateswara.org"
                    className={styles.ctaEmail}
                  >
                    ✉{" "}
                    {t({ en: "Send Email", te: "ఇమెయిల్ పంపండి" })}
                  </a>
                </div>
              </div>
      </section>
    </div>
  );
}