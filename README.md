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

**add a look = drop 4 angles → bg remove → data entry.**

각 룩은 **전후좌우 4장**: `front` · `left` · `right` · `back`.

### 1. Drop 4 angles

원본 4장을 넣는다. 방 배경이 있어도 된다 — 다음 단계에서 자른다.

```
raw/looks/<id>/front.jpg
raw/looks/<id>/left.jpg      # or side-left.jpg
raw/looks/<id>/right.jpg     # or side-right.jpg
raw/looks/<id>/back.jpg
```

### 2. Background remove

흰 그리드용 컷아웃. 배경을 지우고 순백 캔버스에 올린다.

```bash
python3 -m pip install "rembg[cpu]" pillow
npm run process-look -- look-01
# 또는 ./scripts/process-look.sh look-01
```

결과는 `public/looks/<id>/{front,left,right,back}.png` — **투명 컷아웃을 흰 캔버스에 합성한 PNG**. 그리드에는 이 컷아웃만 쓴다 (원본 룸 배경 금지).

### 3. Data entry

`src/data/looks.ts`에 룩과 상품을 적는다.

- `tiles` — 전신 + 디테일 크롭 (머리/두건, 베스트, 신발, 등 로고). `zoom` + `object-position`.
- `products` — hover/tap 로드아웃. SKU가 오면 `sku` + `href` + 선택 `thumb`을 채운다.

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
    {
      id: "hat",
      name: "Beanie",
      brand: "CAYL",
      category: "모자",
      sku: "optional-sku",
      href: "https://cayl.co.kr",
      hotspot: { x: 50, y: 10 },
    },
  ],
}
```

파일이 있는 룩만 홈 그리드에 나온다. Look #01 (`올 컨디션`)은 위 4장이 `raw/looks/look-01/`에 들어오면 컷아웃 후 오프닝이 된다.

## Look #01 로드아웃

정면 hover/tap = 인벤토리형 LOADOUT (흰 그리드, 네온 없음).

| 아이템 | SKU | 링크 |
| --- | --- | --- |
| Nike ACG GOAT Pack Vest 5L | IQ7354-039 | Nike |
| Nike ACG Solar Chase Dri-FIT ADV | IO9678-097 | Nike |
| Nike ACG Zegama Trail | HV8113-103 | Nike |
| Oakley Highland Grey Ink / Prizm Peach | 95220362 | [Kasina](https://www.kasina.co.kr/product-detail/132882506) |
| 페이즐리 스컬캡 / Nike 숏 / ACG 삭스 / 워치 | — | 추후 SKU |

## 배포 / Vercel

1. [Vercel](https://vercel.com/new)에 이 저장소 Import
2. Framework: Next.js
3. (선택) `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy 후 Instagram 바이오에 URL

이 브랜치에는 Vercel preview가 아직 연결되어 있지 않다.

## 스택

Next.js App Router · TypeScript · Tailwind · Framer Motion

데이터: `src/data/looks.ts`  
컷아웃: `public/looks/<id>/`  
원본: `raw/looks/<id>/`
