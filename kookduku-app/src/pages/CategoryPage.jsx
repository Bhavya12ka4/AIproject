import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MENU_ITEMS } from "../data/menuData";

export const SECTIONS_CONFIG = [
  {
    slug: "tandoor",
    name: "Smokey Tandoor & Starters",
    title: "Smokey Tandoor & Starters",
    subtitle: "Charcoal-grilled tikkas, seekh kababs, fish fry & crispy starters",
    icon: "🍢",
    image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=800&auto=format&fit=crop&q=80",
    categories: ["Smokey Tandoor & Starters"],
    subCategories: [
      { label: "All Starters", category: "ALL" },
      { label: "Tandoori Tikkas", tag: "Tandoor" },
      { label: "Crispy Fry Bites", tag: "Fry Bites" },
      { label: "Seafood Starters", tag: "Seafood" },
    ],
  },
  {
    slug: "curries",
    name: "Special Curries",
    title: "Special Curries & Gravies",
    subtitle: "Authentic Champaran, Handi, Mughlai & Rich Butter Curries",
    icon: "🥘",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
    categories: ["Special Curries", "North Indian Specials"],
    subCategories: [
      { label: "All Curries (40)", category: "ALL" },
      { label: "Special Curries (24)", category: "Special Curries" },
      { label: "North Indian / Paneer (16)", category: "North Indian Specials" },
    ],
  },
  {
    slug: "biryani",
    name: "Dum Biryanis & Rice",
    title: "Dum Biryanis & Rice",
    subtitle: "Royal dum biryanis, fragrant pulavs & fried rice bowls",
    icon: "🍚",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlR2oL1UOOWEFKPoML8JiwK9yNQOyWytrRb9VHvHMSm7v5W9Nta0QDMHgsWYo2nCja9Ig8LE9hNOtN4klsTtitOsYM-4b-jbAVeggTEf4VhwF59ZN1tosM4A8_a6RjNfvVNiJ5QqZJVI7Camvfi39W2Aoerobu1gRnQuDIvYNAY5zhycJU192TdgXyAUsQQ759P-5k2c4_x3Ev-FaxDBNDXULgSLzw9X4GkRjxQbP7tZS2xMyONyw1oKbMyA9W1ffrCJCx89XT3Tc",
    categories: ["Dum Biryanis & Rice"],
    subCategories: [
      { label: "All Biryani & Rice (19)", category: "ALL" },
      { label: "Dum Biryanis", match: (i) => i.name.toLowerCase().includes("biryani") },
      { label: "Pulavs & Steamed Rice", match: (i) => i.name.toLowerCase().includes("pulav") || i.name.toLowerCase().includes("rice") && !i.name.toLowerCase().includes("fried") },
      { label: "Fried Rice", match: (i) => i.name.toLowerCase().includes("fried") },
    ],
  },
  {
    slug: "thalis",
    name: "Thalis & Combos",
    title: "Thalis, Bowls & Meal Combos",
    subtitle: "Complete executive thalis, mini rice bowls & family parcel combos",
    icon: "🍱",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80",
    categories: ["Thalis & Rice Bowls", "Parcel Curries & Combos"],
    subCategories: [
      { label: "All Combos (30)", category: "ALL" },
      { label: "Full Thalis & Platters (7)", match: (i) => i.name.toLowerCase().includes("thali") || i.name.toLowerCase().includes("bati") },
      { label: "Curry Rice Bowls (8)", match: (i) => i.name.toLowerCase().includes("rice bowl") },
      { label: "Family Parcel Combos (15)", category: "Parcel Curries & Combos" },
    ],
  },
  {
    slug: "rotis-extras",
    name: "Rotis & Extras",
    title: "Breads, Chinese & Extras",
    subtitle: "Tandoori rotis, butters naans, Chinese noodles, rassa & drinks",
    icon: "🫓",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80",
    categories: ["Roti Corner", "Chinese Corner", "Extras & Drinks"],
    subCategories: [
      { label: "All Items (39)", category: "ALL" },
      { label: "Roti & Naan (9)", category: "Roti Corner" },
      { label: "Chinese Corner (16)", category: "Chinese Corner" },
      { label: "Drinks, Rassa & Dips (14)", category: "Extras & Drinks" },
    ],
  },
];

export default function CategoryPage({ onOpenSearch }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dietaryFilter, setDietaryFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState(0);

  // Reset tab and scroll to top when opening a section
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSubTab(0);
    setSearchQuery("");
  }, [slug]);

  // Find section configuration by slug
  const section = useMemo(() => {
    return SECTIONS_CONFIG.find(
      (s) => s.slug.toLowerCase() === (slug || "").toLowerCase()
    );
  }, [slug]);

  // Filter all items that belong to this section
  const sectionItems = useMemo(() => {
    if (!section) return [];
    return MENU_ITEMS.filter((item) => section.categories.includes(item.category));
  }, [section]);

  // Apply sub-category tab, dietary filter, and search
  const displayedItems = useMemo(() => {
    if (!section) return [];
    const currentSub = section.subCategories ? section.subCategories[activeSubTab] : null;
    const q = searchQuery.trim().toLowerCase();
    const words = q ? q.split(/\s+/).filter(Boolean) : [];

    return sectionItems.filter((item) => {
      // Subcategory filter
      if (currentSub && currentSub.category && currentSub.category !== "ALL") {
        if (item.category !== currentSub.category) return false;
      }
      if (currentSub && currentSub.tag) {
        if (item.tag !== currentSub.tag) return false;
      }
      if (currentSub && currentSub.match) {
        if (!currentSub.match(item)) return false;
      }

      // Dietary filter
      if (dietaryFilter === "VEG" && !item.isVeg) return false;
      if (dietaryFilter === "NON_VEG" && item.isVeg) return false;

      // Search keyword filter
      if (words.length > 0) {
        const text = `${item.name} ${item.description || ""} ${item.tag || ""} ${item.portion || ""}`.toLowerCase();
        return words.every((w) => text.includes(w));
      }
      return true;
    });
  }, [section, sectionItems, activeSubTab, dietaryFilter, searchQuery]);

  if (!section) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#131313] flex justify-center text-gray-900 dark:text-neutral-100">
        <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] min-h-screen p-6 flex flex-col items-center justify-center text-center shadow-md">
          <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-neutral-500 mb-3">category</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Section Not Found</h1>
          <p className="text-sm text-slate-600 dark:text-neutral-400 mb-6">
            The kitchen section you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#C0392B] text-white text-sm font-bold rounded-xl shadow-md active:scale-95 transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#131313] text-gray-900 dark:text-neutral-100 flex justify-center transition-colors duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-[#131313] min-h-screen flex flex-col relative shadow-xl overflow-x-hidden border-x border-gray-200 dark:border-neutral-800 pb-20 sm:pb-24">
        <Navbar />

        {/* ── Subpage Header with Back Navigation ── */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#151515]/95 backdrop-blur-md px-space-md py-3 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between shadow-xs">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-[#C0392B] font-bold text-sm active:scale-95 transition-transform"
            aria-label="Back to home page"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span>All Sections</span>
          </button>

          <span className="text-xs bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 px-2.5 py-1 rounded-full text-slate-800 dark:text-neutral-200 font-bold shadow-xs">
            {displayedItems.length} {displayedItems.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {/* ── Section Hero Header ── */}
        <header className="relative w-full h-44 overflow-hidden border-b border-gray-200 dark:border-neutral-800">
          <img
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Natural subtle dark gradient blend for hero typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-space-md flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl drop-shadow-md">{section.icon}</span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                KITCHEN SECTION
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md leading-tight">
              {section.title}
            </h1>
            <p className="text-xs text-white/85 line-clamp-2 mt-1 drop-shadow leading-relaxed">
              {section.subtitle}
            </p>
          </div>
        </header>

        {/* ── Sub-Category Tabs (for clean sub-division) ── */}
        {section.subCategories && section.subCategories.length > 1 && (
          <div className="px-space-md pt-3 pb-2 border-b border-gray-200 dark:border-neutral-800 bg-slate-50/80 dark:bg-[#181818] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {section.subCategories.map((sub, idx) => (
              <button
                key={sub.label}
                type="button"
                onClick={() => setActiveSubTab(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 active:scale-95 ${
                  activeSubTab === idx
                    ? "bg-[#C0392B] text-white shadow-sm"
                    : "bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white shadow-xs"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Filter & Search Toolbar ── */}
        <div className="px-space-md pt-3 pb-2 bg-white dark:bg-[#131313]">
          <div className="flex items-center justify-between gap-2">
            {/* Dietary Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#1E1E1E] p-1 rounded-lg border border-slate-200 dark:border-neutral-800 text-xs shadow-xs">
              <button
                onClick={() => setDietaryFilter("ALL")}
                aria-pressed={dietaryFilter === "ALL"}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  dietaryFilter === "ALL"
                    ? "bg-[#C0392B] text-white shadow-sm"
                    : "text-slate-700 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
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
                    : "text-slate-700 hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-400"
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
                    : "text-slate-700 hover:text-red-700 dark:text-neutral-400 dark:hover:text-red-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#E23744] inline-block" />
                Non-Veg
              </button>
            </div>

            {/* Quick Section Switcher */}
            <Link
              to="/"
              className="text-xs text-[#C0392B] dark:text-[#FF535A] hover:text-red-800 font-bold flex items-center gap-0.5 active:scale-95"
            >
              <span>Other Sections</span>
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
            </Link>
          </div>

          {/* Quick Search within this section */}
          <div className="relative mt-2.5">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-neutral-500 text-base pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${section.title}...`}
              className="w-full bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-neutral-700 focus:border-[#C0392B] text-gray-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C0392B] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Section Items List ── */}
        <main className="flex-1 px-space-md py-3 bg-white dark:bg-[#131313]">
          {displayedItems.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 my-4">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                search_off
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                No dishes found
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 mb-4">
                No items match your dietary or search filter in this section.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDietaryFilter("ALL");
                }}
                className="px-4 py-2 bg-[#C0392B] text-white text-xs font-bold rounded-xl active:scale-95 shadow-sm"
              >
                Reset Section Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4" role="list" aria-label={`${section.title} dishes`}>
              {displayedItems.map((item) => (
                <div role="listitem" key={item.id} className="h-full">
                  <FoodCard item={item} />
                </div>
              ))}
            </div>
          )}

          {/* Pricing Disclaimer */}
          <p className="text-[10px] text-slate-500 dark:text-neutral-400 mt-5 mb-3 leading-relaxed">
            All prices in ₹ (Indian Rupees) as per official restaurant menu. Delivery charges via Porter app charged extra as per actuals.
          </p>
        </main>

        <Footer />
      </div>
    </div>
  );
}
