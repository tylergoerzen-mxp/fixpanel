"use client";

// Stub hook — returns null until a real Mixpanel SDK is initialized.
export function useMixpanelDeviceId() {
  return { deviceId: null as string | null, isPolling: false };
}
