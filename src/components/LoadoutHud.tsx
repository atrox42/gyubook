"use client";

import type { CSSProperties } from "react";
import type { Product } from "@/types/look";

type LoadoutHudProps = {
  products: Product[];
  variant: "hero" | "quiet";
};

function label(product: Product) {
  return (
    <>
      <span>
        {product.brand ? `${product.brand} ` : ""}
        {product.name}
      </span>
      <span className="text-mute">{product.category}</span>
    </>
  );
}

export function LoadoutHud({ products, variant }: LoadoutHudProps) {
  if (variant === "quiet") {
    const shown = products.slice(0, 3);
    return (
      <ul className="absolute inset-x-2 bottom-7 flex flex-col items-start gap-1">
        {shown.map((product) => (
          <li key={product.id}>
            {product.href ? (
              <a href={product.href} target="_blank" rel="noreferrer" className="pill">
                {label(product)}
              </a>
            ) : (
              <span className="pill">{label(product)}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="inventory">
      <p className="inv-head">LOADOUT</p>
      <ul className="inv-list">
        {products.map((product, index) => {
          const slot = String(index + 1).padStart(2, "0");
          const row = (
            <>
              <span className="inv-slot">{slot}</span>
              <span className="inv-name">
                {product.brand ? `${product.brand} ` : ""}
                {product.name}
              </span>
              <span className="inv-meta">{product.sku ?? product.category}</span>
            </>
          );
          return (
            <li
              key={product.id}
              style={{ "--i": index } as CSSProperties}
            >
              {product.href ? (
                <a href={product.href} target="_blank" rel="noreferrer" className="inv-row">
                  {row}
                </a>
              ) : (
                <div className="inv-row">{row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
