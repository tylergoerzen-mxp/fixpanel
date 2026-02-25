"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  initMixpanel,
  hasConsent,
  setConsent,
  getToken,
  isInitialized,
} from "@/lib/mixpanel";

/**
 * Consent banner for California (and EU) users.
 * Renders until user accepts or declines. On accept, sets consent and initializes Mixpanel.
 */
export function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const token = getToken();
    if (!token) return;
    if (hasConsent()) {
      initMixpanel();
      return;
    }
    setShowBanner(true);
  }, [mounted]);

  const handleAccept = () => {
    setConsent(true);
    initMixpanel();
    setShowBanner(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-slate-900 text-white p-4 shadow-lg"
      role="dialog"
      aria-label="Analytics consent"
    >
      <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm">
          We use analytics to improve the site (e.g. where users go and how they use the checkout).
          By continuing, you allow us to use cookies and similar tech for analytics. You can decline;
          the site will still work.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="bg-transparent border-white/30 text-white hover:bg-white/10"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="bg-[#7856FF] hover:bg-[#6b4ce6] text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Callback for layout: init Mixpanel when consent was already given (e.g. returning visitor).
 */
export function tryInitMixpanel(): boolean {
  if (typeof window === "undefined") return false;
  if (hasConsent() && getToken() && !isInitialized()) {
    return initMixpanel();
  }
  return false;
}
