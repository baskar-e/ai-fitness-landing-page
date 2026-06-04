import { getOptionalEnv, getRequiredEnv } from "./server-env";

type MailerLiteSubscriber = {
  email: string;
  groupId?: string;
};

export async function syncMailerLiteSubscriber({ email, groupId }: MailerLiteSubscriber) {
  const groups = groupId ? [groupId] : undefined;
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRequiredEnv("MAILERLITE_API_KEY")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      ...(groups ? { groups } : {}),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message =
      typeof error?.message === "string"
        ? error.message
        : "Unable to sync subscriber with MailerLite.";

    throw new Error(message);
  }
}

export function getMailerLiteGroupId(key: "MAILERLITE_WAITLIST_GROUP_ID" | "MAILERLITE_FEEDBACK_GROUP_ID") {
  return getOptionalEnv(key, "");
}
