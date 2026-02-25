"use client";

import mixpanel from "mixpanel-browser";

const CONSENT_KEY = "fixpanel_analytics_consent";
const CONSENT_REQUIRED = true; // California users — do not init until consent

export function getToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
}

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "true";
  } catch {
    return false;
  }
}

export function setConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "true" : "false");
  } catch {
    // ignore
  }
}

let initialized = false;

/**
 * Initialize Mixpanel. For CA users, only inits after consent.
 * Call after setConsent(true) when user accepts the banner.
 */
export function initMixpanel(): boolean {
  if (typeof window === "undefined") return false;
  const token = getToken();
  if (!token) return false;
  if (CONSENT_REQUIRED && !hasConsent()) return false;
  if (initialized) return true;

  mixpanel.init(token, {
    debug: process.env.NODE_ENV !== "production",
    track_pageview: true,
    persistence: "localStorage",
  });

  mixpanel.register({
    platform: "web",
  });

  initialized = true;
  if (typeof window !== "undefined") {
    (window as unknown as { mixpanel: typeof mixpanel }).mixpanel = mixpanel;
    (window as unknown as { RESET: () => void }).RESET = reset;
  }
  if (process.env.NODE_ENV !== "production") {
    console.log("[MIXPANEL]: LOADED");
  }
  return true;
}

/**
 * Set group for Group Analytics (e.g. vertical: checkout, financial, admin).
 * Call when user enters a vertical so events are attributed to that group.
 */
export function setGroup(groupKey: string, groupId: string): void {
  if (typeof window === "undefined" || !initialized) return;
  try {
    mixpanel.set_group(groupKey, groupId);
    mixpanel.register({ [groupKey]: groupId });
  } catch {
    // ignore
  }
}

/**
 * Track an event. No-op if Mixpanel not initialized (e.g. no consent yet).
 */
export function track(
  eventName: string,
  properties?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined" || !initialized) return;
  const clean: Record<string, string | number | boolean> = {};
  if (properties) {
    for (const [k, v] of Object.entries(properties)) {
      if (v !== undefined && v !== null && v !== "") clean[k] = v;
    }
  }
  try {
    mixpanel.track(eventName, Object.keys(clean).length ? clean : undefined);
  } catch {
    // ignore
  }
}

/**
 * Identify user (e.g. after login/signup). Use a stable ID from your backend, not email.
 */
export function identify(distinctId: string): void {
  if (typeof window === "undefined" || !initialized) return;
  try {
    mixpanel.identify(distinctId);
  } catch {
    // ignore
  }
}

/**
 * Set user profile properties. Call after identify().
 */
export function peopleSet(properties: Record<string, unknown>): void {
  if (typeof window === "undefined" || !initialized) return;
  try {
    mixpanel.people.set(properties);
  } catch {
    // ignore
  }
}

/**
 * Reset Mixpanel on logout (clears identity and generates new device id).
 */
export function reset(): void {
  if (typeof window === "undefined" || !initialized) return;
  try {
    mixpanel.reset();
  } catch {
    // ignore
  }
}

/**
 * Whether Mixpanel has been initialized (and consent given when required).
 */
export function isInitialized(): boolean {
  return initialized;
}
