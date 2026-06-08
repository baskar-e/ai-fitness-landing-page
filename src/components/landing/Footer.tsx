'use client'

import { Dumbbell } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Dumbbell className="h-4 w-4" />
            </span>
            FitAura
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Your personal AI fitness coach. Workouts, meals, and form — all adapted to you.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#feedback" className="hover:text-foreground">Beta program</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#waitlist" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex md:justify-end gap-3 items-start">
          {/* {[Twitter, Instagram, Github].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="h-10 w-10 rounded-xl glass flex items-center justify-center hover:border-primary transition-colors"
              aria-label="Social link"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))} */}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <div>© {new Date().getFullYear()} FitAura. All rights reserved.</div>
        <div>Train smarter. Eat better. Progress faster.</div>
      </div>
    </footer>
  );
}
