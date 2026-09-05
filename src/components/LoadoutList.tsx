"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/look";

type LoadoutListProps = {
  products: Product[];
  visible: boolean;
  variant?: "pills" | "dossier";
};

export function LoadoutList({
  products,
  visible,
  variant = "pills",
}: LoadoutListProps) {
  if (variant === "dossier") {
    return (
      <ul className="space-y-0">
        {products.map((product, index) => (
          <li
            key={product.id}
            className="border-b border-line last:border-b-0"
          >
            <ProductRow product={product} index={index} large />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={false}
          animate={
            visible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 8, filter: "blur(4px)" }
          }
          transition={{
            duration: 0.35,
            delay: visible ? 0.08 + index * 0.06 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductRow product={product} index={index} />
        </motion.div>
      ))}
    </div>
  );
}

function ProductRow({
  product,
  index,
  large = false,
}: {
  product: Product;
  index: number;
  large?: boolean;
}) {
  const inner = (
    <>
      <span className="font-hud text-[9px] tracking-[0.22em] text-amber/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-paper ${
            large ? "font-serif-kr text-base" : "text-[12px] leading-tight"
          }`}
        >
          {product.brand ? `${product.brand} ` : ""}
          {product.name}
        </span>
      </span>
      <span
        className={`shrink-0 font-hud uppercase tracking-[0.16em] text-mist ${
          large ? "text-[10px]" : "text-[9px]"
        }`}
      >
        {product.category}
      </span>
    </>
  );

  const className = `flex items-center gap-2.5 rounded-sm border border-white/8 bg-ink/55 px-2.5 backdrop-blur-md ${
    large ? "px-0 py-3.5 border-0 bg-transparent backdrop-blur-0" : "py-1.5"
  } ${product.href ? "transition-colors hover:border-amber/40 hover:bg-ink/70" : ""}`;

  if (product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}
