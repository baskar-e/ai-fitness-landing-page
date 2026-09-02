import { NextResponse } from "next/server";
import { getMailerLiteGroupId, syncMailerLiteSubscriber } from "@/lib/mailerlite";
import { getOptionalEnv } from "@/lib/server-env";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type WaitlistPayload = {
  email?: string;
  source?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as WaitlistPayload;
    const email = normalizeEmail(payload.email);

    if (!email) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const table = getOptionalEnv("SUPABASE_WAITLIST_TABLE", "waitlist_signups");
    const source = payload.source || "waitlist";

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
        message: "You have already joined the waitlist.",
      });
    }

    const { data, error } = await supabase
      .from(table)
      .insert({
        email,
        source,
        utm_source: cleanNullableText(payload.utm_source),
        utm_medium: cleanNullableText(payload.utm_medium),
        utm_campaign: cleanNullableText(payload.utm_campaign),
      })
      .select("id")
      .single<{ id: number }>();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await syncMailerLiteSubscriber({
      email,
      groupId: getMailerLiteGroupId("MAILERLITE_WAITLIST_GROUP_ID"),
      fields: {
        waitlist_position: data.id,
      },
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

function cleanNullableText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
}
