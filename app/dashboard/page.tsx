"use client";

import { useRouter } from "next/navigation";
import UserDashboard from "@/components/UserDashboard";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full pt-28 pb-16 flex items-center justify-center bg-background">
      <div className="w-full max-w-xl mx-auto px-6">
        {/* High-visibility modern classic card */}
        <div className="bg-card border-2 border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <UserDashboard onSignOutSuccess={() => router.push("/")} />
        </div>
      </div>
    </main>
  );
}