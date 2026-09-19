import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/**
 * DietaryDot — Veg (green square + circle) or Non-Veg (red square + triangle).
 */
function DietaryDot({ isVeg }) {
  const label = isVeg ? "Vegetarian" : "Non-vegetarian";
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className={`w-3.5 h-3.5 border rounded-[3px] flex items-center justify-center p-[2px] flex-shrink-0 ${
        isVeg ? "border-emerald-500" : "border-[#E23744]"
      }`}
    >
      {isVeg ? (
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      ) : (
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-[#E23744]" />
      )}
    </div>
  );
}

/**
 * FoodCard — Modern, informative dish card with rich details and appetizing imagery.
 * Displays dish name, price, portion, description, dietary dot, chef special / spice tags,
 * and an enlarged thumbnail with quick-action ADD / quantity stepper.
 */
export default function FoodCard({ item }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartEntry = cart[item.id];
  const qty = cartEntry ? cartEntry.qty : 0;

  const displayPrice = typeof item.price === "number" ? `₹${item.price}` : item.price;

  const decreaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(item.id);
  };

  const increaseQty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };

  // Badge label helper
  const badgeLabel = typeof item.badge === "string" ? item.badge : item.badge?.label;

  return (
    <Link
      to={`/dish/${item.id}`}
      aria-label={`View details for ${item.name}, ${displayPrice}`}
      className="group block bg-white dark:bg-[#1E1E1E] hover:bg-slate-50/80 dark:hover:bg-[#252525] border border-gray-200/90 dark:border-white/10 hover:border-[#C0392B]/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md active:scale-[0.99] transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3.5 sm:gap-4">
        {/* ── Left Column: Meta, Title, Description, Price ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[96px] sm:min-h-[112px]">
          <div>
            {/* Top Meta: Dietary dot + Badge / Tag + Spice */}
            <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
              <DietaryDot isVeg={item.isVeg} />

              {badgeLabel ? (
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-[#C0392B] border border-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40 flex items-center gap-1">
                  <span>★</span>
                  <span>{badgeLabel}</span>
                </span>
              ) : item.tag ? (
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-200/70 dark:border-amber-800/30">
                  {item.tag}
                </span>
              ) : null}

              {item.spice && item.spice > 0 ? (
                <span
                  className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center"
                  title={`Spice level: ${item.spice}/4`}
                  aria-label={`Spice level: ${item.spice} out of 4`}
                >
                  {"🌶️".repeat(Math.min(item.spice, 3))}
                </span>
              ) : null}
            </div>

            {/* Dish Title */}
            <h3 className="text-[15px] sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-[#C0392B] transition-colors leading-snug line-clamp-1">
              {item.name}
            </h3>

            {/* Dish Description */}
            {item.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Bottom Row: Price, Portion & Details Link */}
          <div className="flex items-center gap-2 mt-2 pt-1 border-t border-gray-100 dark:border-white/5">
            <span className="text-base font-extrabold text-gray-900 dark:text-white">
              {displayPrice}
            </span>

            {item.portion && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                • {item.portion}
              </span>
            )}

            <span className="text-[11px] text-gray-400 dark:text-gray-500 group-hover:text-[#C0392B] font-medium flex items-center gap-0.5 ml-auto transition-colors">
              <span>Details</span>
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            </span>
          </div>
        </div>

        {/* ── Right Column: Enlarged Thumbnail + Floating Add Button ── */}
        <div className="flex flex-col items-center flex-shrink-0 w-24 sm:w-28 pt-0.5">
          {/* Taller Image Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800 border border-gray-200/80 dark:border-white/10 shadow-inner">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-neutral-800 text-slate-400">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
            )}
          </div>

          {/* Floating CTA — ADD button or Stepper */}
          <div
            className="-mt-3.5 sm:-mt-4 z-10 w-20 sm:w-24 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {qty === 0 ? (
              <button
                onClick={increaseQty}
                aria-label={`Add ${item.name} to cart`}
                className="w-full h-7 sm:h-7.5 px-2 bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21] text-white text-[11px] sm:text-xs font-black rounded-lg shadow-[0_2px_8px_rgba(192,57,43,0.35)] flex items-center justify-center gap-0.5 active:scale-95 transition-all tracking-wider focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <span className="material-symbols-outlined text-xs font-bold" aria-hidden="true">add</span>
                <span>ADD</span>
              </button>
            ) : (
              <div
                role="group"
                aria-label={`Quantity selector for ${item.name}`}
                className="w-full h-7 sm:h-7.5 bg-white dark:bg-neutral-800 border-2 border-[#C0392B] rounded-lg flex items-center justify-between px-1.5 shadow-md"
              >
                <button
                  onClick={decreaseQty}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="text-[#C0392B] hover:text-red-700 active:scale-75 transition-transform font-bold text-sm px-1 leading-none"
                >
                  −
                </button>
                <span className="text-xs font-black text-gray-900 dark:text-white px-0.5" aria-live="polite">
                  {qty}
                </span>
                <button
                  onClick={increaseQty}
                  aria-label={`Increase ${item.name} quantity`}
                  className="text-[#C0392B] hover:text-red-700 active:scale-75 transition-transform font-bold text-sm px-1 leading-none"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
