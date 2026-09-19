import React from "react";
import { createPortal } from "react-dom";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MenuSection from "./components/MenuSection";
import CartBar from "./components/CartBar";
import Footer from "./components/Footer";
import ConsentBanner from "./components/ConsentBanner";      // renamed from CookieConsent (ad-blocker safe)
import DataPrivacy from "./pages/DataPrivacy";               // renamed from PrivacyPolicy (ad-blocker safe)
import TermsAndConditions from "./pages/TermsAndConditions";
import DataPreferences from "./pages/DataPreferences";       // renamed from CookiePolicy (ad-blocker safe)
import RefundPolicy from "./pages/RefundPolicy";
import DishDetail from "./pages/DishDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchModal from "./components/SearchModal";
import { CartProvider, useCart } from "./context/CartContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import CheckoutModal from "./components/CheckoutModal";

/**
 * BottomNavBar — Global fixed bottom navigation.
 * Teleported directly to document.body to ensure it is always anchored to viewport.
 * Handles:
 * - "Search": Opens the instant interactive SearchModal across all 144 items
 * - "Order": Opens current cart & order checkout drawer
 * - "Menu": Navigates home or scrolls smoothly to top
 */
export function BottomNavBar({ onOpenSearch, isSearchOpen }) {
  const { totalItems, openCheckout } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isMenu = !isSearchOpen && (location.pathname === "/" || location.pathname.startsWith("/section"));

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (id === "search") {
      if (onOpenSearch) onOpenSearch();
    } else if (id === "order") {
      openCheckout();
    } else if (id === "menu") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const buttons = [
    {
      id: "search",
      icon: "search",
      label: "Search",
      active: Boolean(isSearchOpen),
    },
    {
      id: "order",
      icon: "receipt_long",
      label: "Order",
      active: false,
      badge: totalItems > 0 ? totalItems : null,
    },
    {
      id: "menu",
      icon: "restaurant_menu",
      label: "Menu",
      active: isMenu,
    },
  ];

  const navContent = (
    <nav
      aria-label="Bottom navigation"
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        width: "100%",
        maxWidth: "512px",
      }}
      className="flex justify-around items-center px-4 py-2 bg-white/98 dark:bg-[#181818]/98 backdrop-blur-md shadow-[0_-6px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_-6px_30px_rgba(0,0,0,0.6)] border-t border-x border-gray-200 dark:border-neutral-800 rounded-t-2xl transition-all duration-200"
    >
      {buttons.map(({ id, icon, label, active, badge }) => (
        <button
          key={id}
          type="button"
          onClick={(e) => handleNavClick(e, id)}
          aria-label={label}
          className={`relative flex flex-col items-center justify-center gap-1 active:scale-95 transition-all duration-150 py-1.5 px-4 min-w-[76px] min-h-[46px] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
            active
              ? "bg-red-50 dark:bg-red-950/40 text-[#C0392B] dark:text-[#FF535A] font-bold border border-red-200/70 dark:border-red-800/40 shadow-xs"
              : "text-slate-600 hover:text-gray-900 hover:bg-slate-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/50 font-medium"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[23px] ${
                active ? "fill-icon scale-105" : ""
              } transition-transform`}
              aria-hidden="true"
            >
              {icon}
            </span>
            {badge ? (
              <span className="absolute -top-1 -right-3 bg-[#C0392B] text-white text-[10px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-sm leading-none">
                {badge}
              </span>
            ) : null}
          </div>
          <span className="text-[11px] tracking-wide leading-none font-semibold">{label}</span>
        </button>
      ))}
    </nav>
  );

  return typeof document !== "undefined" ? createPortal(navContent, document.body) : navContent;
}

/**
 * StoreFront — Main restaurant page.
 */
function StoreFront({ onOpenSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <>
      <Navbar onOpenSearch={onOpenSearch} />
      <HeroBanner />
      <MenuSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Footer />
    </>
  );
}

/**
 * AppContent — Root layout with global navigation, overlays, and routes.
 */
function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { isDark } = useTheme();
  const { isCheckoutOpen } = useCart();
  const location = useLocation();

  // Hide bottom nav bar on dish detail page (has its own order bar) or when a full-screen modal is open
  const showBottomNav = !location.pathname.startsWith("/dish/") && !isCheckoutOpen && !isSearchOpen;

  return (
    <div className={`${isDark ? "dark" : "light"} min-h-screen bg-[#F8F9FA] dark:bg-[#131313] text-gray-900 dark:text-neutral-100 flex justify-center transition-colors duration-200`}>
      <div className="w-full max-w-5xl bg-[#F8F9FA] dark:bg-[#131313] min-h-screen flex flex-col relative shadow-xl overflow-x-hidden border-x border-gray-200 dark:border-neutral-800 pb-20 sm:pb-24">
        <Routes>
          <Route path="/"               element={<StoreFront onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/section/:slug"  element={<CategoryPage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/privacy-policy" element={<DataPrivacy />} />
          <Route path="/terms"          element={<TermsAndConditions />} />
          <Route path="/cookie-policy"  element={<DataPreferences />} />
          <Route path="/refund-policy"  element={<RefundPolicy />} />
          <Route path="/dish/:id"       element={<DishDetail />} />
          {/* Fallback — redirect unknown routes to home */}
          <Route path="*"              element={<StoreFront onOpenSearch={() => setIsSearchOpen(true)} />} />
        </Routes>
        <CheckoutModal />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>

      {/* Global Fixed Overlays — Always anchored directly to viewport */}
      <CartBar />
      {showBottomNav && (
        <BottomNavBar onOpenSearch={() => setIsSearchOpen(true)} isSearchOpen={isSearchOpen} />
      )}
      <ConsentBanner />
    </div>
  );
}

/**
 * App — Root with React Router routes, ThemeProvider, and CartProvider.
 */
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
