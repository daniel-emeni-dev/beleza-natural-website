"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Scissors, 
  Droplet, 
  Wind, 
  User,
  LayoutDashboard
} from "lucide-react";

// Framer Motion Animation Variants for Desktop-Grade Fluidity
const fadeInVertical = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);

  // Sync auth state on mount and listen for real-time authentication shifts
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setSessionLoading(false);
    };

    checkUserSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden selection:bg-primary/10">
      
     {/* HERO SECTION */}
      <main className="pt-48 pb-24 md:pt-56 md:pb-32 max-w-7xl mx-auto px-6 relative">
        {/* Subtle Background Glow Blurs */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <motion.div variants={fadeInVertical} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              AI-Driven Trichology System v1.0
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInVertical}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-foreground tracking-tight leading-[1.1]"
          >
            Precision diagnostics for your <span className="italic text-primary/90 font-medium">natural hair</span> journey.
          </motion.h1>

          <motion.p 
            variants={fadeInVertical}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Skip the generic guesswork. Our hyper-personalized diagnostic engine analyzes texture, porosity, and structural health to map out custom clinical care routines.
          </motion.p>

          <motion.div 
            variants={fadeInVertical}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => router.push(isAuthenticated ? "/dashboard" : "/analysis")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] group"
            >
              {isAuthenticated ? "Go to Dashboard" : "Begin Hair Assessment"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            {sessionLoading ? (
              <div className="w-40 h-12 rounded-full bg-secondary/40 animate-pulse" />
            ) : isAuthenticated ? (
              <button 
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium transition-colors border border-border bg-card hover:bg-secondary text-foreground h-12 px-8 rounded-full shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                View Saved Prescription
              </button>
            ) : (
              <a 
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center text-base font-medium transition-colors border border-border bg-card hover:bg-secondary text-foreground h-12 px-8 rounded-full"
              >
                Explore Our Engine
              </a>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-20 bg-secondary/30 border-y border-border/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">
              Advanced Hair Metrics Analyzed
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              The platform evaluates your hair profile across four critical biological frameworks to maximize product efficacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scissors, label: "Porosity Profile", desc: "Measures cuticle moisture absorption capacity and moisture retention thresholds." },
              { icon: Droplet, label: "Scalp Hydration", desc: "Evaluates sebum production profiles to stabilize moisture barrier profiles smoothly." },
              { icon: Wind, label: "Elasticity & Density", desc: "Maps structural protein tensile limits against breakage risk variables." },
              { icon: User, label: "Follicle Patterns", desc: "Identifies explicit tight coils, wavy matrices, or fine curl patterns perfectly." }
            ].map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl border border-border/60 shadow-xs hover:shadow-sm transition-all hover:-translate-y-0.5 group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">{item.label}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}