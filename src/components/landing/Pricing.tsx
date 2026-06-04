'use client'

import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    desc: "Get started with the essentials.",
    features: ["Basic AI workout plans", "Calorie tracking", "Progress dashboard", "Streaks & badges"],
    cta: "Join waitlist",
    highlighted: false,
  },
  {
    name: "Premium AI Coach",
    price: "$14.99",
    suffix: "/ mo",
    desc: "The full AI coach experience.",
    features: [
      "Adaptive AI workouts",
      "AI meal planning",
      "AI pose correction",
      "Advanced analytics & insights",
      "Priority support",
    ],
    cta: "Get early-bird pricing",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Coming soon</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Simple pricing. Real value.</h2>
          <p className="mt-3 text-muted-foreground">Lock in early-bird rates by joining the waitlist now.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "rounded-3xl p-8 border " +
                (t.highlighted
                  ? "bg-gradient-card border-primary/50 shadow-glow"
                  : "bg-gradient-card border-border")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                {t.highlighted && (
                  <span className="text-xs font-semibold bg-primary/15 text-primary rounded-full px-3 py-1">
                    Most popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold font-display">{t.price}</span>
                {t.suffix && <span className="text-muted-foreground">{t.suffix}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#waitlist"
                className={
                  "mt-8 inline-flex w-full justify-center rounded-xl px-5 py-3 font-semibold transition " +
                  (t.highlighted
                    ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                    : "glass hover:border-primary")
                }
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
