'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Leaf, Sparkles, Droplets, Shield, MapPin, MessageCircle, Phone, Zap, Brain } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { BackToTopButton } from '@/components/BackToTopButton';

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Home() {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const heroImageRef = useRef(null);
  const aiImageRef = useRef(null);
  const clinicImageRef = useRef(null);

  const { scrollY } = useScroll();

  // Parallax effect for hero image (only on desktop)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const heroY = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 100]);
  const aiY = useTransform(scrollY, [500, 1500], [0, isMobile ? 0 : 80]);
  const clinicY = useTransform(scrollY, [1500, 2500], [0, isMobile ? 0 : 80]);

  useEffect(() => {
    setShowFloatingButtons(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <BackToTopButton />

      {/* Glassmorphism Navigation */}
      <nav className="sticky top-0 z-40 glassmorphism border-b border-primary/10 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="fade-in flex flex-col">
            <h1 className="text-lg sm:text-xl font-serif font-semibold tracking-wide text-primary">Beleza Natural</h1>
            <p className="text-xs text-primary/60 hidden sm:block">Healthy Hair Starts at the Root</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Button variant="ghost" className="fade-in-delay-1 text-xs sm:text-sm text-primary hover:bg-primary/10">About</Button>
            <Button variant="ghost" className="fade-in-delay-2 text-xs sm:text-sm text-primary hover:bg-primary/10">Services</Button>
            <Button className="fade-in-delay-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg transition-transform hover:scale-105">Book</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/80"
      >
        <motion.div className="absolute inset-0 z-0" ref={heroImageRef} style={{ y: heroY }}>
          <Image
            src="/hero-diverse-woman.jpg"
            alt="Black woman with natural hair receiving advanced scalp treatment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/70" />
          {/* Holographic grid effect */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(167, 243, 208, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 243, 208, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
          <div className="fade-in-up space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm">Next-Gen Hair Science</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight text-foreground leading-tight">
                Advanced Healthy & Natural Treatment for Hair & Skin
              </h2>
            </div>
            <p className="text-base sm:text-lg text-foreground/85 max-w-xl leading-relaxed font-light">
              Where clinical precision meets futuristic wellness. AI-powered analysis meets expert dermatological care for your healthiest hair journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 fade-in-delay-1 w-full sm:w-auto rounded-lg transition-transform hover:scale-105">
                Start Analysis
              </Button>
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 font-light text-base px-8 py-6 fade-in-delay-2 w-full sm:w-auto rounded-lg transition-transform hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Scalp Analysis AI Teaser */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32 border-t border-primary/10 relative overflow-hidden bg-secondary"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* AI Scanning Animation */}
            <motion.div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden scan-animation" ref={aiImageRef} style={{ y: aiY }}>
              <Image
                src="/scalp-ai-analysis.jpg"
                alt="AI scalp analysis technology with holographic visualization"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-2 border-primary rounded-full animate-spin opacity-50" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase">AI Technology</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-6 text-foreground">
                Scalp Analysis <span className="gradient-text">AI</span>
              </h3>
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-8">
                Our proprietary AI scans your scalp with precision, identifying specific concerns and creating personalized treatment protocols tailored to your unique hair biology.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time scalp health assessment',
                  'Personalized treatment recommendations',
                  'Progress tracking with visual data'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-foreground/80">
                    <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-lg transition-transform hover:scale-105">
                Take Diagnostic Quiz
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Expert Scalp Care Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32 bg-secondary border-y border-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 fade-in-up">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Specialized Care</p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-6 text-foreground">Expert Scalp Care</h3>
            <p className="text-base sm:text-lg text-foreground/70">
              Treating scalp buildup, flaking, and dandruff through advanced, science-backed methods
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Gentle Exfoliation', desc: 'Scientifically formulated exfoliants removing buildup without compromising scalp integrity', icon: Sparkles, delay: 1 },
              { title: 'Follicle Restoration', desc: 'Advanced treatments reviving dormant follicles and restoring optimal hair growth', icon: Leaf, delay: 2 },
              { title: 'Deep Nourishment', desc: 'Intensive hydration strengthening hair and enhancing natural shine', icon: Shield, delay: 3 }
            ].map((card, i) => (
              <div 
                key={i} 
                className="sticky-card glassmorphism-light rounded-xl p-6 sm:p-8 hover:border-primary/40 hover:glow-emerald-sm transition-all duration-300"
                style={{ top: `${120 + i * 20}px` }}
                data-scroll-animate
              >
                <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/10">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-serif font-semibold mb-3 text-foreground">{card.title}</h4>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hair Clinic - Friday Special */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="fade-in-up order-2 sm:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase">Exclusive Access</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-6 text-foreground">The Hair Clinic</h3>
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-8">
                Every Friday, our specialized clinic opens for advanced consultations on hair loss, breakage, and dryness.
              </p>
              
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {[
                  'Hair Loss Assessment & Treatment Plans',
                  'Breakage Analysis & Prevention Strategy',
                  'Dryness Management & Moisture Restoration',
                  'Personalized Scalp Health Program'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-lg w-full sm:w-auto transition-transform hover:scale-105">
                Book Friday Clinic
              </Button>
            </div>

            <motion.div className="fade-in-up-delay-2 relative h-72 sm:h-96 rounded-2xl overflow-hidden order-1 sm:order-2 scan-animation" ref={clinicImageRef} style={{ y: clinicY }}>
              <Image
                src="/woman-with-locs.jpg"
                alt="Black woman with locs receiving specialized hair clinic treatment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Menu */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32 bg-secondary border-y border-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 fade-in-up">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Premium Services</p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-6 text-foreground">Our Services</h3>
            <p className="text-base sm:text-lg text-foreground/70">
              Tailored solutions for your unique scalp and hair needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Scalp Cleansing',
                description: 'Deep clinical cleansing using medical-grade solutions to remove buildup, bacteria, and impurities.',
              },
              {
                title: 'Protective Styling',
                description: 'Expert guidance on protective techniques and products to minimize damage and reduce breakage.',
              },
              {
                title: 'Professional Consultation',
                description: 'Personalized assessment with our dermatology-trained specialists to create your custom protocol.',
              }
            ].map((service, i) => (
              <div key={i} className="glassmorphism-light rounded-xl p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 group hover:glow-emerald-sm" data-scroll-animate>
                <h4 className="text-lg sm:text-xl font-serif font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6">{service.description}</p>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 p-0 font-semibold">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social Proof */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up text-center mb-12 sm:mb-20">
              <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Trusted Results</p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-8 text-foreground">88% Recommend Beleza Natural</h3>
              
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 sm:w-6 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-foreground/70 mb-6">Based on 10+ verified client reviews</p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/60 max-w-2xl mx-auto italic">
                "The transformation in my hair health was visible within weeks. The clinic's scientific approach combined with genuine care created the perfect environment for my hair to thrive."
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {[
                { stat: '88%', label: 'Client Recommendation Rate' },
                { stat: '10+', label: 'Verified Reviews' },
                { stat: '100%', label: 'Scalp Health Improvement' }
              ].map((item, i) => (
                <div key={i} className="glassmorphism rounded-xl p-6 sm:p-8 text-center hover:border-primary/40 hover:glow-emerald-sm transition-all duration-300" data-scroll-animate>
                  <p className="text-3xl sm:text-4xl font-serif font-semibold text-primary mb-2">{item.stat}</p>
                  <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32 bg-secondary border-t border-primary/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center fade-in-up relative z-10">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 text-foreground">
            Ready for Your Hair <span className="gradient-text">Transformation?</span>
          </h3>
          <p className="text-base sm:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start with our AI scalp analysis and personalized consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold fade-in-delay-1 w-full sm:w-auto rounded-lg transition-transform hover:scale-105">
              Book Consultation
            </Button>
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-6 text-base font-light fade-in-delay-2 w-full sm:w-auto rounded-lg transition-transform hover:scale-105">
              View Services
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Location & Contact */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        className="py-16 sm:py-24 lg:py-32 border-t border-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="fade-in-up">
                <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Visit Us</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight mb-8 text-foreground">Location</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-base sm:text-lg text-foreground">Beleza Natural Hair Clinic</p>
                      <p className="text-sm sm:text-base text-foreground/60">115 Emekuku Street</p>
                      <p className="text-sm sm:text-base text-foreground/60">New GRA, Port Harcourt</p>
                    </div>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 font-semibold w-full sm:w-auto rounded-lg transition-transform hover:scale-105 fade-in-delay-1">
                  Get Directions
                </Button>
              </div>

              <div className="fade-in-up-delay-2">
                <p className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">Get in Touch</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight mb-8 text-foreground">Contact Us</h3>
                
                <div className="space-y-4">
                  <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center p-4 glassmorphism-light rounded-lg hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-foreground">WhatsApp</p>
                      <p className="text-xs sm:text-sm text-foreground/60">+234 801 234 5678</p>
                    </div>
                  </a>

                  <a href="tel:+2348012345679" className="flex gap-4 items-center p-4 glassmorphism-light rounded-lg hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-foreground">Phone</p>
                      <p className="text-xs sm:text-sm text-foreground/60">+234 801 234 5679</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 sm:py-12 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 text-center text-foreground/60">
          <p className="fade-in text-sm">© 2024 Beleza Natural Hair Clinic. All rights reserved.</p>
          <p className="text-xs mt-3 fade-in-delay-1 font-light">Healthy Hair Starts at the Root™</p>
        </div>
      </footer>

      {/* Floating Contact Buttons */}
      {showFloatingButtons && (
        <>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl transition-all hover:scale-110 fade-in hover:shadow-2xl glow-emerald"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>

          <a
            href="tel:+2348012345679"
            className="fixed bottom-28 right-6 sm:bottom-32 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl transition-all hover:scale-110 fade-in-delay-1 hover:shadow-2xl glow-emerald"
            aria-label="Call the clinic"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </>
      )}
    </div>
  );
}
