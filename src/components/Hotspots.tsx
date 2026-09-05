"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/look";

type HotspotsProps = {
  products: Product[];
  visible: boolean;
};

export function Hotspots({ products, visible }: HotspotsProps) {
  return (
    <>
      {products
        .filter((product) => product.hotspot)
        .map((product, index) => {
          const x = product.hotspot!.x;
          const y = product.hotspot!.y;
          const flip = x > 62;

          return (
            <motion.div
              key={product.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={false}
              animate={
                visible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.65 }
              }
              transition={{
                duration: 0.32,
                delay: visible ? index * 0.07 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="hotspot-ring" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_10px_rgba(228,168,90,0.9)]" />
              </span>
              <span
                className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap font-hud text-[9px] uppercase tracking-[0.18em] text-paper ${
                  flip ? "right-4" : "left-4"
                }`}
              >
                <span className={`h-px w-4 bg-amber/70 ${flip ? "order-2" : ""}`} />
                <span className="rounded-sm bg-ink/70 px-1.5 py-0.5 backdrop-blur-[2px]">
                  {product.brand ?? product.name}
                </span>
              </span>
            </motion.div>
          );
        })}
    </>
  );
}
