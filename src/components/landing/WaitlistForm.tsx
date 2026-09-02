"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { normalizeUtmValue, type UtmParams } from "@/lib/utm";

export function WaitlistForm({ source = "waitlist" }: { source?: string }) {
  return (
    <Suspense fallback={null}>
      <WaitlistFormInner source={source} />
    </Suspense>
  );
}

function WaitlistFormInner({ source = "waitlist" }: { source?: string }) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const utm: UtmParams = {
    utm_source: normalizeUtmValue(searchParams.get("utm_source")) || "direct",
    utm_medium: normalizeUtmValue(searchParams.get("utm_medium")),
    utm_campaign: normalizeUtmValue(searchParams.get("utm_campaign")),
  };

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source, ...utm }),
      });
      const result = (await response.json()) as {
        alreadyJoined?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to join the waitlist right now");
      }

      setDone(true);
      toast.success(
        result.alreadyJoined
          ? result.message || "You have already joined the waitlist."
          : "You are on the waitlist. Check your inbox."
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl glass px-5 py-4 text-sm">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <span>You are in. Watch your inbox for early access.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gradient-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join the Waitlist"}
      </button>
    </form>
  );
}
