# GYUBOOK / 규북

하이킹 · 트레킹 · 트레일러닝 **필드 룩북**. 흰 그리드, 룩당 4각 화이트 쿼드 한 장.

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

결과는:

- `public/looks/<id>/{front,left,right,back}.png` — 부드러운 rembg (u2netp, 매팅 없음)
- `public/looks/<id>/<id>-quad-white.png` — **메인 타일**. 흰 배경에 전후좌우를 거의 틈 없이 2×2로 붙인 한 장.

그리드에는 쿼드 한 장만 쓴다. 호버/탭 = LOADOUT. 원본 룸 배경 금지. Outdoor Color 탭 없음.

### 3. Data entry

`src/data/looks.ts`에 룩과 상품을 적는다. 타일은 쿼드 하나.

```ts
{
  id: "look-02",
  title: "다음 능선",
  activity: "hiking",
  image: "/looks/look-02/look-02-quad-white.png",
  quad: "/looks/look-02/look-02-quad-white.png",
  tiles: [
    { id: "02-quad", src: "/looks/look-02/look-02-quad-white.png", alt: "4각 쿼드", aspect: "quad", position: "center center", span: "hero" },
  ],
  products: [
    { id: "hat", name: "Beanie", brand: "CAYL", category: "모자", sku: "optional-sku", href: "https://cayl.co.kr" },
  ],
}
```

Look #01 (`올 컨디션`)은 `raw/looks/look-01/`에 4장이 들어오면 `look-01-quad-white.png`가 오프닝 히어로가 된다.

## Look #01 로드아웃

`look-01-quad-white` hover/tap = 인벤토리형 LOADOUT. 흰 그리드, 네온 없음.

| 아이템 | SKU | 링크 |
| --- | --- | --- |
| Nike ACG 고트 팩 베스트 5L | IQ7354-039 | [Nike KR](https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-acg-%EA%B3%A0%ED%8A%B8-%ED%8C%A9-%EB%B2%A0%EC%8A%A4%ED%8A%B85l-spA7pnEA/IQ7354-039) |
| Nike ACG 솔라 체이스 드라이 핏 ADV | IO9678-097 | [Nike KR](https://www.nike.com/kr/t/acg-%EC%86%94%EB%9D%BC-%EC%B2%B4%EC%9D%B4%EC%8A%A4-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%ED%8A%B8%EB%A0%88%EC%9D%BC-%EB%9F%AC%EB%8B%9D-%ED%83%91-cIc1bxsR/IO9678-097) |
| Nike ACG 제가마 트레일 | HV8113-103 | [Nike KR](https://www.nike.com/kr/t/acg-%EC%A0%9C%EA%B0%80%EB%A7%88-%EB%82%A8%EC%84%B1-%ED%8A%B8%EB%A0%88%EC%9D%BC-%EB%9F%AC%EB%8B%9D%ED%99%94-tD6siwGz/HV8113-103) |
| Oakley Highland Grey Ink / Prizm Peach | 95220362 | [Kasina](https://www.kasina.co.kr/product-detail/132882506) |
| 페이즐리 스컬캡 / Nike 숏 / ACG 삭스 / 워치 | — | 추후 SKU |

호버 로드아웃: 전신 정면은 고정 핫스팟 템플릿 (`src/lib/hotspots.ts`). SKU가 있으면 KREAM 메인컷 → rembg 카드 (`scripts/fetch-kream-cutout.py`). SKU 없으면 텍스트만.

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
