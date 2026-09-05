"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types/look";

type LoadoutHudProps = {
  products: Product[];
  visible: boolean;
  variant: "hero" | "quiet";
};

export function LoadoutHud({ products, visible, variant }: LoadoutHudProps) {
  if (variant === "quiet") {
    return (
      <AnimatePresence>
        {visible ? (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-x-2 bottom-8 space-y-0.5 bg-paper/90 p-2 ring-1 ring-ink/8"
          >
            {products.slice(0, 4).map((product) => (
              <li key={product.id} className="text-[12px] leading-snug">
                {product.brand ? `${product.brand} ` : ""}
                {product.name}
                <span className="ml-1.5 text-[10px] text-mute">{product.category}</span>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="hero-hud"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-20"
        >
          {products
            .filter((product) => product.hotspot)
            .map((product, index) => {
              const x = product.hotspot!.x;
              const y = product.hotspot!.y;
              const flip = x > 58;
              return (
                <div
                  key={`tag-${product.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-ink" />
                  <span
                    className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-1 whitespace-nowrap text-[10px] tracking-[0.04em] ${
                      flip ? "right-3" : "left-3"
                    }`}
                  >
                    <span className="bg-paper/90 px-1.5 py-0.5 text-ink ring-1 ring-ink/15">
                      {String(index + 1).padStart(2, "0")}{" "}
                      {product.brand ?? product.name}
                    </span>
                  </span>
                </div>
              );
            })}

          <div className="pointer-events-auto absolute inset-x-2 bottom-2 max-h-[46%] overflow-auto bg-paper/92 p-2.5 ring-1 ring-ink/10 backdrop-blur-sm">
            <p className="mb-2 text-[10px] tracking-[0.2em] text-mute">LOADOUT</p>
            <ul>
              {products.map((product, index) => {
                const Row = (
                  <>
                    <span className="w-6 shrink-0 text-[10px] tracking-[0.12em] text-mute">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {product.brand ? `${product.brand} ` : ""}
                      {product.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-mute">
                      {product.category}
                    </span>
                  </>
                );
                return (
                  <li
                    key={product.id}
                    className="border-t border-line/80 first:border-t-0"
                  >
                    {product.href ? (
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 py-1.5 text-[12px] hover:opacity-60"
                      >
                        {Row}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 py-1.5 text-[12px]">
                        {Row}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
