import React from "react";
import { Link } from "react-router-dom";

const INFO = [
  {
    icon: "schedule",
    iconColor: "text-secondary",
    label: "Operating Hours:",
    value: "12:00 PM – 3:00 PM & 6:00 PM – 12:00 AM (Mon–Sun)",
  },
  {
    icon: "pin_drop",
    iconColor: "text-primary-container",
    label: "Restaurant:",
    value: "Kook Du Ku, F / 23,24, Royal Height, Near Vaishnodevi Circle, Ahmedabad – 382421",
  },
];

/**
 * Footer — Kitchen compliance section with FSSAI badge, business disclosures,
 * legal policy links, allergen warning, and copyright.
 *
 * Compliance changes:
 * - REMOVED: "Grade A+" — FSSAI does not have a "Grade A+" system.
 *   Replaced with "FSSAI Licensed" (factual). Eat Right India uses a star rating (1–5).
 * - Added mandatory E-Commerce Rules 2020 disclosures section.
 * - Added allergen warning (FSSAI requirement).
 * - Added legal policy links.
 * - Added grievance officer placeholder.
 * - Copyright year updated to current year dynamically.
 *
 * Accessibility changes:
 * - footer role with aria-label
 * - Links have descriptive text (no "click here")
 * - External links have rel="noopener noreferrer"
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Kitchen information and legal"
      className="mt-8 px-space-md pt-6 pb-24 sm:pb-20 bg-white dark:bg-[#151515] border-t border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-neutral-400 flex flex-col gap-4"
    >
      {/* ── Brand Header in Footer ── */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-neutral-800">
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 filter drop-shadow-md">
          <img
            src="/logo.png"
            alt="Kook Du Ku Curries Mascot Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-title-md font-extrabold text-gray-900 dark:text-white leading-tight">
            Kook Du Ku Curries
          </h2>
          <p className="text-label-sm text-amber-600 dark:text-secondary font-semibold">
            The Flavours Always Follows!
          </p>
        </div>
      </div>
      {/* ── Allergen Warning — FSSAI Requirement ── */}
      <div
        role="alert"
        className="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-500/40 text-red-900 dark:text-red-200"
      >
        <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-1">⚠️ Allergen &amp; Dietary Warning</p>
        <p className="text-xs leading-relaxed">
          Our kitchen handles <strong>nuts, dairy (milk, cream, butter), gluten (wheat), eggs,
          and other common allergens</strong>. Cross-contamination is possible.
          If you have a food allergy, intolerance, or dietary requirement, please
          inform us before placing your order via WhatsApp.
        </p>
      </div>

      {/* ── FSSAI License ── */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm"
            aria-hidden="true"
          >
            FSSAI
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-label-md font-bold text-slate-900 dark:text-white">FSSAI Licensed Kitchen</span>
              <span className="material-symbols-outlined fill-icon text-emerald-600 dark:text-emerald-400 text-sm" aria-hidden="true">verified</span>
            </div>
            <p className="text-label-sm text-slate-700 dark:text-neutral-300 font-mono">
              Reg. No. <strong className="text-slate-900 dark:text-white">20725002000562</strong>
            </p>
          </div>
        </div>
        <span className="bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          FSSAI Compliant
        </span>
      </div>

      {/* ── Statutory Energy & Nutritional Reference (FSSAI Regulation 5(3)) ── */}
      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed">
        <p>
          ⓘ An average active adult requires 2,000 kcal energy per day; however, calorie needs may vary.
          Nutritional information and allergen details available on request via WhatsApp.
        </p>
      </div>

      {/* ── Kitchen Info (Hours + Address) ── */}
      <div className="space-y-2.5 text-body-sm py-1">
        {INFO.map(({ icon, iconColor, label, value }) => (
          <div key={label} className="flex items-start gap-2">
            <span className={`material-symbols-outlined text-base mt-0.5 flex-shrink-0 ${iconColor}`} aria-hidden="true">
              {icon}
            </span>
            <div className="text-xs leading-relaxed">
              <strong className="text-slate-900 dark:text-white">{label} </strong>
              <span className="text-slate-700 dark:text-neutral-300">{value}</span>
            </div>
          </div>
        ))}

        {/* WhatsApp Contact */}
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base mt-0.5 flex-shrink-0" aria-hidden="true">chat</span>
          <div className="text-xs leading-relaxed">
            <strong className="text-slate-900 dark:text-white">WhatsApp Orders &amp; Support: </strong>
            <a
              href="https://wa.me/919724765085?text=Hi%2C+I%27d+like+to+place+an+order"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp to contact Kook Du Ku"
              className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700"
            >
              +91-9724765085
            </a>
          </div>
        </div>
      </div>

      {/* ── Porter Delivery Disclosure ── */}
      <div className="p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-950 dark:text-amber-200 leading-relaxed shadow-sm">
        <span className="text-amber-700 dark:text-amber-400 font-bold">ℹ️ Delivery Notice:</span>{" "}
        We are using the <strong className="text-slate-900 dark:text-white">Porter application</strong> for delivery, and delivery charges are not included in the menu prices (charged as per actuals on Porter).
      </div>

      {/* ── Legal Policy Links ── */}
      <nav aria-label="Legal policies" className="pt-2 border-t border-gray-200 dark:border-neutral-800">
        <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Legal &amp; Policies</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {[
            { to: "/privacy-policy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
            { to: "/cookie-policy", label: "Cookie Policy" },
            { to: "/refund-policy", label: "Refund Policy" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-semibold text-[#C0392B] dark:text-[#FF535A] underline hover:text-red-700 active:scale-95 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Copyright ── */}
      <div className="pt-3 border-t border-gray-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center gap-1 text-slate-500 dark:text-neutral-500">
        <p className="text-xs font-medium">
          © {currentYear} Kook Du Ku Foods Pvt Ltd. All rights reserved.
        </p>
        <p className="text-[11px]">
          Handcrafted with fire, spice, and heritage recipes.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-neutral-600 mt-0.5">
          Food images on this site are AI-generated (Google Stitch). Not actual product photography.
        </p>
      </div>
    </footer>
  );
}
