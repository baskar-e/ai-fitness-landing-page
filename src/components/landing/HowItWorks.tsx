const steps = [
  { n: "01", title: "Set your fitness goals", desc: "Tell us what you want — fat loss, muscle, endurance, all of it." },
  { n: "02", title: "Get your personalized AI plan", desc: "Workouts and meals generated for your body, equipment, and schedule." },
  { n: "03", title: "Track workouts and meals", desc: "One-tap logging. AI fills in the rest." },
  { n: "04", title: "Improve form with AI camera", desc: "Real-time pose correction on every rep." },
  { n: "05", title: "Monitor progress, stay consistent", desc: "Streaks, charts, and weekly insights that keep you on track." },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">How it works</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">From signup to PR in five steps.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl bg-gradient-card border border-border p-6"
            >
              <div className="font-display text-3xl font-bold text-gradient-primary">{s.n}</div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 h-px w-4 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
