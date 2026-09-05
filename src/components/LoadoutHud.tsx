"use client";

import type { Product } from "@/types/look";

type LoadoutHudProps = {
  products: Product[];
  variant: "hero" | "quiet";
};

export function LoadoutHud({ products, variant }: LoadoutHudProps) {
  const shown = variant === "hero" ? products : products.slice(0, 3);

  return (
    <ul className="absolute inset-x-2 bottom-7 flex flex-col items-start gap-1">
      {shown.map((product) => {
        const label = (
          <>
            <span>
              {product.brand ? `${product.brand} ` : ""}
              {product.name}
            </span>
            <span className="text-mute">{product.category}</span>
          </>
        );

        return (
          <li key={product.id}>
            {product.href ? (
              <a href={product.href} target="_blank" rel="noreferrer" className="pill">
                {label}
              </a>
            ) : (
              <span className="pill">{label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
