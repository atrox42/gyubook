import type { Look } from "@/types/look";

export const looks: Look[] = [
  {
    id: "look-01",
    title: "올 컨디션",
    activity: "trail-running",
    image: "/looks/look-01/look-01-quad-white.jpg",
    alt: "올 컨디션 — 전후좌우 4각 화이트 쿼드",
    quad: "/looks/look-01/look-01-quad-white.jpg",
    listed: true,
    angles: {
      front: "/looks/look-01/front.jpg",
    },
    tiles: [
      {
        id: "01-quad",
        src: "/looks/look-01/look-01-quad-white.jpg",
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
        name: "Oakley Highland",
        brand: "Oakley",
        category: "선글라스",
        color: "Grey Ink",
        sku: "95220362",
        thumb: "/products/look-01/shades.jpg",
        wear: "/looks/look-01/front.jpg",
        slot: "outer",
      },
      {
        id: "l1-tee",
        name: "ACG Solar Chase",
        brand: "Nike ACG",
        category: "반팔",
        color: "Grey Fog",
        sku: "IO9678-097",
        thumb: "/products/look-01/tee.jpg",
        wear: "/looks/look-01/front.jpg",
        slot: "torso",
      },
      {
        id: "l1-vest",
        name: "ACG GOAT Pack Vest 5L",
        brand: "Nike ACG",
        category: "조끼",
        color: "Light Grey",
        sku: "IQ7354-039",
        thumb: "/products/look-01/vest.jpg",
        wear: "/looks/look-01/front.jpg",
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
        name: "ACG Zegama Trail",
        brand: "Nike ACG",
        category: "신발",
        color: "Summit White",
        sku: "HV8113-103",
        thumb: "/products/look-01/shoe.jpg",
        wear: "/looks/look-01/front.jpg",
        slot: "shoes",
      },
    ],
  },
  {
    id: "ridge-dawn",
    title: "능선 새벽",
    activity: "hiking",
    listed: false,
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
    listed: false,
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
    listed: false,
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
  const listed = looks.filter((look) => look.listed !== false);
  const index = listed.findIndex((look) => look.id === id);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: listed[(index - 1 + listed.length) % listed.length],
    next: listed[(index + 1) % listed.length],
  };
}
