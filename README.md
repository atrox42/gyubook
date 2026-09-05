# GYUBOOK / 규북

하이킹 · 트레킹 · 트레일러닝 **필드 룩북**. 흰 그리드, 전신 + 디테일 크롭.

Instagram 바이오용 v1. 백엔드 없음.

A quiet editorial lookbook — CAYL-style white grid, shoppable loadouts on hover/tap.

## 로컬 / Run

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

```bash
npm run build
```

## 룩 추가하는 법 / Add a look

각 룩은 **전후좌우 4장**.

1. 원본 4장을 넣는다.

```
raw/looks/<id>/front.jpg
raw/looks/<id>/left.jpg
raw/looks/<id>/right.jpg
raw/looks/<id>/back.jpg
```

2. 배경을 지운다 (흰 그리드용 컷아웃).

```bash
python3 -m pip install rembg
./scripts/process-look.sh <id>
```

결과는 `public/looks/<id>/{front,left,right,back}.png`.

3. `src/data/looks.ts`에 룩과 상품을 적는다. `tiles`로 전신/디테일 크롭(줌, object-position)을 나눈다.

```ts
{
  id: "look-02",
  title: "다음 능선",
  activity: "hiking",
  image: "/looks/look-02/front.png",
  alt: "정면 전신",
  angles: {
    front: "/looks/look-02/front.png",
    left: "/looks/look-02/left.png",
    right: "/looks/look-02/right.png",
    back: "/looks/look-02/back.png",
  },
  tiles: [
    { id: "02-front", src: "/looks/look-02/front.png", alt: "정면", aspect: "hero", position: "center 20%", span: "hero" },
    { id: "02-head", src: "/looks/look-02/front.png", alt: "얼굴/모자", aspect: "square", position: "center 8%", zoom: 2.1, span: "normal" },
  ],
  products: [
    { id: "hat", name: "Beanie", brand: "CAYL", category: "모자", hotspot: { x: 50, y: 10 } },
  ],
}
```

파이프라인: **4장 드롭 → 배경 제거 → 데이터 입력**.

## 배포 / Vercel

1. [Vercel](https://vercel.com/new)에 이 저장소 Import
2. Framework: Next.js
3. (선택) `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy 후 Instagram 바이오에 URL

## 스택

Next.js App Router · TypeScript · Tailwind · Framer Motion

데이터: `src/data/looks.ts`  
컷아웃: `public/looks/<id>/`  
원본: `raw/looks/<id>/`
