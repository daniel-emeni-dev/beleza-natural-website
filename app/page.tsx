'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Leaf, Sparkles, Droplets, Shield, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);

  useEffect(() => {
    setShowFloatingButtons(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/95 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="fade-in flex flex-col">
            <h1 className="text-lg sm:text-xl font-light tracking-tight">Beleza Natural</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Healthy Hair Starts at the Root</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Button variant="ghost" className="fade-in-delay-1 text-xs sm:text-sm hover:bg-primary/5">About</Button>
            <Button variant="ghost" className="fade-in-delay-2 text-xs sm:text-sm hover:bg-primary/5">Services</Button>
            <Button className="fade-in-delay-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-4 sm:px-6 py-2">Book</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-scalp-treatment.jpg"
            alt="Professional scalp treatment and analysis"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-2xl">
          <div className="fade-in-up space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm">Advanced Hair Science</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight">
                Advanced Healthy & Natural Treatment for Hair & Skin
              </h2>
            </div>
            <p className="text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              Where clinical precision meets luxurious care. Our dermatologically-focused approach treats hair from the root—literally and scientifically.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-light text-base px-8 py-6 fade-in-delay-1 w-full sm:w-auto">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 font-light text-base px-8 py-6 fade-in-delay-2 w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Scalp Care Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 fade-in-up">
            <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Expert Care Philosophy</p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">Expert Scalp Care</h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We specialize in treating scalp buildup, flaking, and dandruff through scientific, non-invasive methods. Your scalp health is the foundation of beautiful, healthy hair.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="fade-in-up-delay-1 border border-border/40 rounded-lg p-6 sm:p-8 bg-background hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/8">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg sm:text-xl font-light mb-3">Gentle Exfoliation</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Scientifically formulated exfoliants that remove buildup without compromising scalp barrier integrity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="fade-in-up-delay-2 border border-border/40 rounded-lg p-6 sm:p-8 bg-background hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/8">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg sm:text-xl font-light mb-3">Follicle Restoration</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Advanced treatments designed to revive dormant follicles and restore optimal hair growth conditions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="fade-in-up-delay-3 border border-border/40 rounded-lg p-6 sm:p-8 bg-background hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/8">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg sm:text-xl font-light mb-3">Deep Nourishment</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Intensive hydration treatments that strengthen hair structure and enhance natural shine and resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hair Clinic - Friday Special Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="fade-in-up order-2 sm:order-1">
              <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Weekly Specialization</p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">The Hair Clinic</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                Every Friday, our specialized Hair Clinic opens exclusively for advanced consultations on:
              </p>
              
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {[
                  'Hair Loss Assessment & Treatment Plans',
                  'Breakage Analysis & Prevention Strategy',
                  'Dryness Management & Moisture Restoration',
                  'Personalized Scalp Health Program'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 fade-in-up" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                    <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-light px-8 py-6 fade-in-delay-3 w-full sm:w-auto">
                Book Friday Clinic
              </Button>
            </div>

            <div className="fade-in-up-delay-2 relative h-72 sm:h-96 rounded-lg overflow-hidden border border-border/40 order-1 sm:order-2">
              <Image
                src="/clinic-treatment.jpg"
                alt="Specialized Friday hair clinic consultation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Menu */}
      <section className="py-16 sm:py-24 lg:py-32 bg-secondary border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 fade-in-up">
            <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Our Expertise</p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">Premium Service Menu</h3>
            <p className="text-base sm:text-lg text-muted-foreground">
              Each service is tailored to your unique scalp and hair needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Scalp Cleansing',
                description: 'Deep clinical cleansing using medical-grade solutions to remove buildup, bacteria, and impurities while maintaining the scalp\'s natural pH balance.',
                delay: 'fade-in-up-delay-1'
              },
              {
                title: 'Protective Styling',
                description: 'Expert guidance on protective techniques and products to minimize damage, reduce breakage, and maintain hair health between appointments.',
                delay: 'fade-in-up-delay-2'
              },
              {
                title: 'Professional Consultation',
                description: 'One-on-one personalized assessment with our dermatology-trained specialists to create your custom hair and scalp care protocol.',
                delay: 'fade-in-up-delay-3'
              }
            ].map((service, i) => (
              <div key={i} className={`${service.delay} border border-border/40 rounded-lg p-6 sm:p-8 bg-background hover:border-primary/40 hover:shadow-lg transition-all duration-300`}>
                <h4 className="text-lg sm:text-xl font-light mb-3">{service.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 p-0 font-light">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up text-center mb-12 sm:mb-20">
              <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Trusted by Our Clients</p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-8">88% Recommend Beleza Natural</h3>
              
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 sm:w-6 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground mb-6">Based on 10+ verified client reviews</p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto italic">
                "The transformation in my hair health was visible within weeks. The clinic's scientific approach combined with genuine care created the perfect environment for my hair to thrive."
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {[
                { stat: '88%', label: 'Client Recommendation Rate' },
                { stat: '10+', label: 'Verified Reviews' },
                { stat: '100%', label: 'Scalp Health Improvement' }
              ].map((item, i) => (
                <div key={i} className={`fade-in-up-delay-${i + 1} text-center border border-border/40 rounded-lg p-6 sm:p-8 bg-secondary hover:border-primary/40 transition-colors duration-300`}>
                  <p className="text-3xl sm:text-4xl font-light text-primary mb-2">{item.stat}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center fade-in-up relative z-10">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-primary-foreground">
            Ready for Your Hair Transformation?
          </h3>
          <p className="text-base sm:text-lg text-primary-foreground/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start with a professional consultation to understand your unique scalp and hair needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-secondary hover:bg-secondary/90 text-foreground px-8 py-6 text-base font-light fade-in-delay-1 w-full sm:w-auto">
              Book Consultation
            </Button>
            <Button variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base font-light fade-in-delay-2 w-full sm:w-auto">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              {/* Location Info */}
              <div className="fade-in-up">
                <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Visit Us</p>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-8">Location</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-light text-base sm:text-lg">Beleza Natural Hair Clinic</p>
                      <p className="text-sm sm:text-base text-muted-foreground">115 Emekuku Street</p>
                      <p className="text-sm sm:text-base text-muted-foreground">New GRA, Port Harcourt</p>
                    </div>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 font-light w-full sm:w-auto fade-in-delay-1">
                  Get Directions
                </Button>
              </div>

              {/* Contact Info */}
              <div className="fade-in-up-delay-2">
                <p className="text-primary font-light tracking-widest uppercase text-xs sm:text-sm mb-4">Get in Touch</p>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-8">Contact Us</h3>
                
                <div className="space-y-4">
                  <a href="https://wa.me/2348126471290" target="_blank" rel="noopener noreferrer" className="flex gap-4 items-center p-4 border border-border/40 rounded-lg hover:bg-secondary hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-light text-sm sm:text-base">WhatsApp</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">0812 647 1290</p>
                    </div>
                  </a>

                  <a href="tel:+2347062450347" className="flex gap-4 items-center p-4 border border-border/40 rounded-lg hover:bg-secondary hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-light text-sm sm:text-base">Phone</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">0706 245 0347</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 sm:py-12 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 text-center text-muted-foreground">
          <p className="fade-in text-sm">© 2024 Beleza Natural Hair Clinic. All rights reserved.</p>
          <p className="text-xs mt-3 fade-in-delay-1 font-light">Healthy Hair Starts at the Root™</p>
        </div>
      </footer>

      {/* Floating Contact Buttons */}
      {showFloatingButtons && (
        <>
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2348126471290"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 fade-in hover:shadow-2xl"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>

          {/* Phone Call Button */}
          <a
            href="tel:+2347062450347"
            className="fixed bottom-28 right-6 sm:bottom-32 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl transition-all hover:scale-110 fade-in-delay-1 hover:shadow-2xl"
            aria-label="Call the clinic"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </>
      )}
    </div>
  );
}
