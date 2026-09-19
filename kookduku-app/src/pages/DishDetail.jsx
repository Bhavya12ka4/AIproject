import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MENU_ITEMS } from "../data/menuData";

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
      className={`w-4 h-4 border rounded-[3px] flex items-center justify-center p-[2px] flex-shrink-0 ${
        isVeg ? "border-emerald-500" : "border-[#E23744]"
      }`}
    >
      {isVeg ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#E23744]" />
      )}
    </div>
  );
}

/**
 * DishDetail — Comprehensive subpage for each menu item.
 * Explains the dish in detail: history, authentic cooking method,
 * ingredients, allergens, pairings, and direct WhatsApp order button.
 */
export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  // Scroll to top when opening a dish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const item = MENU_ITEMS.find((d) => String(d.id) === String(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#131313] flex justify-center text-gray-900 dark:text-neutral-100">
        <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] min-h-screen p-6 flex flex-col items-center justify-center text-center shadow-md">
          <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-neutral-500 mb-3">restaurant</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dish Not Found</h1>
          <p className="text-sm text-slate-600 dark:text-neutral-400 mb-6">
            The dish you are looking for is not currently on the menu.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#C0392B] text-white text-sm font-bold rounded-xl shadow-md active:scale-95 transition-all"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const spiceDescriptions = ["Zero Spice", "Mild", "Medium", "Spicy", "Very Spicy", "Fiery Extra Hot"];
  const spiceLabel = item.spice ? spiceDescriptions[item.spice] || "Spiced" : "Mild";

  const displayPrice = typeof item.price === "number" ? `₹${item.price}` : item.price;
  const totalPrice = typeof item.price === "number" ? item.price * qty : item.price;

  // Pre-filled WhatsApp message
  const whatsappText = encodeURIComponent(
    `Hi Kook Du Ku! I would like to order: ${item.name} (${item.portion || "Standard"}) x ${qty} = ₹${typeof totalPrice === "number" ? totalPrice : item.price}. Please confirm availability.`
  );
  const whatsappUrl = `https://wa.me/919724765085?text=${whatsappText}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#131313] text-gray-900 dark:text-neutral-100 flex justify-center transition-colors duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-[#151515] min-h-screen flex flex-col relative shadow-xl overflow-x-hidden border-x border-gray-200 dark:border-neutral-800">
        {/* ── Top Floating Header ── */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between shadow-xs">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back to menu"
            className="flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-[#C0392B] active:scale-95 transition-all text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] px-2 py-1 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_back</span>
            <span>Back</span>
          </button>

          <Link to="/" className="flex items-center gap-1.5 active:scale-95 transition-transform">
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 filter drop-shadow-xs">
              <img src="/logo.png" alt="Kook Du Ku" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 tracking-wide uppercase">
              {item.category}
            </span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ask about this dish on WhatsApp"
            className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-base">chat</span>
          </a>
        </header>

        {/* ── Hero Image with Badges ── */}
        <div className="relative h-64 w-full bg-slate-100 dark:bg-neutral-900 overflow-hidden border-b border-gray-200 dark:border-neutral-800">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover object-center brightness-95"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-neutral-800 text-slate-400">
              <span className="material-symbols-outlined text-5xl">restaurant</span>
            </div>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                <DietaryDot isVeg={item.isVeg} />
                <span className="text-xs font-bold text-white">
                  {item.isVeg ? "100% Pure Veg" : "Non-Vegetarian"}
                </span>
              </div>
            </div>

            {item.badge && (
              <span className="bg-[#92001c]/90 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                {item.badge.label}
              </span>
            )}
          </div>

          {/* Tag on bottom right */}
          {item.tag && (
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
              {item.tag}
            </div>
          )}
        </div>

        {/* ── Dish Title & Essential Info ── */}
        <main className="px-4 pt-4 pb-24 space-y-4 text-slate-700 dark:text-neutral-300 flex-1">
          {/* Title and Price */}
          <div className="border-b border-gray-200 dark:border-neutral-800 pb-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {item.name}
              </h1>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black text-gray-900 dark:text-white">{displayPrice}</div>
                {item.portion && (
                  <div className="text-xs text-slate-500 dark:text-neutral-400 font-semibold">{item.portion}</div>
                )}
              </div>
            </div>

            {/* Spice and Rating strip */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {item.spice > 0 && (
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 text-xs shadow-xs">
                  <span className="text-sm">{"🌶️".repeat(item.spice)}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{spiceLabel}</span>
                </div>
              )}

              {item.rating && (
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-neutral-700 text-xs text-amber-800 dark:text-amber-400 shadow-xs">
                  <span className="material-symbols-outlined fill-icon text-amber-600 dark:text-amber-400 text-sm">star</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.rating}</span>
                  <span className="text-slate-500 dark:text-neutral-400 text-[10px]">(Kitchen Standard)</span>
                </div>
              )}

              <div className="flex items-center gap-1 bg-slate-50 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 text-xs text-slate-600 dark:text-neutral-400 shadow-xs">
                <span className="material-symbols-outlined text-xs text-amber-600">schedule</span>
                <span className="text-slate-900 dark:text-white font-medium">Fresh Made to Order</span>
              </div>
            </div>
          </div>

          {/* ── Detailed Culinary Description ── */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C0392B] text-base">restaurant_menu</span>
              About This Dish
            </h2>
            <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
              {item.description}
            </p>
          </section>

          {/* ── Serving / Combo Package Breakdown ── */}
          {item.portion && (
            <section className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-start gap-3 shadow-xs">
              <span className="material-symbols-outlined text-amber-600 text-2xl mt-0.5 flex-shrink-0" aria-hidden="true">
                lunch_dining
              </span>
              <div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">Serving &amp; Package Contents</h3>
                <p className="text-sm text-slate-800 dark:text-neutral-200 font-semibold mt-0.5">{item.portion}</p>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Carefully measured and packaged fresh to order for optimum flavor and temperature retention.
                </p>
              </div>
            </section>
          )}

          {/* ── Traditional Cooking Method & Technique ── */}
          <section className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2 shadow-xs">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-600 text-base">local_fire_department</span>
              Cooking Technique &amp; Heritage
            </h3>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              {item.category.includes("Tandoor")
                ? "Marinated for hours in hung yoghurt and freshly ground roasted spices, then skewered and charred over red-hot charcoal in our authentic clay tandoor."
                : item.category.includes("Biryani")
                ? "Slow dum-cooked in an earthen clay vessel sealed with whole-wheat atta dough. The trapping of steam infuses every grain of aged basmati rice with royal aromas and delicate meat juices."
                : item.category.includes("Parcel") || item.name.includes("Champaran")
                ? "Prepared in traditional Ahuna earthen pots or heavy brass tapeli, stewed with mustard oil and whole garlic pods over low charcoal embers for unmatched earthen depth."
                : item.category.includes("North Indian")
                ? "Slow-simmered in rich slow-cooked onion and tomato reduction, finished with churned butter, fresh cream, and crushed kasuri methi."
                : item.category.includes("Chinese")
                ? "Wok-tossed on high flame in seasoned iron woks with crisp ginger, garlic, dark soy, and vibrant spring onions for smoky wok-hei flavor."
                : item.category.includes("Roti")
                ? "Hand-stretched and baked fresh to order on traditional clay tawa or inside the tandoor oven, brushed with pure Amul butter."
                : "Handcrafted using traditional recipes, fresh ground masala powders, and pure ingredients without artificial preservatives."}
            </p>
          </section>

          {/* ── Best Paired With ── */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-600 text-base">thumb_up</span>
              Chef's Recommended Pairing
            </h3>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-neutral-300 flex items-center gap-2.5 shadow-xs">
              <span className="text-xl">🫓</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.category.includes("Curries") || item.category.includes("North Indian")
                    ? "Tandoori Butter Roti or Desi Bajra Rotlo + Chhas"
                    : item.category.includes("Biryani")
                    ? "Spiced Raita + Cold Drink or Fresh Lime"
                    : item.category.includes("Tandoor")
                    ? "Fresh Green Mint Chutney & Onion Rings"
                    : item.category.includes("Chinese")
                    ? "Chicken Hakka Noodles or Fried Rice"
                    : "Steamed Basmati Rice or Fresh Phulka"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                  Complementary flavors that elevate the authentic spice blend.
                </p>
              </div>
            </div>
          </section>

          {/* ── Allergen & FSSAI Disclosure ── */}
          <section className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-500/40 space-y-1.5">
            <h3 className="text-xs font-bold text-red-950 dark:text-red-200 flex items-center gap-1">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">info</span>
              Allergens &amp; Dietary Information
            </h3>
            {item.allergens && item.allergens.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {item.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="text-[11px] bg-red-100 dark:bg-red-900/60 border border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-200 font-semibold px-2 py-0.5 rounded"
                  >
                    Contains: {allergen}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-red-900 dark:text-red-300">
                No major common allergens notified. Prepared in a kitchen handling gluten, dairy, and eggs.
              </p>
            )}
            <p className="text-[10px] text-red-800/80 dark:text-red-400/80 mt-1">
              FSSAI compliant kitchen. Inform our team of severe allergies prior to placing your order.
            </p>
          </section>

          {/* ── Kitchen Location ── */}
          <section className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-600 dark:text-neutral-400 space-y-1">
            <p className="font-bold text-gray-900 dark:text-white">📍 Prepared at:</p>
            <p>Kook Du Ku, F/23,24 Royal Height, Near Vaishnodevi Circle, Ahmedabad – 382421</p>
            <p>Hot delivery &amp; pickup available. Operating 11:30 AM – 11:45 PM.</p>
          </section>
        </main>

        {/* ── Fixed Bottom Action Bar ── */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800 max-w-3xl mx-auto flex items-center justify-between gap-3 shadow-2xl">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl p-1 gap-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-slate-800 dark:text-white font-bold flex items-center justify-center active:scale-90 transition-transform shadow-xs"
            >
              −
            </button>
            <span className="font-bold text-gray-900 dark:text-white text-sm px-1 min-w-[20px] text-center">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-slate-800 dark:text-white font-bold flex items-center justify-center active:scale-90 transition-transform shadow-xs"
            >
              +
            </button>
          </div>

          {/* WhatsApp Direct Order Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${item.name} on WhatsApp`}
            className="flex-1 h-11 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">chat</span>
            <span>Order via WhatsApp • ₹{typeof totalPrice === "number" ? totalPrice : item.price}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
