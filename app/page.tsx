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
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="fade-in">
            <h1 className="text-xl font-semibold tracking-tight">Beleza Natural</h1>
            <p className="text-xs text-muted-foreground">Healthy Hair Starts at the Root</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="fade-in-delay-1 text-sm">About</Button>
            <Button variant="ghost" className="fade-in-delay-2 text-sm">Services</Button>
            <Button className="fade-in-delay-3 bg-primary hover:bg-primary/90 text-primary-foreground">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-scalp-treatment.jpg"
            alt="Professional scalp treatment and analysis"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-2xl">
          <div className="fade-in-up space-y-6">
            <div className="space-y-2">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm">Advanced Hair Science</p>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
                Advanced Healthy & Natural Treatment for Hair & Skin
              </h2>
            </div>
            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              Where clinical precision meets luxurious care. Our dermatologically-focused approach treats hair from the root—literally and scientifically.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 fade-in-delay-1">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8 py-6 fade-in-delay-2">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Scalp Care Section */}
      <section className="py-24 bg-secondary border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-in-up">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Expert Care Philosophy</p>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Expert Scalp Care</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in treating scalp buildup, flaking, and dandruff through scientific, non-invasive methods. Your scalp health is the foundation of beautiful, healthy hair.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="fade-in-up-delay-1 border border-border rounded-md p-8 bg-background hover:border-primary/30 transition-colors">
              <div className="mb-6 inline-flex p-4 rounded-md bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Gentle Exfoliation</h4>
              <p className="text-muted-foreground leading-relaxed">
                Scientifically formulated exfoliants that remove buildup without compromising scalp barrier integrity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="fade-in-up-delay-2 border border-border rounded-md p-8 bg-background hover:border-primary/30 transition-colors">
              <div className="mb-6 inline-flex p-4 rounded-md bg-primary/10">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Follicle Restoration</h4>
              <p className="text-muted-foreground leading-relaxed">
                Advanced treatments designed to revive dormant follicles and restore optimal hair growth conditions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="fade-in-up-delay-3 border border-border rounded-md p-8 bg-background hover:border-primary/30 transition-colors">
              <div className="mb-6 inline-flex p-4 rounded-md bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Deep Nourishment</h4>
              <p className="text-muted-foreground leading-relaxed">
                Intensive hydration treatments that strengthen hair structure and enhance natural shine and resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hair Clinic - Friday Special Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Weekly Specialization</p>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-6">The Hair Clinic</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every Friday, our specialized Hair Clinic opens exclusively for advanced consultations on:
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Hair Loss Assessment & Treatment Plans',
                  'Breakage Analysis & Prevention Strategy',
                  'Dryness Management & Moisture Restoration',
                  'Personalized Scalp Health Program'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 fade-in-up" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                    <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 fade-in-delay-3">
                Book Friday Clinic
              </Button>
            </div>

            <div className="fade-in-up-delay-2 relative h-96 rounded-md overflow-hidden border border-border">
              <Image
                src="/clinic-treatment.jpg"
                alt="Specialized Friday hair clinic consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Menu */}
      <section className="py-24 bg-secondary border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 fade-in-up">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Our Expertise</p>
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Premium Service Menu</h3>
            <p className="text-lg text-muted-foreground">
              Each service is tailored to your unique scalp and hair needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Scalp Cleansing',
                description: 'Deep clinical cleansing using medical-grade solutions to remove buildup, bacteria, and impurities while maintaining the scalp\'s natural pH balance.',
                delay: 'delay-1'
              },
              {
                title: 'Protective Styling',
                description: 'Expert guidance on protective techniques and products to minimize damage, reduce breakage, and maintain hair health between appointments.',
                delay: 'delay-2'
              },
              {
                title: 'Professional Consultation',
                description: 'One-on-one personalized assessment with our dermatology-trained specialists to create your custom hair and scalp care protocol.',
                delay: 'delay-3'
              }
            ].map((service, i) => (
              <div key={i} className={`fade-in-up-${service.delay} border border-border rounded-md p-8 bg-background hover:shadow-lg hover:border-primary/30 transition-all`}>
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 p-0">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-up text-center mb-16">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Trusted by Our Clients</p>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8">88% Recommend Beleza Natural</h3>
              
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-xl text-muted-foreground mb-4">Based on 10+ verified client reviews</p>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                "The transformation in my hair health was visible within weeks. The clinic's scientific approach combined with genuine care created the perfect environment for my hair to thrive."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { stat: '88%', label: 'Client Recommendation Rate' },
                { stat: '10+', label: 'Verified Reviews' },
                { stat: '100%', label: 'Scalp Health Improvement' }
              ].map((item, i) => (
                <div key={i} className={`fade-in-up-delay-${i + 1} text-center border border-border rounded-md p-8 bg-secondary`}>
                  <p className="text-4xl font-light text-primary mb-2">{item.stat}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center fade-in-up">
          <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-primary-foreground">
            Ready for Your Hair Transformation?
          </h3>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start with a professional consultation to understand your unique scalp and hair needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-secondary hover:bg-secondary/90 text-foreground px-8 py-6 text-base fade-in-delay-1">
              Book Consultation
            </Button>
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base fade-in-delay-2">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Location Info */}
              <div className="fade-in-up">
                <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Visit Us</p>
                <h3 className="text-3xl font-light tracking-tight mb-6">Location</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Beleza Natural Hair Clinic</p>
                      <p className="text-muted-foreground">115 Emekuku Street</p>
                      <p className="text-muted-foreground">New GRA, Port Harcourt</p>
                    </div>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 w-full sm:w-auto fade-in-delay-1">
                  Get Directions
                </Button>
              </div>

              {/* Contact Info */}
              <div className="fade-in-up-delay-2">
                <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Get in Touch</p>
                <h3 className="text-3xl font-light tracking-tight mb-6">Contact Us</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-center p-4 border border-border rounded-md hover:bg-secondary transition-colors">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-muted-foreground">0812 647 1290</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center p-4 border border-border rounded-md hover:bg-secondary transition-colors">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">0706 245 0347</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="fade-in">© 2024 Beleza Natural Hair Clinic. All rights reserved.</p>
          <p className="text-sm mt-2 fade-in-delay-1">Healthy Hair Starts at the Root™</p>
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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 fade-in"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Phone Call Button */}
          <a
            href="tel:+2347062450347"
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110 fade-in-delay-1"
            aria-label="Call the clinic"
          >
            <Phone className="w-6 h-6" />
          </a>
        </>
      )}
    </div>
  );
}
