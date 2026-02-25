"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setGroup, isInitialized } from "@/lib/mixpanel";

const GROUP_KEY = "vertical";

function getVerticalFromPath(pathname: string): string | null {
  if (pathname.startsWith("/financial")) return "financial";
  if (pathname.startsWith("/checkout")) return "checkout";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/streaming")) return "streaming";
  if (pathname.startsWith("/lifestyle")) return "lifestyle";
  if (pathname.startsWith("/wellness")) return "wellness";
  return null;
}

/**
 * Sets Mixpanel group by current vertical (pathname) for Group Analytics.
 * Renders nothing; runs effect only.
 */
export function MixpanelGroupSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized() || !pathname) return;
    const vertical = getVerticalFromPath(pathname);
    if (vertical) {
      setGroup(GROUP_KEY, vertical);
    }
  }, [pathname]);

  return null;
}
