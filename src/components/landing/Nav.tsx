'use client'

import { Dumbbell } from "lucide-react";
import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass rounded-2xl flex items-center justify-between px-5 py-3">
          <Link href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <Dumbbell className="h-4 w-4" />
            </span>
            <span>FitAura</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how" className="hover:text-foreground transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#feedback" className="hover:text-foreground transition-colors">Beta</Link>
          </nav>
          <Link
            href="#waitlist"
            className="rounded-xl bg-gradient-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
