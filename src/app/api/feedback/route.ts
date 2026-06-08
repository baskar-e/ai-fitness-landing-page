import { NextResponse } from "next/server";
import { getMailerLiteGroupId, syncMailerLiteSubscriber } from "@/lib/mailerlite";
import { getOptionalEnv } from "@/lib/server-env";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type FeedbackPayload = {
  email?: string;
  fitness_goal?: string;
  biggest_challenge?: string;
  most_interesting_feature?: string;
  would_pay?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as FeedbackPayload;
    const email = normalizeEmail(payload.email);

    if (!email) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const table = getOptionalEnv("SUPABASE_FEEDBACK_TABLE", "beta_feedback");

    const { data: existing, error: existingError } = await supabase
      .from(table)
      .select("id")
      .eq("email", email)
      .maybeSingle<{ id: number }>();

    if (existingError) {
      return NextResponse.json({ error: existingError.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({
        ok: true,
        alreadyJoined: true,
        message: "You have already joined the beta program.",
      });
    }

    const { error } = await supabase.from(table).insert({
      email,
      fitness_goal: cleanText(payload.fitness_goal),
      biggest_challenge: cleanText(payload.biggest_challenge),
      most_interesting_feature: cleanText(payload.most_interesting_feature),
      would_pay: cleanText(payload.would_pay),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await syncMailerLiteSubscriber({
      email,
      groupId: getMailerLiteGroupId("MAILERLITE_FEEDBACK_GROUP_ID"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong." },
      { status: 500 }
    );
  }
}

function normalizeEmail(email: unknown) {
  if (typeof email !== "string") {
    return "";
  }

  const normalized = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : "";
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
