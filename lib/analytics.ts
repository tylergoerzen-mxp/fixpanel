"use client";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// No-op stub for the Mixpanel instance — keeps imports in page files working
// without sending any data. Replace with real SDK calls to implement tracking.
const noOp = () => {};
const noOpAsync = async () => {};

const mixpanelStub = {
  track: noOp,
  identify: noOp,
  alias: noOp,
  reset: noOp,
  register: noOp,
  register_once: noOp,
  unregister: noOp,
  get_distinct_id: () => "",
  get_property: (_key: string) => undefined,
  people: {
    set: noOp,
    set_once: noOp,
    increment: noOp,
    append: noOp,
    union: noOp,
    track_charge: noOp,
    clear_charges: noOp,
    delete_user: noOp,
  },
  flags: {
    get_variant_value: (_flag: string) => undefined,
    get_feature_data: async (_flag: string) => ({}),
  },
  start_session_recording: noOp,
  stop_session_recording: noOp,
  init: noOp,
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
