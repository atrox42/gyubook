"use client";

import type { CSSProperties } from "react";
import type { Product } from "@/types/look";

type LoadoutHudProps = {
  products: Product[];
  variant: "hero" | "quiet";
};

function productTitle(product: Product) {
  return `${product.brand ? `${product.brand} ` : ""}${product.name}`;
}

function QuietPills({ products }: { products: Product[] }) {
  return (
    <ul className="absolute inset-x-2 bottom-7 flex flex-col items-start gap-1">
      {products.slice(0, 3).map((product) => {
        const body = (
          <>
            <span>{productTitle(product)}</span>
            <span className="text-mute">{product.category}</span>
          </>
        );
        return (
          <li key={product.id}>
            {product.href ? (
              <a href={product.href} target="_blank" rel="noreferrer" className="pill">
                {body}
              </a>
            ) : (
              <span className="pill">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function LoadoutHud({ products, variant }: LoadoutHudProps) {
  if (variant === "quiet") {
    return <QuietPills products={products} />;
  }

  return (
    <div className="inventory" style={{ "--n": products.length } as CSSProperties}>
      {products.map((product, index) =>
        product.hotspot ? (
          <span
            key={`${product.id}-dot`}
            className="hot-dot"
            style={
              {
                left: `${product.hotspot.x}%`,
                top: `${product.hotspot.y}%`,
                "--i": index,
              } as CSSProperties
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null,
      )}

      <div className="inv-panel">
        <p className="inv-head">LOADOUT</p>
        <ul className="inv-list">
          {products.map((product, index) => {
            const slot = String(index + 1).padStart(2, "0");
            const row = (
              <>
                <span className="inv-slot">{slot}</span>
                {product.thumb ? (
                  <img src={product.thumb} alt="" className="inv-thumb" />
                ) : null}
                <span className="inv-copy">
                  <span className="inv-name">{productTitle(product)}</span>
                  <span className="inv-meta">
                    {product.sku ? `${product.sku} · ${product.category}` : product.category}
                  </span>
                </span>
              </>
            );

            return (
              <li key={product.id} style={{ "--i": index } as CSSProperties}>
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
    </div>
  );
}
