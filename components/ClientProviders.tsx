"use client";

import { useOfflineSync } from "@/hooks/useOfflineSync";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Your background sync engine runs safely here now!
  useOfflineSync();

  return <>{children}</>;
}