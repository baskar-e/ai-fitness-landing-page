const testimonials = [
  {
    quote:
      "The pose correction caught my squat depth issue in week one. Three months in, I've added 40 lbs to my back squat.",
    name: "Marcus T.",
    role: "Beta tester · Intermediate lifter",
  },
  {
    quote:
      "I tried five fitness apps before this. The AI meal plans actually fit my schedule — and I finally lost 18 lbs.",
    name: "Priya S.",
    role: "Beta tester · Beginner",
  },
  {
    quote:
      "Feels like having a coach in my pocket. The adaptive workouts mean I never plateau or burn out.",
    name: "Jordan K.",
    role: "Beta tester · Athlete",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-widest">Early users</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Real results from the beta.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-gradient-card border border-border p-6 flex flex-col"
            >
              <blockquote className="text-foreground/90 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
