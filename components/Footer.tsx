"use client";

import { useState } from "react"; // Added to manage interactive submission flows
import Link from "next/link";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Handle interactive state mutations for our newsletter subscription area
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    // Simulating a fast, lightweight background API dispatch signal
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <footer className="w-full bg-card border-t-2 border-border py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold tracking-tight text-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Beleza Natural
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
            Simple, clear, and practical natural hair care routines built specifically for your unique journey.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Navigation</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <Link href="/#features" className="hover:text-primary transition-colors">Our Approach</Link>
            </li>
            <li>
              <Link href="/analysis" className="hover:text-primary transition-colors">Take the Quiz</Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Input/Newsletter Box Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Stay Updated</h4>
          <p className="text-xs text-muted-foreground">Get practical tips sent straight to your screen.</p>
          
          {status === "success" ? (
            /* Micro-Interaction Success Badge Panel */
            <div className="p-3 bg-primary/5 border-2 border-primary rounded-xl flex items-center gap-2.5 max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs font-semibold text-primary">You're on the insider list! Welcome.</p>
            </div>
          ) : (
            /* Active Form Layout Group */
            <form onSubmit={handleSubscribe} className="flex max-w-sm items-center space-x-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                placeholder="Your email address" 
                className="flex h-9 w-full rounded-xl border-2 border-border bg-background px-3 py-1 text-xs shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="inline-flex items-center justify-center rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none min-w-[64px]"
              >
                {status === "loading" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Join"
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
        <p>&copy; {currentYear} Beleza Natural Hair Clinic. All rights reserved.</p>
        <p className="font-serif italic font-medium">Crafted for natural curls & coils</p>
      </div>
    </footer>
  );
}