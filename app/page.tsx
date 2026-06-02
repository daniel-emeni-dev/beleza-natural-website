"use client";

import { useState, useEffect } from "react";
import HairQuiz from "@/components/HairQuiz";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  Droplet, 
  Wind, 
  User 
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll height to add a beautiful glassmorphism effect to the Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden selection:bg-primary/10">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Beleza Natural
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Methodology</a>
            <a href="#benefits" className="hover:text-foreground transition-colors">Analysis Engine</a>
            <a href="#clinic" className="hover:text-foreground transition-colors">Clinical System</a>
          </nav>

          <button 
            onClick={() => setShowQuiz(true)}
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Analysis
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="pt-32 pb-24 md:pt-40 md:pb-32 max-w-7xl mx-auto px-6 relative">
        {/* Subtle Background Glow Blurs */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
              onClick={() => setShowQuiz(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] group"
            >
              Begin Hair Assessment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center text-base font-medium transition-colors border border-border bg-card hover:bg-secondary text-foreground h-12 px-8 rounded-full"
            >
              Explore Our Engine
            </a>
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
              { icon: Scissors, label: "Porosity Profile", desc: "Measures cuticle moisture absorption capacity and moisture retention retention thresholds." },
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

      {/* QUIZ MODAL W/ ANIMATEPRESENCE FOR SMOOTH LIFECYCLE CLOSES */}
      <AnimatePresence>
        {showQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuiz(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            
            {/* Center Modal Card Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl relative overflow-hidden z-10 p-6 sm:p-8"
            >
              {/* The clean instance: HairQuiz completely owns the inside layout framework */}
              <HairQuiz onClose={() => setShowQuiz(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}