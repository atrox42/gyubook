import type { Activity } from "@/types/look";

export const CATEGORY_TABS = [
  { id: "trail-running", label: "트레일러닝", title: "TRAIL", crumb: "TRAIL" },
  { id: "hiking", label: "하이킹", title: "HIKE", crumb: "HIKE" },
  { id: "trekking", label: "트레킹", title: "TREK", crumb: "TREK" },
] as const;

export type CategoryId = (typeof CATEGORY_TABS)[number]["id"];

export const ACTIVITY_META: Record<
  Activity,
  { ko: string; en: string; short: string }
> = {
  hiking: { ko: "하이킹", en: "HIKE", short: "HK" },
  trekking: { ko: "트레킹", en: "TREK", short: "TR" },
  "trail-running": { ko: "트레일러닝", en: "TRAIL RUN", short: "RN" },
  other: { ko: "기타", en: "OTHER", short: "OT" },
};

export function formatElevation(meters: number) {
  return `${meters.toLocaleString("en-US")}m`;
}
