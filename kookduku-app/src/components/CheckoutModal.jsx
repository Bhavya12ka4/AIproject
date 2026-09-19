import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useKitchenStatus } from "../utils/restaurantStatus";

const KITCHEN_WHATSAPP = "919724765085";

export default function CheckoutModal() {
  const kitchenStatus = useKitchenStatus();
  const {
    isCheckoutOpen,
    closeCheckout,
    cartList,
    subtotal,
    gstAmount,
    grandTotal,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const [orderType, setOrderType] = useState("delivery"); // "delivery" | "pickup"
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [consentGiven, setConsentGiven] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Order submission state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [placedWhatsappUrl, setPlacedWhatsappUrl] = useState("");

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setErrorMessage("");
    if (orderPlaced) {
      clearCart();
      setOrderPlaced(false);
    }
    closeCheckout();
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // 1. Strict Input Sanitization (Prevents XSS / Injection / Oversized Payloads)
    const cleanName = customerName.trim().slice(0, 60).replace(/[<>{}[\]\\]/g, "");
    const cleanPhone = customerPhone.replace(/\D/g, "").slice(-10);
    const cleanAddress = customerAddress.trim().slice(0, 200).replace(/[<>{}[\]\\]/g, "");
    const cleanNotes = orderNotes.trim().slice(0, 150).replace(/[<>{}[\]\\]/g, "");

    if (!cleanName) {
      setErrorMessage("Please enter your name (letters and spaces only).");
      return;
    }
    // Validate Indian mobile number format (starts with 6, 7, 8, or 9 and has exactly 10 digits)
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
      return;
    }
    if (orderType === "delivery" && !cleanAddress) {
      setErrorMessage("Please enter your delivery address.");
      return;
    }
    if (!consentGiven) {
      setErrorMessage("Please accept the order processing consent to proceed.");
      return;
    }

    setErrorMessage("");

    // Generate unique verifiable order ID
    const orderId = `KDK-${Math.floor(1000 + Math.random() * 9000)}`;
    setPlacedOrderId(orderId);

    // Format items list for WhatsApp
    const itemsListText = cartList
      .map((entry, index) => {
        const itemPrice = typeof entry.item.price === "number" ? entry.item.price : 0;
        const lineTotal = itemPrice * entry.qty;
        return `${index + 1}. *${entry.item.name}* x ${entry.qty} = ₹${lineTotal}`;
      })
      .join("\n");

    // Construct clean, professional WhatsApp order text
    const message = `🥘 *NEW ORDER - KOOK DU KU CURRIES*
━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* #${orderId}
👤 *Customer:* ${cleanName}
📞 *Phone:* ${cleanPhone}
🛵 *Order Type:* ${orderType === "delivery" ? "Home Delivery" : "Self-Pickup / Takeaway"}
${orderType === "delivery" ? `📍 *Address:* ${cleanAddress}\n` : ""}
${cleanNotes ? `📝 *Notes:* ${cleanNotes}\n` : ""}
━━━━━━━━━━━━━━━━━━━━
🛒 *Items Ordered:*
${itemsListText}

━━━━━━━━━━━━━━━━━━━━
💵 *Bill Summary:*
• Items Total: ₹${grandTotal}
${orderType === "delivery" ? "• Delivery: via Porter app (charged extra as per actuals)\n" : ""}• *Final Food Total: ₹${grandTotal}*
━━━━━━━━━━━━━━━━━━━━
📍 *Kitchen:* Vaishnodevi Circle, Ahmedabad
🔒 *Official Note:* All order bills are verified by kitchen team against official menu prices.
🙏 *Please confirm this order and let me know the preparation time!*`;

    const whatsappUrl = `https://wa.me/${KITCHEN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    setPlacedWhatsappUrl(whatsappUrl);

    // Open WhatsApp in a new tab/app securely (prevents reverse tabnabbing)
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Switch to confirmation view inside the modal
    setOrderPlaced(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-lg sm:max-w-xl max-h-[88dvh] bg-white dark:bg-[#181818] border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* ── Header ── */}
        <header className="px-4 py-3 bg-white dark:bg-[#181818] border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <img
                src="/logo.png"
                alt="Kook Du Ku Curries"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 id="checkout-modal-title" className="text-base font-bold text-gray-900 dark:text-white leading-none">
                {orderPlaced ? "Order Transferred!" : "Confirm Your Order"}
              </h2>
              <p className="text-[11px] text-[#C0392B] font-medium mt-0.5">Kook Du Ku Curries</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[#C0392B] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </header>

        {/* ── Body: Confirmed State OR Checkout Form ── */}
        {orderPlaced ? (
          <div className="p-5 overflow-y-auto space-y-4 text-center bg-white dark:bg-[#181818]">
            {/* Green Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 animate-bounce">
              <span className="material-symbols-outlined text-3xl">chat</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                Order #{placedOrderId}
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mt-2">
                Order Details Sent to WhatsApp!
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed px-2">
                Your order has been formatted and opened in your WhatsApp chat.
              </p>
            </div>

            {/* Reassuring Action Card */}
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700 text-left space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#C0392B] text-lg font-bold">👉</span>
                <p className="text-xs text-gray-900 dark:text-white font-semibold">
                  Next Step: Tap <span className="text-emerald-600 dark:text-emerald-400 font-bold">"Send"</span> in WhatsApp!
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pl-6">
                Our kitchen at Vaishnodevi Circle, Ahmedabad will receive your message immediately and confirm preparation time.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={placedWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xl">open_in_new</span>
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl active:scale-95 transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        ) : cartList.length === 0 ? (
          <div className="p-8 text-center space-y-4 bg-white dark:bg-[#181818]">
            <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-neutral-600">shopping_bag</span>
            <p className="text-sm text-gray-900 dark:text-white font-bold">Your cart is empty</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Add some delicious curries, tikkas, or biryanis to get started.</p>
            <button
              onClick={handleClose}
              className="mx-auto block px-8 py-2.5 bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#181818]">
            {/* Kitchen Closed Notice */}
            {!kitchenStatus.isOpen && (
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
                <span className="material-symbols-outlined text-amber-600 text-sm flex-shrink-0">schedule</span>
                <span><strong>Kitchen currently closed ({kitchenStatus.nextSlot}).</strong> You can still send your order via WhatsApp for advance booking!</span>
              </div>
            )}

            {/* Error banner */}
            {errorMessage && (
              <div role="alert" className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-500/50 text-xs text-red-700 dark:text-red-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ── 1. Order Type Switch ── */}
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 font-semibold block mb-1.5">Order Type:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderType === "delivery"
                      ? "bg-[#C0392B] text-white shadow-sm"
                      : "bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">delivery_dining</span>
                  <span>Home Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderType === "pickup"
                      ? "bg-[#C0392B] text-white shadow-sm"
                      : "bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">takeout_dining</span>
                  <span>Self Pickup</span>
                </button>
              </div>
            </div>

            {/* ── 2. Items List ── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Items in Cart ({cartList.length}):</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-red-600 hover:text-red-700 underline font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
                {cartList.map(({ item, qty }) => {
                  const priceNum = typeof item.price === "number" ? item.price : 0;
                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#F8F9FA] dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">₹{priceNum} each</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center bg-white dark:bg-neutral-800 border border-[#C0392B] rounded-lg h-6.5 px-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="w-5 h-5 flex items-center justify-center text-[#C0392B] hover:text-red-700 font-bold active:scale-75 transition-transform"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-gray-900 dark:text-white px-1 min-w-[16px] text-center">{qty}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="w-5 h-5 flex items-center justify-center text-[#C0392B] hover:text-red-700 font-bold active:scale-75 transition-transform"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-extrabold text-gray-900 dark:text-white w-12 text-right">
                          ₹{priceNum * qty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 3. Customer Info Form ── */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs text-gray-700 dark:text-gray-300 font-bold block">Your Details for WhatsApp:</span>

              <div>
                <label htmlFor="cust-name" className="text-[11px] text-gray-600 dark:text-gray-400 block mb-1">
                  Full Name *
                </label>
                <input
                  id="cust-name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#F8F9FA] dark:bg-neutral-800/90 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="cust-phone" className="text-[11px] text-gray-600 dark:text-gray-400 block mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#F8F9FA] dark:bg-neutral-800/90 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20 placeholder:text-gray-400"
                />
              </div>

              {orderType === "delivery" && (
                <div>
                  <label htmlFor="cust-address" className="text-[11px] text-gray-600 dark:text-gray-400 block mb-1">
                    Delivery Address (Flat / House No., Landmark) *
                  </label>
                  <textarea
                    id="cust-address"
                    required
                    rows={2}
                    placeholder="e.g. B-402, Royal Heights, Vaishnodevi Circle, Ahmedabad"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-[#F8F9FA] dark:bg-neutral-800/90 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20 placeholder:text-gray-400"
                  />
                </div>
              )}

              <div>
                <label htmlFor="cust-notes" className="text-[11px] text-gray-600 dark:text-gray-400 block mb-1">
                  Cooking Notes / Special Instructions (Optional)
                </label>
                <input
                  id="cust-notes"
                  type="text"
                  placeholder="e.g. Less spicy, extra salad/lemon, buzzer ring"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#F8F9FA] dark:bg-neutral-800/90 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* ── 4. Transparent Bill Summary ── */}
            <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Items Total ({cartList.reduce((s, e) => s + e.qty, 0)} {cartList.reduce((s, e) => s + e.qty, 0) === 1 ? "item" : "items"})</span>
                <span className="font-bold text-gray-900 dark:text-white">₹{grandTotal}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-[11px]">
                  <span>Delivery (via Porter app)</span>
                  <span className="text-[#C0392B] font-medium">Extra as per actuals</span>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-neutral-700 pt-1.5 mt-1 flex justify-between text-sm font-extrabold text-gray-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{grandTotal}</span>
              </div>
            </div>

            {/* ── 5. Form Consent (DPDPA Requirement) ── */}
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 accent-[#C0392B]"
              />
              <span>
                I agree to transfer my order details to Kook Du Ku via WhatsApp (+91 9724765085) for order fulfillment.
              </span>
            </label>

            {/* ── Cyber Safety & Anti-Scam Notice ── */}
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-200/90 leading-tight">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-sm mt-0.5 flex-shrink-0" aria-hidden="true">
                security
              </span>
              <div>
                <strong className="text-amber-800 dark:text-amber-300">Cyber Safety Notice: </strong>
                <span>Always ensure you are communicating exclusively with our verified official number <strong>+91 9724765085</strong>. Kook Du Ku never asks for your UPI PIN, passwords, or bank OTPs.</span>
              </div>
            </div>

            {/* ── 6. Submit Button ── */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>Send Order to WhatsApp • ₹{grandTotal}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
