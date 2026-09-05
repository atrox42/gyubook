# GYUBOOK / 규북

새벽 능선, 젖은 흙, 조용한 집중. 하이킹 · 트레킹 · 트레일러닝 **필드 아카이브**.

Instagram 바이오용 v1 룩북. 전신 사진은 나중에 갈아끼우면 된다. 백엔드 없음.

A sensory outdoor lookbook — dawn ridge, damp trail, quiet focus. Hover or tap a card to reveal the loadout.

## 로컬에서 보기 / Run locally

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## 룩 추가하는 법 / Add a look

1. 전신 사진을 `public/looks/`에 넣는다. 예: `public/looks/my-ridge.jpg`
2. `src/data/looks.ts`에 항목을 추가한다.

```ts
{
  id: "my-ridge",
  title: "나의 능선",
  activity: "hiking", // hiking | trekking | trail-running | other
  image: "/looks/my-ridge.jpg",
  alt: "능선 위 전신 컷",
  code: "LK-10",
  location: "Bukhansan",
  locationKo: "북한산",
  elevationM: 836,
  brief: "그날의 한 줄.",
  briefEn: "One line from the day.",
  frame: "classic", // tall | classic | compact
  products: [
    {
      id: "jacket-1",
      name: "Atom Hoody",
      brand: "Arc'teryx",
      category: "재킷",
      href: "https://arcteryx.com", // optional
      hotspot: { x: 48, y: 36 },    // 이미지 % 좌표, optional
    },
  ],
}
```

핫스팟 `x` / `y`는 사진 왼쪽·위가 0, 오른쪽·아래가 100.

## 배포 / Deploy on Vercel

1. 이 저장소를 [Vercel](https://vercel.com/new)에 Import
2. Framework Preset: **Next.js** (기본값)
3. Build Command: `npm run build` / Output: 기본값
4. (선택) `NEXT_PUBLIC_SITE_URL`을 배포 도메인으로 설정. 예: `https://gyubook.vercel.app`
5. Deploy. Instagram 바이오에 그 URL을 넣는다.

## 스택

Next.js App Router · TypeScript · Tailwind CSS · Framer Motion

데이터는 `src/data/looks.ts`. 이미지는 `public/looks/`. 자리표시 사진은 Unsplash.

## 라이선스 메모

플레이스홀더 이미지는 Unsplash License. 본인 사진으로 교체하는 것을 전제로 한다.
