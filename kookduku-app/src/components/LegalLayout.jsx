import React from "react";
import { Link } from "react-router-dom";

/**
 * LegalLayout — Shared wrapper for all legal/policy pages.
 * Provides consistent header with back button, dark background, and footer links.
 */
export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#131313] text-gray-900 dark:text-neutral-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-[#1A1A1A] min-h-screen flex flex-col border-x border-gray-200 dark:border-neutral-800 shadow-sm">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Go back to main page"
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 flex items-center justify-center active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span className="material-symbols-outlined text-slate-800 dark:text-white text-xl" aria-hidden="true">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h1>
              {lastUpdated && (
                <p className="text-xs text-slate-500 dark:text-neutral-400">Last updated: {lastUpdated}</p>
              )}
            </div>
          </div>
          <Link to="/" aria-label="Go to Kook Du Ku home" className="w-9 h-9 flex items-center justify-center flex-shrink-0 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
            <img src="/logo.png" alt="Kook Du Ku" className="w-full h-full object-contain" />
          </Link>
        </header>

        {/* ── Content ── */}
        <main className="flex-1 px-4 py-6 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
          {children}
        </main>

        {/* ── Footer Links ── */}
        <nav aria-label="Legal pages" className="px-4 py-4 border-t border-gray-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#141414]">
          <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Other Legal Pages:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
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
      </div>
    </div>
  );
}
