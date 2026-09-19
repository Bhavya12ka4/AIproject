import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "kookduku_cookie_consent";

/**
 * CookieConsent — DPDPA 2023-aligned consent banner.
 *
 * Stores consent choice in localStorage under `kookduku_cookie_consent`.
 * Values: "accepted" | "essential_only"
 *
 * Essential: Google Fonts & Material Icons CDN (renders the UI — functional necessity).
 * Analytics: Currently none — placeholder for future Google Analytics or Clarity.
 *
 * Under India's DPDPA 2023, consent must be free, specific, informed,
 * unconditional, and unambiguous. This banner satisfies those requirements.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-[68px] left-0 right-0 z-[60] px-3 max-w-lg sm:max-w-xl mx-auto"
    >
      <div className="bg-surface-container border border-app-border rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-md">
        {/* Header */}
        <div className="flex items-start gap-2 mb-2">
          <span className="material-symbols-outlined fill-icon text-secondary text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
            cookie
          </span>
          <h2 id="cookie-consent-title" className="text-label-lg font-bold text-on-surface leading-snug">
            We use cookies &amp; external services
          </h2>
        </div>

        {/* Description */}
        <p id="cookie-consent-desc" className="text-body-sm text-on-surface-variant mb-3 leading-relaxed">
          This site loads fonts and icons from Google's CDN (Google Fonts, Material Icons),
          which may process your IP address. No tracking cookies are set without your consent.
          See our{" "}
          <Link to="/cookie-policy" className="text-primary underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-primary underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Details toggle */}
        {showDetails && (
          <div className="mb-3 p-2.5 rounded-lg bg-surface-container-low border border-app-border text-body-sm text-on-surface-variant space-y-1.5">
            <div>
              <span className="font-bold text-on-surface">✅ Essential (always active):</span>
              <br />Google Fonts CDN, Material Symbols CDN — required to render the site correctly.
            </div>
            <div>
              <span className="font-bold text-on-surface">📊 Analytics (optional):</span>
              <br />Not currently active. If enabled in future, you will be re-asked for consent.
            </div>
            <div>
              <span className="font-bold text-on-surface">💬 WhatsApp ordering:</span>
              <br />Clicking WhatsApp links opens WhatsApp; their{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Privacy Policy
              </a>{" "}
              applies.
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDetails((v) => !v)}
          className="text-label-sm text-primary underline mb-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-container rounded"
          aria-expanded={showDetails}
        >
          {showDetails ? "Hide details" : "Show cookie details"}
        </button>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => accept("accepted")}
            className="w-full py-2.5 rounded-xl bg-primary-container text-white text-label-lg font-bold active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-container focus-visible:ring-offset-surface-container"
          >
            Accept All
          </button>
          <button
            onClick={() => accept("essential_only")}
            className="w-full py-2.5 rounded-xl bg-surface-container-low border border-app-border text-on-surface text-label-lg font-bold active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-outline focus-visible:ring-offset-surface-container"
          >
            Essential Only
          </button>
        </div>

        <p className="text-[10px] text-on-surface-variant/80 mt-2 text-center">
          Under India's DPDPA 2023, you may withdraw consent at any time via our{" "}
          <Link to="/cookie-policy" className="underline text-on-surface-variant hover:text-on-surface">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
