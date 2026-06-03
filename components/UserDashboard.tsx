"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { LogOut, Loader2, Sparkles, Calendar, CheckCircle, RefreshCw, History } from "lucide-react";

interface UserDashboardProps {
  onSignOutSuccess: () => void;
}

export default function UserDashboard({ onSignOutSuccess }: UserDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [allAssessments, setAllAssessments] = useState<any[]>([]);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    async function fetchUserHistory() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        // UPGRADE: Fetching all records sorted by newest first to build a timeline history
        const { data, error } = await supabase
          .from("hair_diagnostics")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAllAssessments(data || []);
      } catch (err) {
        console.error("Error reading routine history map:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserHistory();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      onSignOutSuccess();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const getFriendlyTrait = (type: string, key: string) => {
    const dictionary: Record<string, Record<string, string>> = {
      porosity: {
        low: "Moisture Shield (Low Porosity)",
        normal: "Perfectly Balanced",
        high: "Thirsty Curls (High Porosity)"
      },
      scalp: {
        oily: "Quick to Oil",
        normal: "Happy & Balanced",
        dry: "Naturally Dry or Flaky"
      },
      pattern: {
        wavy: "Gentle Waves",
        curly: "Springy Curls",
        coily: "Rich Coils & Micro-Patterns"
      }
    };
    return dictionary[type]?.[key] || key;
  };

  const generateRoutineSteps = (assessment: any) => {
    if (!assessment) return [];
    const steps = [];
    
    if (assessment.scalp_type === "oily") {
      steps.push({ title: "The Wash Habit", desc: "Use a clarifying, lightweight shampoo twice a week to keep your roots fresh without stripping your ends." });
    } else if (assessment.scalp_type === "dry") {
      steps.push({ title: "The Wash Habit", desc: "Stick to washing once a week or every 10 days using a creamy, moisturizing wash to protect your scalp's natural oils." });
    } else {
      steps.push({ title: "The Wash Habit", desc: "A gentle, sulfate-free balancing shampoo once a week keeps everything clean and perfectly stable." });
    }

    if (assessment.porosity_score === "low") {
      steps.push({ title: "Moisture Application", desc: "Use lightweight leave-in liquids or milks. Apply your conditioner while your hair is warm in the shower so it absorbs properly." });
    } else if (assessment.porosity_score === "high") {
      steps.push({ title: "Moisture Application", desc: "Layer thick, rich creams followed by a light natural oil to lock in water and prevent it from drying out by midday." });
    } else {
      steps.push({ title: "Moisture Application", desc: "A standard moisturizing leave-in conditioner after washes keeps your strands hydrated and soft." });
    }

    if (assessment.curl_pattern === "coily") {
      steps.push({ title: "Daily Styling Choice", desc: "Opt for the 'shingling' or twisting method using moisturizing butters to define your rich coils and manage shrinkage." });
    } else if (assessment.curl_pattern === "curly") {
      steps.push({ title: "Daily Styling Choice", desc: "Rake a defining gel or mousse through soaking wet curls to enhance your springy corkscrews with zero crunch." });
    } else {
      steps.push({ title: "Daily Styling Choice", desc: "Use a super light foam or spray gel to give your soft waves structure without dragging down your natural volume." });
    }

    return steps;
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-xs font-medium font-sans">Reading your hair history profile...</p>
      </div>
    );
  }

  // The very first item in our array is our current active profile
  const latestAssessment = allAssessments[0] || null;
  const historicAssessments = allAssessments.slice(1); // The rest go into history timeline
  const routine = generateRoutineSteps(latestAssessment);

  return (
    <div className="space-y-6">
      {/* Profile Welcome Header */}
      <div className="flex items-start justify-between pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Sparkles className="w-2.5 h-2.5" /> My Personal Guide
          </div>
          <h2 className="font-serif text-2xl font-medium text-foreground tracking-tight">Your Hair Blueprint</h2>
        </div>
        
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors h-8 px-3 rounded-lg hover:bg-destructive/5"
        >
          {isSigningOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
          Sign Out
        </button>
      </div>

      {!latestAssessment ? (
        <div className="p-6 text-center border-2 border-dashed border-border rounded-2xl space-y-3">
          <p className="text-sm text-muted-foreground">You haven't run your profile analysis yet!</p>
          <a href="/analysis" className="inline-flex h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium items-center justify-center hover:bg-primary/90 transition-all">
            Take Your First Hair Quiz
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Traits Group */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Hair Traits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { label: "Absorbs Water As", val: getFriendlyTrait("porosity", latestAssessment.porosity_score) },
                { label: "Your Scalp Is", val: getFriendlyTrait("scalp", latestAssessment.scalp_type) },
                { label: "Your Shape Is", val: getFriendlyTrait("pattern", latestAssessment.curl_pattern) }
              ].map((trait, i) => (
                <div key={i} className="p-3 bg-muted/30 border-2 border-border rounded-xl">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">{trait.label}</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{trait.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Structured Routine Steps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Everyday Routine</h3>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border">
                <Calendar className="w-3 h-3" /> Latest: {new Date(latestAssessment.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-3">
              {routine.map((step, idx) => (
                <div key={idx} className="bg-card p-4 rounded-xl border-2 border-border shadow-sm flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {step.title}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: Historical Timeline Section (Only shows if they have old quiz records) */}
          {historicAssessments.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" /> Previous Hair Checks
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 border border-border rounded-xl p-3 bg-muted/10">
                {historicAssessments.map((past: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40 last:border-0">
                    <span className="text-muted-foreground font-medium">
                      {new Date(past.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-foreground font-semibold">
                      {getFriendlyTrait("pattern", past.curl_pattern)} • {getFriendlyTrait("porosity", past.porosity_score)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Notice Banner Box */}
          <div className="p-3.5 bg-secondary/40 border-2 border-border rounded-xl flex gap-3 items-center">
            <RefreshCw className="w-4 h-4 text-primary shrink-0 animate-spin-slow" />
            <p className="text-[11px] text-muted-foreground leading-normal">
              Hair types evolve with the seasons. If your curls or scalp start behaving differently in a few months, simply re-run the hair quiz to refresh your plan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}