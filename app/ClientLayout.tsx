"use client";

import { type ReactNode } from "react";
import { ConsentBanner, tryInitMixpanel } from "@/components/ConsentBanner";
import { MixpanelGroupSync } from "@/components/MixpanelGroupSync";
import { useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    tryInitMixpanel();
  }, []);

  return (
    <>
      {children}
      <MixpanelGroupSync />
      <ConsentBanner />
    </>
  );
}
