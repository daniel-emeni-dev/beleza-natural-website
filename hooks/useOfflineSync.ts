"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useOfflineSync() {
  useEffect(() => {
    async function syncOfflineData() {
      // Check if we are online and have a saved offline quiz entry
      if (typeof window === "undefined" || !navigator.onLine) return;

      const offlineKey = "beleza_offline_sync";
      const cachedData = localStorage.getItem(offlineKey);
      
      if (!cachedData) return;

      try {
        const payload = JSON.parse(cachedData);
        
        // Check if a user session exists now to bind the entry properly
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          payload.user_id = session.user.id;
        }

        // Silently push the cached quiz data to Supabase
        const { error } = await supabase.from("hair_diagnostics").insert([payload]);

        if (!error) {
          // Success! Clear the queue so we don't duplicate records
          localStorage.removeItem(offlineKey);
          console.log("✨ Offline hair blueprint successfully synced with the cloud!");
        }
      } catch (err) {
        console.error("Failed to background-sync offline record:", err);
      }
    }

    // Run the sync engine immediately when the app loads
    syncOfflineData();

    // Also listen for the browser coming back online in real-time
    window.addEventListener("online", syncOfflineData);
    return () => window.removeEventListener("online", syncOfflineData);
  }, []);
}