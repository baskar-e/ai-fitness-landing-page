export type RequiredEnvKey =
  | "SUPABASE_URL"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "MAILERLITE_API_KEY"
  | "MAILERLITE_WEBHOOK_SECRET";

export function getRequiredEnv(key: RequiredEnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getOptionalEnv(key: string, fallback: string) {
  return process.env[key] || fallback;
}
