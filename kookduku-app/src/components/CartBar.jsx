import React from "react";
import { useCart } from "../context/CartContext";

/**
 * CartBar — Persistent floating bottom cart bar.
 * Reads totalItems and grandTotal directly from CartContext.
 * Clicking Checkout opens the interactive CheckoutModal with WhatsApp routing.
 */
export default function CartBar() {
  const { totalItems, grandTotal, openCheckout } = useCart();

  if (totalItems === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-[68px] left-0 right-0 z-40 px-4 max-w-md sm:max-w-xl mx-auto pointer-events-none"
    >
      <button
        onClick={openCheckout}
        aria-label={`${totalItems} ${totalItems === 1 ? "item" : "items"} in cart, ₹${grandTotal}. Tap to checkout.`}
        className="pointer-events-auto w-full bg-gradient-to-r from-[#CB202D] to-[#B91C1C] rounded-2xl p-3 px-4 shadow-[0_10px_28px_rgba(185,28,28,0.55)] border border-white/15 flex items-center justify-between backdrop-blur-md active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {/* ── Left: Cart Info ── */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center text-white" aria-hidden="true">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">shopping_cart</span>
          </div>
          <div className="text-left">
            <div
              className="font-extrabold text-white flex items-center gap-1.5"
              style={{ fontSize: "19px", lineHeight: "26px" }}
            >
              <span>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
              <span className="text-white/60 font-normal" aria-hidden="true">|</span>
              <span>₹{grandTotal}</span>
            </div>
            <p className="text-label-sm text-white/80 font-medium">
              View bill &amp; order on WhatsApp
            </p>
          </div>
        </div>

        {/* ── Right: Checkout Pill (visual only) ── */}
        <span
          aria-hidden="true"
          className="bg-white text-[#92001C] text-label-lg font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1 flex-shrink-0"
        >
          <span>Checkout</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </span>
      </button>
    </div>
  );
}
