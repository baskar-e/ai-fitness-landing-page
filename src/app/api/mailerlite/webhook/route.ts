import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getOptionalEnv, getRequiredEnv } from "@/lib/server-env";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type MailerLiteWebhookPayload = {
  email?: string;
  event?: string;
  type?: string;
  subscriber?: {
    email?: string;
  };
};

export async function POST(request: Request) {
  const payloadText = await request.text();
  const signature = request.headers.get("Signature") || request.headers.get("signature");

  if (!signature || !isValidSignature(payloadText, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let payload: MailerLiteWebhookPayload;

  try {
    payload = JSON.parse(payloadText) as MailerLiteWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const event = payload.event || payload.type;

  if (event !== "subscriber.unsubscribed") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const email = normalizeEmail(payload.email || payload.subscriber?.email);

  if (!email) {
    return NextResponse.json({ error: "Webhook payload is missing a valid email." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const waitlistTable = getOptionalEnv("SUPABASE_WAITLIST_TABLE", "waitlist_signups");
  const feedbackTable = getOptionalEnv("SUPABASE_FEEDBACK_TABLE", "beta_feedback");

  const [{ error: waitlistError }, { error: feedbackError }] = await Promise.all([
    supabase.from(waitlistTable).delete().eq("email", email),
    supabase.from(feedbackTable).delete().eq("email", email),
  ]);

  const error = waitlistError || feedbackError;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function isValidSignature(payloadText: string, signature: string) {
  const secret = getRequiredEnv("MAILERLITE_WEBHOOK_SECRET");
  const expected = createHmac("sha256", secret).update(payloadText).digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === signatureBuffer.length &&
    timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

function normalizeEmail(email: unknown) {
  if (typeof email !== "string") {
    return "";
  }

  const normalized = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : "";
}
