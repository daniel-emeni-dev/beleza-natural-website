"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background page body from rolling around underneath an open menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/90 backdrop-blur-md border-b-2 border-border py-3 shadow-xs"
        : "bg-background/40 backdrop-blur-xs py-5" /* Added a light backdrop safety net here */
      }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-foreground select-none"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          Beleza Natural
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/#features" className="hover:text-foreground transition-colors">Our Approach</Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-primary font-semibold hover:opacity-80 transition-opacity">
              <LayoutDashboard className="w-3.5 h-3.5" />
              My Routine
            </Link>
          )}
        </nav>

        {/* Desktop Action Trigger */}
        <div className="hidden md:block">
          <Link
            href={isAuthenticated ? "/dashboard" : "/analysis"}
            className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 rounded-full transition-all active:scale-98 shadow-sm"
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Free Quiz"}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 text-foreground rounded-xl border-2 border-transparent active:border-border transition-colors focus:outline-none"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Fluid Animated Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b-2 border-border p-6 shadow-xl flex flex-col h-[calc(100vh-64px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-5 text-lg font-medium text-muted-foreground mt-4">
              <Link
                href="/#features"
                onClick={() => setIsOpen(false)}
                className={`py-2 transition-colors ${pathname === "/" ? "text-foreground font-semibold" : ""}`}
              >
                Our Approach
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 py-2 transition-colors ${pathname === "/dashboard" ? "text-primary font-bold" : "text-primary"}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  My Routine Dashboard
                </Link>
              )}
            </nav>

            <div className="mt-auto pb-8">
              <Link
                href={isAuthenticated ? "/dashboard" : "/analysis"}
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground text-sm h-12 px-5 rounded-full shadow-sm active:scale-98 transition-transform"
              >
                {isAuthenticated ? "Open My Dashboard" : "Take the Hair Quiz"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}