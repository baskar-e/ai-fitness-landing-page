import { XCircle } from "lucide-react";

const problems = [
  { title: "Generic workout plans", desc: "Cookie-cutter routines that ignore your goals, body, and equipment." },
  { title: "Lack of consistency", desc: "Motivation fades after week two. You stop tracking. You stop showing up." },
  { title: "Poor nutrition tracking", desc: "Logging meals feels like a part-time job — so you skip it." },
  { title: "Incorrect exercise form", desc: "Bad reps quietly stall progress and rack up injuries." },
  { title: "No personalized guidance", desc: "Trainers are expensive. YouTube doesn't know you." },
];

export function Problem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-secondary uppercase tracking-widest">The reality</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Why most people <span className="text-gradient-accent">never reach</span> their fitness goals.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-gradient-card border border-border p-6 hover:border-secondary/50 transition-colors"
            >
              <XCircle className="h-6 w-6 text-secondary mb-4" />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
