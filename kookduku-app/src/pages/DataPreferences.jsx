import React from "react";
import LegalLayout from "../components/LegalLayout";

/**
 * CookiePolicy — Covers Google CDN data transfers, localStorage,
 * and cookie consent management per India's DPDPA 2023.
 */
export default function CookiePolicy() {
  const clearConsent = () => {
    localStorage.removeItem("kookduku_cookie_consent");
    window.location.reload();
  };

  return (
    <LegalLayout title="Cookie Policy" lastUpdated="[DATE — REPLACE BEFORE PUBLISHING]">
      <div className="space-y-6">

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">1. What Are Cookies?</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            Cookies are small data files placed on your device when you visit a website. This site uses
            minimal data storage — specifically <strong className="text-slate-900 dark:text-white">localStorage</strong> (not
            traditional HTTP cookies) — to remember your consent preference. We do not use tracking
            cookies or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">2. What We Store &amp; Why</h2>
          <div className="space-y-3">

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-bold text-slate-900 dark:text-white text-xs">Consent Preference</p>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">Essential</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-neutral-300"><strong className="text-slate-900 dark:text-white">Key:</strong> <code className="font-mono bg-slate-200/60 dark:bg-neutral-800 px-1 py-0.5 rounded text-[11px]">kookduku_cookie_consent</code></p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Storage:</strong> localStorage (browser)</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Purpose:</strong> Remembers whether you accepted all services or essential-only. Without this, the consent banner would appear on every page load.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Expires:</strong> Until you clear browser storage or withdraw consent.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Third party:</strong> No — stored locally on your device only.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-bold text-slate-900 dark:text-white text-xs">Google Fonts CDN Request</p>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">Essential</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-neutral-300"><strong className="text-slate-900 dark:text-white">What it is:</strong> Not a cookie — a network request. Your browser fetches Plus Jakarta Sans font files from <code className="font-mono bg-slate-200/60 dark:bg-neutral-800 px-1 py-0.5 rounded text-[11px]">fonts.googleapis.com</code>.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Data sent to Google:</strong> Your IP address, browser type, referring URL, date/time.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Why essential:</strong> Required to render the site's typography correctly.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Google's policy:</strong>{" "}
                <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C0392B] dark:text-[#FF535A] underline font-semibold">
                  Google Fonts Privacy FAQ
                </a>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-bold text-slate-900 dark:text-white text-xs">Material Icons CDN Request</p>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">Essential</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-neutral-300"><strong className="text-slate-900 dark:text-white">What it is:</strong> Network request to <code className="font-mono bg-slate-200/60 dark:bg-neutral-800 px-1 py-0.5 rounded text-[11px]">fonts.googleapis.com</code> for Material Symbols icon font.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Data sent to Google:</strong> Same as Fonts CDN above.</p>
              <p className="text-xs text-slate-700 dark:text-neutral-300 mt-1"><strong className="text-slate-900 dark:text-white">Why essential:</strong> Required for icons (cart, search, nav) to display throughout the UI.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 opacity-75">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-bold text-slate-900 dark:text-white text-xs">Analytics (Future)</p>
                <span className="text-[10px] bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 font-semibold px-2 py-0.5 rounded-full">Not Active</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-neutral-400">We do not currently use web analytics. If we add analytics in the future, we will seek your explicit consent before enabling them and update this policy.</p>
            </div>

          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">3. How to Manage Your Consent</h2>
          <p className="mb-3 text-slate-700 dark:text-neutral-300">
            You can withdraw or change your consent at any time:
          </p>
          <button
            onClick={clearConsent}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white text-sm font-bold active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-xs"
          >
            Reset Cookie Preferences
          </button>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2">
            This will reload the page and show the consent banner again.
          </p>
          <p className="mt-3 text-slate-700 dark:text-neutral-300">
            You can also block CDN requests entirely by using a browser extension like uBlock Origin,
            or by using a privacy-focused browser. Note that this may affect the appearance of the site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">4. Third-Party Services</h2>
          <p className="mb-2 text-slate-700 dark:text-neutral-300">
            Clicking WhatsApp links on this site opens WhatsApp, which is governed by Meta's privacy
            practices. We are not responsible for data collected by WhatsApp or Meta.
          </p>
          <p className="text-slate-700 dark:text-neutral-300">
            Food images on this site were generated using Google Stitch (AIDA service). Viewing these
            images may result in requests to Google's image CDN.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">5. Legal Basis (DPDPA 2023)</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            Under India's Digital Personal Data Protection Act 2023, we rely on your{" "}
            <strong className="text-slate-900 dark:text-white">consent</strong> for non-essential processing (future analytics)
            and <strong className="text-slate-900 dark:text-white">legitimate interest / functional necessity</strong> for
            essential CDN requests required to render the site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">6. Contact</h2>
          <p className="text-slate-700 dark:text-neutral-300">
            Questions about our cookie practices? Contact our Grievance Officer at{" "}
            <span className="text-amber-700 dark:text-amber-300 font-mono">grievance@kookduku.com [REPLACE]</span> or see our{" "}
            <span className="text-[#C0392B] dark:text-[#FF535A] font-semibold underline">Privacy Policy</span> for full contact details.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
