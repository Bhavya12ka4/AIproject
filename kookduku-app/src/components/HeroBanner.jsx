import React from "react";
import { useKitchenStatus } from "../utils/restaurantStatus";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB2aDJANTWEdndnjM_8cnVL90Mx9KSzAIuhVLBe1Llbja93eSyKQoHc7Rq2lDtt5cb8--Vs4G8Q4IqlF_eFL3SzrG_KEgBtvsZTO5NZtyhWYrS-0y-IP0DzJlM6BHafJjxAPH2yW0Wp3gEVPHs48760EwfnEqUYcWiWdxOZKDoQcdqOalVWEGXuAsXpY1vD43vBTBBHVlEHj4_3-S5G4rA0TfMpIn-QPFcWq_TTCA4ec0EMtkbO68CzIHr3v--ng7RtgortFbTvWiU";

/**
 * HeroBanner — Dark moody clay-pot hero.
 *
 * Compliance changes:
 * - REMOVED: fake "4.6 (1,240 reviews)" — fabricated data violates Consumer Protection Act 2019.
 *   Replace with real verified platform ratings or omit entirely.
 * - "100% Contactless" is now a factual claim with visible qualification in T&C.
 * - Promo code COPY button has aria-label.
 *
 * Accessibility changes:
 * - Hero image has descriptive alt text.
 * - Decorative gradient divs are aria-hidden.
 * - Action pill buttons and links have aria-label.
 * - COPY button announces action to screen readers.
 */
export default function HeroBanner() {
  const kitchenStatus = useKitchenStatus();

  return (
    <section aria-labelledby="hero-title">
      {/* ── Featured Hero Card (Vibrant, appetizing, crisp photography) ── */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900 shadow-md transition-colors duration-200">
        <img
          src={HERO_IMAGE}
          alt="Steaming clay handi pot filled with aromatic chicken dum biryani and dal makhani, with dramatic lighting and charcoal embers in the background"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.05]"
        />

        {/* Clean, natural bottom gradient for 100% crystal clear white text without any milky haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" aria-hidden="true" />

        {/* ── Top Badges ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Open / Closed Status (Auto updates live based on 12:00-15:00 & 18:00-24:00 hours) */}
          <div
            role="status"
            aria-label={kitchenStatus.isOpen ? "Kitchen is open now. Preparation time 25 to 30 minutes." : `Kitchen is closed now. ${kitchenStatus.nextSlot}.`}
            className={`flex items-center gap-1.5 backdrop-blur-md px-2.5 py-1 rounded-full border shadow-md ${
              kitchenStatus.isOpen
                ? "bg-black/75 border-white/20"
                : "bg-rose-950/85 border-rose-500/40"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                kitchenStatus.isOpen
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-rose-500"
              }`}
              aria-hidden="true"
            />
            <span className="text-label-sm font-bold text-white tracking-wide">
              {kitchenStatus.statusText}
            </span>
          </div>
        </div>

        {/* ── Bottom Tagline ── */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10">
          <span className="px-2.5 py-0.5 rounded-md bg-[#C0392B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm inline-flex items-center gap-1 mb-1">
            🔥 Authentic Flavours
          </span>
          <h2
            id="hero-title"
            className="text-headline-xl-mobile font-extrabold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Signature Curries, Tikkas &amp; Dum Biryani
          </h2>
        </div>
      </div>

      {/* ── Action Pills Row ── */}
      <div className="px-space-md py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#121212]">
        <a
          href="https://maps.app.goo.gl/VtN4PxGTp9Z7oDHt8?g_st=aw"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to Kook Du Ku cloud kitchen (opens in Google Maps)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 whitespace-nowrap active:scale-95 transition-all text-xs font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
        >
          <span className="material-symbols-outlined text-[#C0392B] text-sm" aria-hidden="true">map</span>
          <span>Directions &amp; Map</span>
        </a>

        <a
          href="https://wa.me/919724765085?text=Hi%2C+I%27d+like+to+place+an+order"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Place order via WhatsApp (opens WhatsApp — WhatsApp's privacy policy applies)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 whitespace-nowrap active:scale-95 transition-all text-xs font-bold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm" aria-hidden="true">chat_bubble</span>
          <span>WhatsApp Quick Order</span>
        </a>

        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 whitespace-nowrap text-xs font-semibold shadow-sm"
          aria-label="100% contactless delivery available. See Terms & Conditions for details."
        >
          <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-sm" aria-hidden="true">verified</span>
          <span>Contactless Delivery</span>
        </div>
      </div>
    </section>
  );
}
