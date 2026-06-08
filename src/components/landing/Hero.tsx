'use client'

import Link from "next/link";
import { WaitlistForm } from "./WaitlistForm";
import { Activity, Flame, Sparkles, Utensils } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 xl:pt-36 pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Early access · Launching Q1
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Your Personal{" "}
            <span className="text-gradient-primary">AI Fitness Coach</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Get personalized workouts, smart meal plans, calorie tracking, and
            real-time form correction powered by AI.
          </p>

          <div className="mt-8 max-w-md">
            <WaitlistForm />
          </div>
          <p className="mt-2 ml-2 text-xs text-muted-foreground">
  By joining the waitlist, you agree to receive updates about FitAura.
  You can unsubscribe at any time.
</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href="#feedback"
              className="rounded-xl glass px-5 py-2.5 font-medium hover:border-secondary transition-colors"
            >
              Become a Beta Tester →
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background bg-linear-to-br from-primary to-secondary"
                />
              ))}
            </div>
            <span>
              <span className="text-foreground font-semibold">2,847</span> users already joined
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div
            aria-label="AI Fitness Coach mobile app showing workout progress dashboard"
            className="relative w-full max-w-md animate-float rounded-[2.5rem] border border-white/15 bg-background/80 p-3 xl:p-4 shadow-2xl"
          >
            <div className="rounded-[2rem] border border-border bg-card p-4 xl:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Today</p>
                  <h2 className="text-xl font-bold">Strength Focus</h2>
                </div>
                <div className="rounded-full bg-primary/15 p-3 text-primary">
                  <Activity className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 xl:mt-6 rounded-2xl bg-gradient-primary p-4 xl:p-5 text-primary-foreground shadow-glow">
                <p className="text-sm font-medium opacity-85">AI recommendation</p>
                <p className="mt-2 text-xl xl:text-2xl font-bold">42 min workout</p>
                <p className="mt-1 text-sm opacity-85">Lower-body power with form coaching</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Flame className="h-5 w-5 text-secondary" />
                  <p className="mt-3 text-xl xl:text-2xl font-bold">620</p>
                  <p className="text-xs text-muted-foreground">calories</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <Utensils className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-xl xl:text-2xl font-bold">132g</p>
                  <p className="text-xs text-muted-foreground">protein goal</p>
                </div>
              </div>

              <div className="mt-4 xl:mt-5 space-y-2 xl:space-y-3">
                {["Squat depth", "Recovery score", "Meal plan"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-muted/40 p-2.5 xl:p-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="flex-1 text-sm font-medium">{item}</span>
                    <span className="text-xs text-muted-foreground">{92 - index * 7}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
