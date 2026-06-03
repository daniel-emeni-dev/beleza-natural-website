"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <div className="flex max-w-sm items-center space-x-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-9 w-full rounded-xl border-2 border-border bg-background px-3 py-1 text-xs shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button className="inline-flex items-center justify-center rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 transition-colors">
              Join
            </button>
          </div>
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