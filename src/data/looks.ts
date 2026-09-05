import type { Look } from "@/types/look";

export const looks: Look[] = [
  {
    id: "look-01",
    title: "올 컨디션",
    activity: "trail-running",
    image: "/looks/look-01/look-01-quad-white.png",
    alt: "올 컨디션 — 전후좌우 4각 화이트 쿼드",
    quad: "/looks/look-01/look-01-quad-white.png",
    angles: {
      front: "/looks/look-01/front.png",
      right: "/looks/look-01/right.png",
      back: "/looks/look-01/back.png",
      left: "/looks/look-01/left.png",
    },
    tiles: [
      {
        id: "01-quad",
        src: "/looks/look-01/look-01-quad-white.png",
        alt: "전후좌우 4각 화이트 쿼드",
        aspect: "quad",
        position: "center center",
        span: "hero",
      },
    ],
    products: [
      {
        id: "l1-bandana",
        name: "페이즐리 스컬캡",
        category: "모자",
        slot: "head",
      },
      {
        id: "l1-shades",
        name: "Highland Grey Ink / Prizm Peach",
        brand: "Oakley",
        category: "선글라스",
        sku: "95220362",
        href: "https://www.kasina.co.kr/product-detail/132882506",
        thumb: "/products/look-01/95220362.png",
        slot: "outer",
      },
      {
        id: "l1-tee",
        name: "솔라 체이스 드라이 핏 ADV",
        brand: "Nike ACG",
        category: "반팔",
        sku: "IO9678-097",
        href: "https://www.nike.com/kr/t/acg-%EC%86%94%EB%9D%BC-%EC%B2%B4%EC%9D%B4%EC%8A%A4-%EB%82%A8%EC%84%B1-%EB%93%9C%EB%9D%BC%EC%9D%B4-%ED%95%8F-adv-%ED%8A%B8%EB%A0%88%EC%9D%BC-%EB%9F%AC%EB%8B%9D-%ED%83%91-cIc1bxsR/IO9678-097",
        thumb: "/products/look-01/IO9678-097.png",
        slot: "torso",
      },
      {
        id: "l1-vest",
        name: "고트 팩 베스트 5L",
        brand: "Nike ACG",
        category: "조끼",
        sku: "IQ7354-039",
        href: "https://www.nike.com/kr/t/%EB%82%98%EC%9D%B4%ED%82%A4-acg-%EA%B3%A0%ED%8A%B8-%ED%8C%A9-%EB%B2%A0%EC%8A%A4%ED%8A%B85l-spA7pnEA/IQ7354-039",
        thumb: "/products/look-01/IQ7354-039.png",
        slot: "vest",
      },
      {
        id: "l1-watch",
        name: "디지털 스포츠 워치",
        category: "시계",
        slot: "hand",
      },
      {
        id: "l1-short",
        name: "Fitted Shorts",
        brand: "Nike",
        category: "하의",
        slot: "bottom",
      },
      {
        id: "l1-sock",
        name: "크루 삭스",
        brand: "ACG",
        category: "양말",
        slot: "socks",
      },
      {
        id: "l1-shoe",
        name: "제가마 트레일",
        brand: "Nike ACG",
        category: "신발",
        sku: "HV8113-103",
        href: "https://www.nike.com/kr/t/acg-%EC%A0%9C%EA%B0%80%EB%A7%88-%EB%82%A8%EC%84%B1-%ED%8A%B8%EB%A0%88%EC%9D%BC-%EB%9F%AC%EB%8B%9D%ED%99%94-tD6siwGz/HV8113-103",
        thumb: "/products/look-01/HV8113-103.png",
        slot: "shoes",
      },
    ],
  },
  {
    id: "ridge-dawn",
    title: "능선 새벽",
    activity: "hiking",
    image: "/looks/ridge-dawn.jpg",
    alt: "좁은 능선 위를 걷는 하이커",
    tiles: [
      {
        id: "rd-quad",
        src: "/looks/ridge-dawn.jpg",
        alt: "능선 전신",
        aspect: "hero",
        position: "center 42%",
        span: "hero",
      },
    ],
    products: [
      {
        id: "rd-shell",
        name: "Atom Hoody",
        brand: "Arc'teryx",
        category: "재킷",
        sku: "ATOM-HOODY",
        href: "https://arcteryx.com",
        slot: "torso",
      },
      {
        id: "rd-pack",
        name: "Talon 22",
        brand: "Osprey",
        category: "배낭",
        sku: "TALON-22",
        href: "https://www.osprey.com",
        slot: "pack",
      },
      {
        id: "rd-shoe",
        name: "Speedgoat 5",
        brand: "HOKA",
        category: "신발",
        sku: "SPEEDGOAT-5",
        href: "https://www.hoka.com",
        slot: "shoes",
      },
    ],
  },
  {
    id: "first-strike",
    title: "첫 발",
    activity: "trail-running",
    image: "/looks/first-strike.jpg",
    alt: "솔숲 트레일을 달리는 러너",
    tiles: [
      {
        id: "fs-quad",
        src: "/looks/first-strike.jpg",
        alt: "트레일 러닝 컷",
        aspect: "portrait",
        position: "70% 40%",
        span: "hero",
      },
    ],
    products: [
      {
        id: "fs-shell",
        name: "Sense Aero Wind",
        brand: "Salomon",
        category: "재킷",
        href: "https://www.salomon.com",
        slot: "torso",
      },
      {
        id: "fs-shoe",
        name: "Cloudventure",
        brand: "On",
        category: "신발",
        href: "https://www.on.com",
        slot: "shoes",
      },
    ],
  },
  {
    id: "pine-corridor",
    title: "소나무 회랑",
    activity: "hiking",
    image: "/looks/pine-corridor.jpg",
    alt: "햇살 드는 솔숲 오솔길",
    tiles: [
      {
        id: "pc-quad",
        src: "/looks/pine-corridor.jpg",
        alt: "솔숲 하이킹",
        aspect: "portrait",
        position: "center 38%",
        span: "hero",
      },
    ],
    products: [
      {
        id: "pc-tee",
        name: "Cap Cool Daily",
        brand: "Patagonia",
        category: "상의",
        href: "https://www.patagonia.com",
        slot: "torso",
      },
      {
        id: "pc-pack",
        name: "Daylite Plus",
        brand: "Osprey",
        category: "배낭",
        href: "https://www.osprey.com",
        slot: "pack",
      },
    ],
  },
];

export function getLook(id: string) {
  return looks.find((look) => look.id === id);
}

export function getAdjacentLooks(id: string) {
  const index = looks.findIndex((look) => look.id === id);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: looks[(index - 1 + looks.length) % looks.length],
    next: looks[(index + 1) % looks.length],
  };
}
