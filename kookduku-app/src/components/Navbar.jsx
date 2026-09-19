import React from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

/**
 * Navbar — Sticky top brand header with cart trigger and theme switcher.
 * Clean, compact, WCAG AA compliant across both White-Gray and Dark themes.
 */
export default function Navbar() {
  const { totalItems, grandTotal, openCheckout } = useCart();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      {/* ── Skip to Main Content (Accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary-container focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-label-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className="sticky top-0 z-50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-2xl px-space-md pt-3 pb-3 w-full shadow-sm dark:shadow-[0_22px_48px_-6px_rgba(0,0,0,0.95)] border-b border-gray-200 dark:border-neutral-800 transition-all duration-200"
      >
        {/* Brand Logo + Theme Switcher + Cart Badge */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              aria-hidden="true"
            >
              <img
                src="/logo.png"
                alt="Kook Du Ku Curries Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-headline-lg font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                Kook Du Ku Curries
              </h1>
              <p className="text-label-sm font-semibold text-amber-600 dark:text-amber-400 tracking-wide mt-0.5">
                The Flavours Always Follows!
              </p>
            </div>
          </div>

          {/* Right Actions: Theme Toggle & Cart Pill */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button (Light/Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-700 dark:text-yellow-400 active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Cart Pill Badge */}
            <button
              onClick={openCheckout}
              aria-label={`Shopping cart: ${totalItems} items, total ₹${grandTotal}. Tap to view cart.`}
              aria-live="polite"
              className="flex items-center gap-1.5 bg-[#C0392B] hover:bg-[#A93226] text-white px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(192,57,43,0.35)] dark:shadow-[0_4px_16px_rgba(185,28,28,0.5)] active:scale-95 transition-transform duration-150 cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container"
            >
              <span className="material-symbols-outlined text-base text-white" aria-hidden="true">shopping_bag</span>
              <span className="text-label-md font-bold text-white tracking-tight" aria-hidden="true">
                {totalItems} • ₹{grandTotal}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
