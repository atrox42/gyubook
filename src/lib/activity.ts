import type { Activity } from "@/types/look";

export const ACTIVITY_FILTERS = [
  { id: "all", label: "전체", en: "ALL" },
  { id: "hiking", label: "하이킹", en: "HIKING" },
  { id: "trekking", label: "트레킹", en: "TREKKING" },
  { id: "trail-running", label: "트레일러닝", en: "TRAIL RUN" },
] as const;

export type FilterId = (typeof ACTIVITY_FILTERS)[number]["id"];

export const ACTIVITY_META: Record<
  Activity,
  { ko: string; en: string; short: string }
> = {
  hiking: { ko: "하이킹", en: "HIKING", short: "HK" },
  trekking: { ko: "트레킹", en: "TREKKING", short: "TR" },
  "trail-running": { ko: "트레일러닝", en: "TRAIL RUN", short: "RN" },
  other: { ko: "기타", en: "OTHER", short: "OT" },
};

export function formatElevation(meters: number) {
  return `${meters.toLocaleString("en-US")}m`;
}
