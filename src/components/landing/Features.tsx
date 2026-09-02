'use client'

import { Brain, UtensilsCrossed, Flame, ScanLine, LineChart, Trophy } from "lucide-react";
import Image from "next/image";
// import poseImg from "@/assets/pose-correction.jpg";

const features = [
  {
    icon: Brain,
    title: "AI Workout Plans",
    desc: "Personalized routines based on your goals, fitness level, equipment, and schedule. Adapts daily as you progress.",
  },
  {
    icon: UtensilsCrossed,
    title: "AI Meal Planning",
    desc: "Smart meal suggestions tailored to weight loss, muscle gain, or maintenance — with macros that actually fit your life.",
  },
  {
    icon: Flame,
    title: "Calorie Tracking",
    desc: "Snap, log, done. Automatic calorie estimation and full macronutrient breakdown in seconds.",
  },
  {
    icon: LineChart,
    title: "Progress Dashboard",
    desc: "Weight, strength, and workout history visualized so you actually see the curve trending up.",
  },
  {
    icon: Trophy,
    title: "Streaks & Badges",
    desc: "A gamified motivation system with milestones and rewards that make showing up addictive.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">The solution</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            One AI coach. <span className="text-gradient-primary">Everything you need.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built to adapt to every user — your training, your food, your form, your wins.
          </p>
        </div>

        {/* Featured: AI Pose Correction */}
        <div className="mt-14 rounded-3xl overflow-hidden bg-gradient-card border border-border grid lg:grid-cols-2">
          <div className="p-10 md:p-12 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <ScanLine className="h-3.5 w-3.5" /> Flagship feature
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl font-bold">AI Pose Correction</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Point your camera. Get real-time form feedback on every rep — knee tracking,
              spine alignment, depth, tempo. Reduce injuries and unlock results most lifters
              never see.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Camera-based exercise analysis", "Real-time posture corrections", "Injury risk alerts"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-foreground/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-80 lg:min-h-115">
            <Image
              src={'/pose-correction.png'}
              alt="AI pose detection overlay analyzing squat form"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-card via-transparent to-transparent lg:from-card/80" />
          </div>
        </div>
  
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl bg-gradient-card border border-border p-6 hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
