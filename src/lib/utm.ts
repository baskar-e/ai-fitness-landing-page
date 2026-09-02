export type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export function normalizeUtmValue(value: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}
