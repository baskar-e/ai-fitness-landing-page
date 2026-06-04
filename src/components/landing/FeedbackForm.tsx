"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

const goals = ["Lose weight", "Build muscle", "Improve endurance", "General health", "Athletic performance"];
const features = ["AI workout plans", "AI meal planning", "Calorie tracking", "AI pose correction", "Progress dashboard"];
const payOptions = ["Yes, definitely", "Maybe — depends on price", "Only the free version", "Not sure yet"];

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: "",
    fitness_goal: "",
    biggest_challenge: "",
    most_interesting_feature: "",
    would_pay: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit feedback right now");
      }

      setDone(true);
      toast.success("Thanks! Your feedback is saved. Check your inbox.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-gradient-card border border-primary/40 p-10 text-center shadow-glow">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
        <h3 className="mt-4 text-2xl font-bold font-display">You are now a beta tester.</h3>
        <p className="mt-2 text-muted-foreground">
          We will reach out via email when your beta invite is ready.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-gradient-card border border-border p-6 md:p-10 space-y-6"
    >
      <Field label="Email address">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
        />
      </Field>

      <Field label="What is your primary fitness goal?">
        <ChipGroup options={goals} value={form.fitness_goal} onChange={(v) => update("fitness_goal", v)} />
      </Field>

      <Field label="What is your biggest challenge in staying fit?">
        <textarea
          rows={3}
          value={form.biggest_challenge}
          onChange={(e) => update("biggest_challenge", e.target.value)}
          placeholder="e.g. consistency, not knowing what to eat, plateauing..."
          className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
        />
      </Field>

      <Field label="Which feature interests you most?">
        <ChipGroup options={features} value={form.most_interesting_feature} onChange={(v) => update("most_interesting_feature", v)} />
      </Field>

      <Field label="Would you pay for an AI fitness coach?">
        <ChipGroup options={payOptions} value={form.would_pay} onChange={(v) => update("would_pay", v)} />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-glow hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit & Become a Beta Tester"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground/90">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={
              "rounded-full px-4 py-2 text-sm font-medium border transition " +
              (selected
                ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground")
            }
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
