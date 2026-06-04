import { NextResponse } from "next/server";
import { getMailerLiteGroupId, syncMailerLiteSubscriber } from "@/lib/mailerlite";
import { getOptionalEnv } from "@/lib/server-env";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type WaitlistPayload = {
  email?: string;
  source?: string;
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
    const source = payload.source || "landing_page";

    const { error } = await supabase.from(table).insert({
      email,
      source,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await syncMailerLiteSubscriber({
      email,
      groupId: getMailerLiteGroupId("MAILERLITE_WAITLIST_GROUP_ID"),
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
