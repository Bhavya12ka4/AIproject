import { useState, useEffect } from "react";

/**
 * Restaurant operating hours:
 * Lunch Slot: 12:00 PM – 3:00 PM IST (12:00 to 15:00)
 * Dinner Slot: 6:00 PM – 12:00 AM Midnight IST (18:00 to 24:00)
 */

export function getKitchenStatus(date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const totalMins = hour * 60 + minute;

    // Slot 1: 12:00 PM (720 min) to 3:00 PM (900 min)
    const isLunchOpen = totalMins >= 720 && totalMins < 900;
    // Slot 2: 6:00 PM (1080 min) to 12:00 AM Midnight (1440 min)
    const isDinnerOpen = totalMins >= 1080 && totalMins < 1440;
    const isOpen = isLunchOpen || isDinnerOpen;

    let nextSlot = "";
    if (totalMins < 720) {
      nextSlot = "Opens at 12:00 PM";
    } else if (totalMins >= 900 && totalMins < 1080) {
      nextSlot = "Opens at 6:00 PM";
    } else {
      nextSlot = "Opens at 12:00 PM";
    }

    return {
      isOpen,
      nextSlot,
      statusText: isOpen ? "Open Now • 25–30 mins" : `Closed Now • ${nextSlot}`,
      shortStatus: isOpen ? "Open Now" : "Closed Now",
      prepOrNext: isOpen ? "25–30 mins" : nextSlot,
      hoursSummary: "12:00 PM – 3:00 PM & 6:00 PM – 12:00 AM",
    };
  } catch {
    return {
      isOpen: true,
      nextSlot: "Opens at 12:00 PM",
      statusText: "Open Now • 25–30 mins",
      shortStatus: "Open Now",
      prepOrNext: "25–30 mins",
      hoursSummary: "12:00 PM – 3:00 PM & 6:00 PM – 12:00 AM",
    };
  }
}

export function useKitchenStatus() {
  const [status, setStatus] = useState(() => getKitchenStatus());

  useEffect(() => {
    // Check every 30 seconds to automatically switch open/closed status live
    const interval = setInterval(() => {
      setStatus(getKitchenStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
