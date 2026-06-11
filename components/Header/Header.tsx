"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle";
import styles from "./Header.module.css";

/* ─── Nav items (Home removed — logo is the home link) ─── */
const NAV_ITEMS = [
  { href: "/about",    en: "About Temple",  te: "దేవాలయం గురించి" },
  { href: "/events",   en: "Events",        te: "ఉత్సవాలు"        },
  { href: "/gallery",  en: "Gallery",       te: "గ్యాలరీ"          },
  { href: "/services", en: "Sevas",         te: "సేవలు"            },
  { href: "/contact",  en: "Contact",       te: "సంప్రదించండి"     },
];

function TempleLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Sri Sri Sri Vaibhava Venkateswara Swamy Temple"
      width={90}
      height={90}
      className={className}
      priority
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export function Header() {
  const { t, language } = useLanguageContext();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const backdropRef  = useRef<HTMLDivElement>(null);
  const drawerRef    = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    if (drawerOpen) setTimeout(() => firstLinkRef.current?.focus(), 320);
  }, [drawerOpen]);

  const handleDrawerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!drawerOpen) return;
      if (e.key === "Escape") { setDrawerOpen(false); return; }
      if (e.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    },
    [drawerOpen]
  );

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 60) setDrawerOpen(false);
    touchStartX.current = null;
  };

  const isActive = (href: string) => pathname.startsWith(href);

  const templeName = {
    en: "Sri Sri Sri Vaibhava Venkateswara Swamy Temple",
    te: "శ్రీ శ్రీ శ్రీ వైభవ వేంకటేశ్వర స్వామి దేవస్థానం",
  };

  return (
    <>
      {/* ═══════════ TOP BAR ═══════════ */}
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
        role="banner"
      >
        {/* ── MOBILE bar ── */}
        <div className={styles.mobileBar}>
          {/* LEFT: burger */}
          <button
            className={styles.burgerBtn}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="drawer-nav"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="2" y="5"  width="18" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="10" width="18" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="15" width="18" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>

          {/* CENTER: logo → home */}
          <Link href="/" className={styles.mobileLogo} aria-label="Go to homepage">
            <TempleLogo className={styles.logoImg} />
            <span className={styles.mobileLogoText} lang={language}>{t(templeName)}</span>
          </Link>

          {/* RIGHT: language */}
          <div className={styles.mobileRight}>
            <LanguageToggle />
          </div>
        </div>

        {/* ── DESKTOP bar ── */}
        <div className={styles.desktopBar}>
          {/* LEFT: logo → home */}
          <Link href="/" className={styles.desktopLogo} aria-label="Go to homepage">
            <TempleLogo className={styles.logoImg} />
            <span className={styles.desktopLogoText} lang={language}>{t(templeName)}</span>
          </Link>

          {/* CENTER: nav (no Home item) */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.desktopNavList} role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.desktopNavItem}>
                  <Link
                    href={item.href}
                    className={`${styles.desktopNavLink} ${
                      isActive(item.href) ? styles.desktopNavLinkActive : ""
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className={styles.desktopNavLabel} lang={language}>
                      {language === "te" ? item.te : item.en}
                    </span>
                    {isActive(item.href) && (
                      <span className={styles.activePill} aria-hidden="true" />
                    )}
                    <span className={styles.goldUnderline} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT: language */}
          <div className={styles.desktopRight}>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* ═══════════ BACKDROP ═══════════ */}
      <div
        ref={backdropRef}
        className={`${styles.backdrop} ${drawerOpen ? styles.backdropVisible : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ═══════════ DRAWER ═══════════ */}
      <nav
        id="drawer-nav"
        ref={drawerRef}
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
        onKeyDown={handleDrawerKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="navigation"
      >
        {/* Drawer header — logo → home */}
        <div className={styles.drawerHeader}>
          <Link
            href="/"
            className={styles.drawerBrand}
            aria-label="Go to homepage"
            onClick={() => setDrawerOpen(false)}
          >
            <TempleLogo className={styles.drawerLogoImg} />
            <span className={styles.drawerBrandName} lang={language}>{t(templeName)}</span>
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Ornamental divider */}
        <div className={styles.drawerDivider} aria-hidden="true">
          <span className={styles.drawerDividerLine} />
          <span className={styles.drawerDividerSymbol}>✦ ॐ ✦</span>
          <span className={styles.drawerDividerLine} />
        </div>

        {/* Nav links */}
        <ul className={styles.drawerList} role="list">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.href}>
              <Link
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                className={`${styles.drawerLink} ${
                  isActive(item.href) ? styles.drawerLinkActive : ""
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
                tabIndex={drawerOpen ? 0 : -1}
              >
              <span className={styles.drawerLinkLabels}>
                <span
                  className={styles.drawerLinkLabel}
                  lang={language}
                >
                  {language === "te" ? item.te : item.en}
                </span>
              </span>
                {isActive(item.href) && (
                  <span className={styles.drawerActiveDot} aria-hidden="true" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className={styles.drawerFooter} aria-hidden="true">
          <span className={styles.drawerFooterText}>
            {t({ en: "Om Namo Venkatesaya", te: "ఓం నమో వేంకటేశాయ" })}
          </span>
        </div>
      </nav>
    </>
  );
}