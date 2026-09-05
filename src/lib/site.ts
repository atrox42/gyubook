export const site = {
  name: "GYUBOOK",
  nameKo: "규북",
  title: "GYUBOOK — 필드 아카이브",
  description:
    "하이킹 · 트레킹 · 트레일러닝 룩북. 흰 그리드에 전신과 디테일을 올린다.",
  descriptionEn:
    "An editorial outdoor lookbook — hiking, trekking, trail running. White grid. Full looks and quiet detail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gyubook.vercel.app",
} as const;
