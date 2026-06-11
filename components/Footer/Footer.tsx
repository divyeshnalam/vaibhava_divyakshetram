"use client";

import Link from "next/link";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { DividerOrnament } from "@/components/DividerOrnament/DividerOrnament";
import { TEMPLE_NAME } from "@/lib/constants";
import styles from "./Footer.module.css";

const FOOTER_NAV = [
  {
    heading: { en: "About", te: "మా గురించి" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/about" },
      { label: { en: "The Temple", te: "ఆలయం" }, href: "/about/temple" },
      { label: { en: "The Temple Story", te: "ఆలయ చరిత్ర" }, href: "/about/story" },
      { label: { en: "General Information", te: "సాధారణ సమాచారం" }, href: "/about/info" },
    ],
  },
  {
    heading: { en: "Sevas & Darshanam", te: "సేవలు & దర్శనం" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/sevas" },
      { label: { en: "Darshanam", te: "దర్శనం" }, href: "/sevas/darshanam" },
      { label: { en: "Paroksha Seva", te: "పరోక్ష సేవ" }, href: "/sevas/paroksha" },
      { label: { en: "Pratyaksha Seva", te: "ప్రత్యక్ష సేవ" }, href: "/sevas/pratyaksha" },
      { label: { en: "Saswata Seva", te: "శాశ్వత సేవ" }, href: "/sevas/saswata" },
    ],
  },
  {
    heading: { en: "Donations", te: "విరాళాలు" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/donations" },
      { label: { en: "e-Hundi", te: "ఇ-హుండీ" }, href: "/donations/e-hundi" },
      { label: { en: "Devasthana Trust", te: "దేవస్థాన ట్రస్ట్" }, href: "/donations/trust" },
      { label: { en: "Annadanam Trust", te: "అన్నదానం ట్రస్ట్" }, href: "/donations/annadanam" },
    ],
  },
  {
    heading: { en: "Online Booking", te: "ఆన్లైన్ బుకింగ్" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/booking" },
      { label: { en: "Darshanam Tickets", te: "దర్శనం టికెట్లు" }, href: "/booking/darshanam" },
      { label: { en: "Pratyaksha Seva Booking", te: "ప్రత్యక్ష సేవ బుకింగ్" }, href: "/booking/pratyaksha" },
      { label: { en: "Paroksha Seva Booking", te: "పరోక్ష సేవ బుకింగ్" }, href: "/booking/paroksha" },
      { label: { en: "Donation", te: "విరాళం" }, href: "/booking/donation" },
    ],
  },
  {
    heading: { en: "Media Room", te: "మీడియా రూమ్" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/media" },
      { label: { en: "Media Kit", te: "మీడియా కిట్" }, href: "/media/kit" },
      { label: { en: "Gallery", te: "గ్యాలరీ" }, href: "/media/gallery" },
      { label: { en: "Whats New", te: "తాజా వార్తలు" }, href: "/media/news" },
      { label: { en: "Press", te: "పత్రికలు" }, href: "/media/press" },
    ],
  },
  {
    heading: { en: "Support", te: "సహాయం" },
    links: [
      { label: { en: "Overview", te: "అవలోకనం" }, href: "/support" },
      { label: { en: "FAQs", te: "తరచుగా అడిగే ప్రశ్నలు" }, href: "/support/faqs" },
      { label: { en: "Facilities to Pilgrims", te: "భక్తులకు సౌకర్యాలు" }, href: "/support/facilities" },
      { label: { en: "Connectivity", te: "కనెక్టివిటీ" }, href: "/support/connectivity" },
      { label: { en: "Contact Us", te: "సంప్రదించండి" }, href: "/support/contact" },
    ],
  },
];

export function Footer() {
  const { t } = useLanguageContext();

  return (
    <footer className={styles.footer}>
      <DividerOrnament symbol="ॐ" />

      {/* Main nav grid */}
      <div className={`container ${styles.navGrid} ${styles.desktopOnly}`}>
        {FOOTER_NAV.map((col) => (
          <div key={col.heading.en} className={styles.navCol}>
            <h3 className={styles.colHeading}>{t(col.heading)}</h3>
            <ul className={styles.linkList} role="list">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact row */}
      <div className={`container ${styles.contactRow}`}>
        <div className={styles.contactItem}>
          <span className={styles.contactIcon} aria-hidden="true">📍</span>
          <address className={styles.address}>
            {t({
              en: "Sri Sri Sri Vaibhava Venkateswara Swamy Vari Divyakshetram N.G.G.O.S Colony, Kapparada, Visakhapatnam - 530 007",
              te: "శ్రీశ్రీశ్రీ వైభవ వేంకటేశ్వర స్వామి వారి దివ్యక్షేత్రం దేవదాయ - ధర్మదాయ శాఖ ఎన్.జి.ఓ.ఎస్. కోలనీ, కప్పరాడ, విశాఖపట్నం - 530 007",
            })}
          </address>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactIcon} aria-hidden="true">📞</span>
          <div className={styles.contactLinks}>
            {/* <a href="tel:+918662423500" className={styles.contactLink}>
              +91 (0866) 2423500
            </a> */}
            <a href="tel:+918897299084" className={styles.contactLink}>
              +91 8897299084
            </a>
          </div>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactIcon} aria-hidden="true">✉️</span>
          <a href="mailto:info@vaibhavavenkateswara.org" className={styles.contactLink}>
            info@vaibhavavenkateswara.org
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactIcon} aria-hidden="true">🌐</span>
          <a href="https://www.vaibhavavenkateswara.org" className={styles.contactLink}>
            www.vaibhavavenkateswara.org
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              className={styles.socialLink}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Facebook SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              className={styles.socialLink}
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* YouTube SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--color-maroon)" />
              </svg>
            </a>
          </div>

          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()}{" "}
            {t({
              en: "Sri Sri Sri Vaibhava Venkateswara Swamy Devasthanam. All Rights Reserved.",
              te: "శ్రీ శ్రీ శ్రీ వైభవ వేంకటేశ్వర స్వామి దేవస్థానం. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
            })}
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>
              {t({ en: "Privacy Policy", te: "గోప్యతా విధానం" })}
            </Link>
            <span className={styles.legalSep} aria-hidden="true">|</span>
            <Link href="/terms" className={styles.legalLink}>
              {t({ en: "Terms & Conditions", te: "నిబంధనలు & షరతులు" })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}