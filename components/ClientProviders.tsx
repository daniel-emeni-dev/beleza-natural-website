"use client";

import { useOfflineSync } from "@/hooks/useOfflineSync";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // My background sync engine runs safely here
  useOfflineSync();

  return <>{children}</>;
}