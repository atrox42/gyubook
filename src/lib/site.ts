export const site = {
  name: "GYUBOOK",
  nameKo: "규북",
  title: "GYUBOOK — 필드 아카이브",
  description:
    "새벽 능선, 젖은 흙, 조용한 집중. 하이킹 · 트레킹 · 트레일러닝 룩북.",
  descriptionEn:
    "A sensory outdoor lookbook — hiking, trekking, trail running. Dawn ridge. Damp trail. Quiet focus.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gyubook.vercel.app",
} as const;
