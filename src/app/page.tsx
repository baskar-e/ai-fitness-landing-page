'use client'

import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FeedbackForm } from "@/components/landing/FeedbackForm";
import { FinalCTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Toaster theme="dark" position="top-center" richColors />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Introducing FitAura
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
              An AI-powered fitness companion that{" "}
              <span className="text-gradient-primary">adapts to every user.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              FitAura learns your body, your goals, and your schedule — then builds the
              workout, nutrition, and recovery plan that actually works for you.
            </p>
          </div>
        </section>
        <Features />
        <HowItWorks />
        <section id="feedback" className="py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest">
                Beta program
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold">Shape the product.</h2>
              <p className="mt-3 text-muted-foreground">
                Tell us about your goals. Get free beta access and a direct line to the team.
              </p>
            </div>
            <FeedbackForm />
          </div>
        </section>
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
