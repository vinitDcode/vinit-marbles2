"use client";

import { createContext, useContext, useMemo, useState } from "react";

type EnquiryContextValue = {
  /** Material name most recently requested from a material card, or null. */
  requestedMaterial: string | null;
  /** Call after the enquiry form has consumed the request, so it doesn't re-fire. */
  clearRequestedMaterial: () => void;
  requestMaterial: (materialName: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [requestedMaterial, setRequestedMaterial] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      requestedMaterial,
      clearRequestedMaterial: () => setRequestedMaterial(null),
      requestMaterial: (materialName: string) => setRequestedMaterial(materialName),
    }),
    [requestedMaterial]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return ctx;
}
