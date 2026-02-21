"use client";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// No-op stub for the Mixpanel instance — keeps imports in page files working
// without sending any data. Replace with real SDK calls to implement tracking.
const mixpanelStub = {
  track: (..._args: any[]) => {},
  identify: (..._args: any[]) => {},
  alias: (..._args: any[]) => {},
  reset: (..._args: any[]) => {},
  register: (..._args: any[]) => {},
  register_once: (..._args: any[]) => {},
  unregister: (..._args: any[]) => {},
  set_config: (..._args: any[]) => {},
  track_pageview: (..._args: any[]) => {},
  get_distinct_id: () => "" as string,
  get_property: (_key: string) => undefined as any,
  people: {
    set: (..._args: any[]) => {},
    set_once: (..._args: any[]) => {},
    increment: (..._args: any[]) => {},
    append: (..._args: any[]) => {},
    union: (..._args: any[]) => {},
    track_charge: (..._args: any[]) => {},
    clear_charges: (..._args: any[]) => {},
    delete_user: (..._args: any[]) => {},
  },
  flags: {
    get_variant_value: (..._args: any[]): Promise<any> => Promise.resolve(undefined),
    get_feature_data: (..._args: any[]): Promise<any> => Promise.resolve({}),
    is_enabled: (..._args: any[]): Promise<boolean> => Promise.resolve(false),
  },
  start_session_recording: (..._args: any[]) => {},
  stop_session_recording: (..._args: any[]) => {},
  init: (..._args: any[]) => {},
};

export let mixpanel = mixpanelStub;

export function initMixpanelOnce() {
  if (typeof window !== "undefined") {
    (window as any).mixpanel = mixpanelStub;
    (window as any).RESET = () => window.location.reload();
  }
  return mixpanelStub;
}

export function resetInitialized() {}

export async function waitForMixpanel(): Promise<typeof mixpanelStub> {
  return mixpanelStub;
}

export async function trackMicrositeSession(_micrositeName: string): Promise<void> {}

export function cleanupEverything(): void {
  try { localStorage.clear(); } catch {}
  try { sessionStorage.clear(); } catch {}
}

export function nukePanel(): void {
  cleanupEverything();
  window.location.reload();
}

export const trackPageView = (_url: string) => {};
