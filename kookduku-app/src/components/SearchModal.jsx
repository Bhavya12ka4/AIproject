import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { MENU_ITEMS } from "../data/menuData";
import { useCart } from "../context/CartContext";

export default function SearchModal({ isOpen, onClose }) {
  const [searchInput, setSearchInput] = useState("");
  const [dietary, setDietary] = useState("ALL"); // ALL | VEG | NON_VEG
  const inputRef = useRef(null);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    } else {
      setSearchInput("");
      setDietary("ALL");
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    const words = q ? q.split(/\s+/).filter(Boolean) : [];

    return MENU_ITEMS.filter((dish) => {
      if (dietary === "VEG" && !dish.isVeg) return false;
      if (dietary === "NON_VEG" && dish.isVeg) return false;

      if (words.length > 0) {
        const target = `${dish.name} ${dish.category} ${dish.description || ""} ${dish.tag || ""}`.toLowerCase();
        return words.every((w) => target.includes(w));
      }
      return true;
    });
  }, [searchInput, dietary]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search all dishes"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 p-3"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#181818] border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden mt-3 animate-in slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Search Input & Close */}
        <div className="p-3.5 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2 bg-white dark:bg-[#181818]">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
              search
            </span>
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search 144 dishes, biryanis, tikkas..."
              className="w-full bg-[#F8F9FA] dark:bg-neutral-800/90 border border-gray-200 dark:border-neutral-700 focus:border-[#C0392B] text-gray-900 dark:text-white placeholder:text-gray-400 rounded-xl pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/20 transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center active:scale-95 transition-all"
            aria-label="Close search modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Dietary Filters Pill Strip */}
        <div className="px-3.5 py-2.5 border-b border-gray-200 dark:border-neutral-800 bg-[#F8F9FA] dark:bg-[#141414] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setDietary("ALL")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                dietary === "ALL"
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700 hover:border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietary("VEG")}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                dietary === "VEG"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border border-gray-200 dark:border-neutral-700 hover:border-emerald-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Veg
            </button>
            <button
              onClick={() => setDietary("NON_VEG")}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                dietary === "NON_VEG"
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "bg-white dark:bg-neutral-800 text-red-700 dark:text-red-400 border border-gray-200 dark:border-neutral-700 hover:border-red-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B] inline-block" />
              Non-Veg
            </button>
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
            {searchResults.length} {searchResults.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#F8F9FA] dark:bg-[#121212] no-scrollbar">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2 text-gray-300 dark:text-neutral-600">search_off</span>
              <p className="text-sm text-gray-900 dark:text-white font-bold mb-1">No matching dishes</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Try searching for chicken, biryani, mutton, or roti.</p>
            </div>
          ) : (
            searchResults.map((dish) => {
              const displayPrice = typeof dish.price === "number" ? `₹${dish.price}` : dish.price;
              const qty = cart[dish.id]?.qty || 0;

              return (
                <div
                  key={dish.id}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#1E1E1E] hover:bg-gray-50/80 dark:hover:bg-[#252525] border border-gray-200 dark:border-neutral-800 flex items-center justify-between gap-3 transition-colors shadow-sm"
                >
                  <Link
                    to={`/dish/${dish.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 flex-1 min-w-0 group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800 flex-shrink-0 border border-gray-200 dark:border-neutral-700">
                      {dish.image ? (
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined text-base">restaurant</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full inline-block flex-shrink-0 ${
                            dish.isVeg ? "bg-emerald-600" : "bg-[#C0392B]"
                          }`}
                        />
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-[#C0392B] transition-colors">
                          {dish.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {dish.category} • {dish.portion || "Standard"}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="text-xs font-extrabold text-gray-900 dark:text-white whitespace-nowrap">{displayPrice}</span>
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => addToCart(dish)}
                        className="px-2.5 py-1 rounded-lg bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-extrabold active:scale-90 transition-transform shadow-sm"
                        aria-label={`Add ${dish.name} to cart`}
                      >
                        + ADD
                      </button>
                    ) : (
                      <div
                        role="group"
                        aria-label={`Quantity selector for ${dish.name}`}
                        className="h-7 bg-white dark:bg-neutral-800 border border-[#C0392B] rounded-lg flex items-center justify-between px-1 shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => removeFromCart(dish.id)}
                          aria-label={`Decrease ${dish.name} quantity`}
                          className="w-5 h-5 flex items-center justify-center text-[#C0392B] hover:text-red-700 active:scale-75 transition-transform font-bold text-xs"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold text-gray-900 dark:text-white px-1.5 min-w-[16px] text-center" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(dish)}
                          aria-label={`Increase ${dish.name} quantity`}
                          className="w-5 h-5 flex items-center justify-center text-[#C0392B] hover:text-red-700 active:scale-75 transition-transform font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
