"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Layers, Activity, Droplets, Calendar, LogOut, RefreshCw, Sparkles } from "lucide-react";

// Mirroring the exact same business logic engine to parse raw db values cleanly on the dashboard
function generateClinicalRoutine(porosity: string, texture: string, scalp: string) {
  let summary = "";
  let steps: string[] = [];
  let products: string[] = [];

  if (porosity === "low") {
    summary = "Your cuticles are tightly closed, creating a dense biological barrier that locks moisture out.";
    steps = ["Clarify with warm water to lift cuticles.", "Apply deep conditioning masques underneath indirect heat.", "Incorporate lightweight, water-soluble humectants."];
    products = ["Glycerin leave-in", "Sweet almond oil"];
  } else if (porosity === "high") {
    summary = "Your cuticles are widely separated, letting moisture escape just as fast as it enters.";
    steps = ["Incorporate regular protein rinses to fill gaps.", "Layer hydration strictly using the LOC/LCO method.", "Rinse conditioners with cool water to induce contraction."];
    products = ["Heavy castor oil", "Amino acid masques"];
  } else {
    summary = "Your cuticles are perfectly balanced, absorbing and retaining vital hydration optimally.";
    steps = ["Maintain a consistent weekly hydration washing interval.", "Protect fiber structure nightly using a silk wrap.", "Alternate smoothly between moisture and light protein masques."];
    products = ["Jojoba balancing mist", "Aloe vera leave-in"];
  }

  if (scalp === "oily") {
    summary += " Because your sebum profile is overactive, your protocol focuses heavily on stabilizing the root ecosystem.";
    steps.unshift("Execute a targeted scalp-only double cleanse during washdays.");
  } else if (scalp === "dry") {
    summary += " Additionally, your scalp moisture barrier is slightly compromised, requiring extra lipid replenishment.";
    steps.push("Massage a botanical lipid directly onto clean scalp skin post-wash.");
  }

  return { summary, steps, products };
}

interface DiagnosticRecord {
  id: number;
  user_name: string;
  porosity: string;
  texture: string;
  scalp_hydration: string;
  timestamp: string;
}

export default function UserDashboard({ onSignOutSuccess }: { onSignOutSuccess: () => void }) {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<DiagnosticRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDiagnostic = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (user) {
        // Query the latest evaluation saved by this authenticated user ID
        const { data, error: dbError } = await supabase
          .from("diagnostics")
          .select("*")
          .eq("user_id", user.id)
          .order("timestamp", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbError) throw dbError;
        setRecord(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to sync dashboard records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDiagnostic();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSignOutSuccess();
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <p className="text-xs font-medium tracking-wide uppercase">Synchronizing profile matrices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Dashboard Top Navigation bar */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <h3 className="font-serif text-xl font-normal text-foreground">
            Welcome back, {record?.user_name || "Member"}
          </h3>
          <p className="text-xs text-muted-foreground">Premium Trichology Control Portal</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUserDiagnostic}
            className="p-2 rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium border border-destructive/20 text-destructive bg-destructive/[0.02] hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Sign Out
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      {!record ? (
        <div className="p-8 rounded-xl border border-dashed border-border text-center space-y-3">
          <p className="text-sm text-muted-foreground">No locked-down trichology records found under this account.</p>
          <p className="text-xs text-muted-foreground/70">Take the clinical diagnostic on the home screen to map your core profile assets.</p>
        </div>
      ) : (
        <>
          {/* Metadata Timestamp Header */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>Profile locked on: <b>{new Date(record.timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' })}</b></span>
          </div>

          {/* Core Profile Matrix Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border flex flex-col items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">Porosity</span>
              <span className="font-semibold capitalize text-foreground">{record.porosity}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border flex flex-col items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">Matrix Pattern</span>
              <span className="font-semibold capitalize text-foreground">{record.texture}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border flex flex-col items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">Scalp Hydration</span>
              <span className="font-semibold capitalize text-foreground">{record.scalp_hydration.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Dynamically Generated Protocol Sheets */}
          {(() => {
            const routine = generateClinicalRoutine(record.porosity, record.texture, record.scalp_hydration);
            return (
              <div className="space-y-4 pt-2 border-t border-border/40">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Clinical Diagnostic Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/10 p-3 rounded-xl border border-border/30">
                    {routine.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Active Regime Tasks</h4>
                  <ul className="space-y-2">
                    {routine.steps.map((step, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex gap-2.5 items-start">
                        <span className="flex h-4.5 w-4.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Prescribed Formulation Modifiers</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {routine.products.map((p, idx) => (
                      <span key={idx} className="text-[11px] bg-primary/5 text-primary border border-primary/10 px-2.5 py-0.5 rounded-full font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}