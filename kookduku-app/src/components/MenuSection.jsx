import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import { useCart } from "../context/CartContext";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";

/**
 * MenuSection — Complete, interactive menu featuring all items from
 * the official Kook Du Ku Curries restaurant menu PDF.
 *
 * Supports:
 * - Category filtering (10 categories matching PDF)
 * - Veg / Non-Veg dietary toggle filter
 * - Real-time keyword search query with 1s delay and top suggestions
 * - Item count indicators
 * - FSSAI mandatory energy declaration & legal disclosures
 */
export default function MenuSection({ searchQuery = "", onSearchChange }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [dietaryFilter, setDietaryFilter] = useState("ALL"); // "ALL" | "VEG" | "NON_VEG"

  // Search button state & debounce
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync external search query
  useEffect(() => {
    setLocalSearchInput(searchQuery);
    setDebouncedSearchQuery(searchQuery);
    if (searchQuery) setIsSearchOpen(true);
  }, [searchQuery]);

  // 1-second delay (debounce) on search change
  useEffect(() => {
    if (!localSearchInput.trim()) {
      setDebouncedSearchQuery("");
      if (onSearchChange) onSearchChange("");
      setIsDebouncing(false);
      setShowSuggestions(false);
      return;
    }

    setIsDebouncing(true);
    const timer = setTimeout(() => {
      const val = localSearchInput.trim();
      setDebouncedSearchQuery(val);
      if (onSearchChange) onSearchChange(val);
      setIsDebouncing(false);
      setShowSuggestions(true);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer);
  }, [localSearchInput, onSearchChange]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Top suggestions for dropdown
  const topPossibleItems = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);
    return MENU_ITEMS.filter((item) => {
      const searchTarget = `${item.name} ${item.category} ${item.description || ""} ${item.tag || ""}`.toLowerCase();
      return words.every((w) => searchTarget.includes(w));
    });
  }, [debouncedSearchQuery]);

  const handleClearSearch = () => {
    setLocalSearchInput("");
    setDebouncedSearchQuery("");
    if (onSearchChange) onSearchChange("");
    setShowSuggestions(false);
  };

  // Filter menu items by active category, search query, and dietary preference
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryWords = query ? query.split(/\s+/).filter(Boolean) : [];

    return MENU_ITEMS.filter((item) => {
      // Dietary filter
      if (dietaryFilter === "VEG" && !item.isVeg) return false;
      if (dietaryFilter === "NON_VEG" && item.isVeg) return false;

      // When a search query is active, search globally across all fields
      if (queryWords.length > 0) {
        const searchableText = `${item.name} ${item.category} ${item.description || ""} ${item.tag || ""} ${item.portion || ""}`.toLowerCase();
        return queryWords.every((word) => searchableText.includes(word));
      }

      // When no search query, filter by selected category
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <main id="main-content" className="flex-1 px-space-md mt-1">
      {/* ── Dietary Quick Filter (All / Veg / Non-Veg) + Search Button ── */}
      <div className="relative mt-3 mb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Dietary Toggle Filter */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#1E1E1E] p-1 rounded-lg border border-gray-200 dark:border-neutral-800 text-xs shadow-sm">
            <button
              onClick={() => setDietaryFilter("ALL")}
              aria-pressed={dietaryFilter === "ALL"}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                dietaryFilter === "ALL"
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter("VEG")}
              aria-pressed={dietaryFilter === "VEG"}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-bold transition-all ${
                dietaryFilter === "VEG"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Veg
            </button>
            <button
              onClick={() => setDietaryFilter("NON_VEG")}
              aria-pressed={dietaryFilter === "NON_VEG"}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-bold transition-all ${
                dietaryFilter === "NON_VEG"
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "text-gray-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E23744] inline-block" />
              Non-Veg
            </button>
          </div>

          {/* Right: Search Toggle Button + Dish Count */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                if (!isSearchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 50);
                }
              }}
              aria-label={isSearchOpen ? "Close dish search" : "Open dish search"}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border active:scale-95 ${
                isSearchOpen || searchQuery.trim()
                  ? "bg-[#C0392B] text-white border-[#C0392B] shadow-md shadow-[#C0392B]/30"
                  : "bg-white dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-800 dark:text-neutral-200 border-gray-200 dark:border-neutral-700 shadow-sm"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {isSearchOpen ? "close" : "search"}
              </span>
              <span className="text-label-sm">{isSearchOpen ? "Close" : "Search"}</span>
            </button>

            <span
              className="text-label-sm bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-neutral-700 px-2.5 py-1 rounded-full text-gray-700 dark:text-neutral-300 font-medium whitespace-nowrap shadow-sm"
              aria-label={`${filteredItems.length} dishes showing`}
            >
              {filteredItems.length} dishes
            </span>
          </div>
        </div>

        {/* ── Expandable Search Bar with 1-second delay & Top Possible Items ── */}
        {isSearchOpen && (
          <div className="mt-2.5 relative z-40 animate-in fade-in slide-in-from-top-1 duration-150" ref={dropdownRef}>
            <div className="relative w-full">
              <label htmlFor="menu-search-input" className="sr-only">Search dishes</label>
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none"
                aria-hidden="true"
              >
                search
              </span>

              <input
                ref={searchInputRef}
                id="menu-search-input"
                type="text"
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                onFocus={() => {
                  if (localSearchInput.trim()) setShowSuggestions(true);
                }}
                placeholder="Search biryanis, gravies, tandoor, rotis..."
                autoComplete="off"
                className="w-full bg-input-bg border border-app-border text-on-surface placeholder:text-outline/70 rounded-xl pl-10 pr-20 py-2.5 text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container shadow-md"
              />

              {/* Status Indicator / Actions */}
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isDebouncing && (
                  <span
                    title="Searching in 1s..."
                    className="w-4 h-4 border-2 border-primary-container border-t-transparent rounded-full animate-spin"
                    aria-label="Searching..."
                  />
                )}

                {localSearchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search input"
                    className="w-5 h-5 rounded-full bg-surface-container-highest hover:bg-surface-bright flex items-center justify-center text-outline hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Top Suggestions Dropdown */}
            {showSuggestions && debouncedSearchQuery.trim() && (
              <div
                role="listbox"
                aria-label="Possible items found"
                className="absolute left-0 right-0 top-full mt-2 bg-white/98 dark:bg-[#1C1C1C]/98 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in duration-150 max-h-[360px] flex flex-col"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200 dark:border-neutral-700 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold">
                    <span className="material-symbols-outlined text-sm text-[#C0392B]">auto_awesome</span>
                    <span>Possible Dishes ({topPossibleItems.length})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSuggestions(false)}
                    className="text-[11px] text-slate-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white underline font-semibold"
                  >
                    Close
                  </button>
                </div>

                {topPossibleItems.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500 dark:text-neutral-400">
                    No dishes match "<strong>{debouncedSearchQuery}</strong>"
                  </div>
                ) : (
                  <div className="overflow-y-auto space-y-1.5 pr-1 no-scrollbar flex-1">
                    {topPossibleItems.slice(0, 5).map((dish) => {
                      const displayPrice =
                        typeof dish.price === "number" ? `₹${dish.price}` : dish.price;
                      return (
                        <div
                          key={dish.id}
                          className="group p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 flex items-center justify-between gap-2.5 transition-colors"
                        >
                          <Link
                            to={`/dish/${dish.id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-2 flex-1 min-w-0"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 dark:bg-neutral-700 flex-shrink-0 border border-gray-200 dark:border-white/5">
                              {dish.image ? (
                                <img
                                  src={dish.image}
                                  alt={dish.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <span className="material-symbols-outlined text-sm">restaurant</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-[#C0392B] transition-colors">
                                {dish.name}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                                {dish.category} • {dish.portion || "Standard"}
                              </p>
                            </div>
                          </Link>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">
                              {displayPrice}
                            </span>
                            <button
                              type="button"
                              onClick={() => addToCart(dish)}
                              aria-label={`Add ${dish.name} to cart`}
                              className="px-2 py-0.5 rounded-lg bg-red-50 hover:bg-[#C0392B] text-[#C0392B] hover:text-white border border-red-200 text-xs font-bold transition-all active:scale-90"
                            >
                              + ADD
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Active Search Banner ── */}
      {searchQuery.trim() && (
        <div className="flex items-center justify-between bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-red-900/40 px-3 py-2 rounded-xl mt-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-900 dark:text-white">
            <span className="material-symbols-outlined text-base text-[#C0392B]">search</span>
            <span>
              Found <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? "dish" : "dishes"} for "<strong>{searchQuery}</strong>"
            </span>
          </div>
          {onSearchChange && (
            <button
              onClick={() => onSearchChange("")}
              className="text-xs text-[#C0392B] dark:text-[#FF535A] hover:text-red-800 underline font-bold px-1.5 py-0.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C0392B]"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* ── 5 FEATURED MAIN SECTIONS CARDS (Displayed on Main Page) ── */}
      {!searchQuery.trim() && (
        <div className="mt-3 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-title-md font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Explore Kitchen Sections</span>
            </h2>
            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="text-xs text-primary hover:text-red-700 font-bold flex items-center gap-0.5"
              >
                <span>View Full Menu</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                slug: "tandoor",
                title: "Smokey Tandoor",
                subtitle: "Tikkas, Kababs & Crispy Bites",
                icon: "🍢",
                count: 16,
                image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=500&auto=format&fit=crop&q=80",
              },
              {
                slug: "curries",
                title: "Special Curries",
                subtitle: "Handi, Champaran & North Indian",
                icon: "🥘",
                count: 40,
                image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80",
              },
              {
                slug: "biryani",
                title: "Dum Biryanis",
                subtitle: "Royal Dum Biryani, Pulav & Rice",
                icon: "🍚",
                count: 19,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlR2oL1UOOWEFKPoML8JiwK9yNQOyWytrRb9VHvHMSm7v5W9Nta0QDMHgsWYo2nCja9Ig8LE9hNOtN4klsTtitOsYM-4b-jbAVeggTEf4VhwF59ZN1tosM4A8_a6RjNfvVNiJ5QqZJVI7Camvfi39W2Aoerobu1gRnQuDIvYNAY5zhycJU192TdgXyAUsQQ759P-5k2c4_x3Ev-FaxDBNDXULgSLzw9X4GkRjxQbP7tZS2xMyONyw1oKbMyA9W1ffrCJCx89XT3Tc",
              },
              {
                slug: "thalis",
                title: "Thalis & Combos",
                subtitle: "Full Thalis, Bowls & Meal Combos",
                icon: "🍱",
                count: 30,
                image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80",
              },
              {
                slug: "rotis-extras",
                title: "Rotis & Extras",
                subtitle: "Breads, Chinese Wok, Rassa & Drinks",
                icon: "🫓",
                count: 39,
                image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format&fit=crop&q=80",
                fullWidthMobile: true,
              },
            ].map((sec) => (
              <Link
                key={sec.slug}
                to={`/section/${sec.slug}`}
                className={`group relative overflow-hidden rounded-2xl border text-left p-3.5 flex flex-col justify-end transition-all duration-200 active:scale-[0.98] border-app-border hover:border-primary/40 bg-surface-container shadow-sm hover:shadow-md h-36 sm:h-40 md:h-44 ${
                  sec.fullWidthMobile ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                {/* Natural Food Photography */}
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Light black gradient at the bottom only for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl drop-shadow-md">{sec.icon}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-md bg-black/60 text-white/90 border border-white/10 flex items-center gap-0.5 group-hover:bg-primary-container transition-colors">
                      <span>{sec.count} Dishes</span>
                      <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug drop-shadow-md group-hover:text-primary-container transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 drop-shadow">
                    {sec.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── ACTIVE SECTION HEADING & DISHES LIST ── */}
      <div id="active-section-view" className="scroll-mt-24">
        {!searchQuery.trim() && (
          <div className="flex items-center justify-between mt-2 mb-3 pb-2 border-b border-app-border">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-xl">
                {activeCategory === "All"
                  ? "🍲"
                  : activeCategory.includes("Tandoor")
                  ? "🍢"
                  : activeCategory.includes("Curries")
                  ? "🥘"
                  : activeCategory.includes("Biryani")
                  ? "🍚"
                  : activeCategory.includes("Thali")
                  ? "🍱"
                  : activeCategory.includes("Roti")
                  ? "🫓"
                  : activeCategory.includes("Chinese")
                  ? "🥢"
                  : "🍽️"}
              </span>
              <div>
                <h2 className="text-headline-md font-extrabold text-gray-900 dark:text-white">
                  {activeCategory === "All" ? "Full Kitchen Menu" : activeCategory}
                </h2>
                <p className="text-[11px] text-gray-500 dark:text-outline">
                  Showing {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"}
                </p>
              </div>
            </div>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700 text-xs text-[#C0392B] dark:text-[#FF535A] hover:text-red-800 font-bold flex items-center gap-1 transition-colors active:scale-95 shadow-xs"
              >
                <span>View All</span>
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        )}

        {/* ── Empty State ── */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 px-4 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 my-4 shadow-xs">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
              search_off
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {searchQuery.trim() ? `No dishes found for "${searchQuery}"` : "No dishes found"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-neutral-400 mb-4">
              {searchQuery.trim()
                ? "Try searching for another dish, curry, biryani, or starter."
                : "Try adjusting your category or dietary filter."}
            </p>
            <button
              onClick={() => {
                if (onSearchChange) onSearchChange("");
                setActiveCategory("All");
                setDietaryFilter("ALL");
              }}
              className="px-4 py-2 bg-[#C0392B] text-white text-xs font-bold rounded-xl active:scale-95 shadow-sm"
            >
              {searchQuery.trim() ? "Clear Search & View All" : "Reset Filters"}
            </button>
          </div>
        )}

        {/* ── Food Cards List ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4" role="list" aria-label="Menu items">
          {filteredItems.map((item) => (
            <div role="listitem" key={item.id} className="h-full">
              <FoodCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Pricing Transparency Note (CCPA Anti-Drip Pricing) ── */}
      <p className="text-[10px] text-outline mt-4 mb-4 leading-relaxed">
        All prices in ₹ (Indian Rupees) as stated in the official menu.
        Final charges including packaging and delivery will be confirmed via WhatsApp before payment.
      </p>
    </main>
  );
}
