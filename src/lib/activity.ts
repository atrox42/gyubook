import type { Activity } from "@/types/look";

export const ACTIVITY_FILTERS = [
  { id: "all", label: "ALL", en: "ALL" },
  { id: "hiking", label: "HIKE", en: "HIKE" },
  { id: "trekking", label: "TREK", en: "TREK" },
  { id: "trail-running", label: "RUN", en: "RUN" },
] as const;

export type FilterId = (typeof ACTIVITY_FILTERS)[number]["id"];

export const ACTIVITY_META: Record<
  Activity,
  { ko: string; en: string; short: string }
> = {
  hiking: { ko: "하이킹", en: "HIKE", short: "HK" },
  trekking: { ko: "트레킹", en: "TREK", short: "TR" },
  "trail-running": { ko: "러닝", en: "RUN", short: "RN" },
  other: { ko: "기타", en: "OTHER", short: "OT" },
};

export function formatElevation(meters: number) {
  return `${meters.toLocaleString("en-US")}m`;
}
