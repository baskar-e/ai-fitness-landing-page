import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section id="waitlist" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative rounded-3xl bg-gradient-card border border-primary/30 p-10 md:p-16 text-center overflow-hidden shadow-glow">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[120%] bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Be among the first to try the{" "}
              <span className="text-gradient-primary">future of fitness.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join 2,800+ athletes on the waitlist. Early users get founder pricing for life.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <WaitlistForm source="final_cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
