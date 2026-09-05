"use client";

import type { CSSProperties } from "react";
import { slotPoint } from "@/lib/hotspots";
import type { Product } from "@/types/look";

type LoadoutHudProps = {
  products: Product[];
  variant: "hero" | "quiet";
  layout?: "figure" | "quad";
};

function productTitle(product: Product) {
  return product.name;
}

function markerPoint(product: Product, layout: "figure" | "quad") {
  if (product.slot) return slotPoint(product.slot, layout);
  return product.hotspot;
}

export function LoadoutHud({
  products,
  variant,
  layout = "figure",
}: LoadoutHudProps) {
  const numbered = products.filter((product) => markerPoint(product, layout));
  const cards = products.filter((product) => product.sku && product.thumb);
  const textOnly = products.filter((product) => !product.sku || !product.thumb);

  if (variant === "quiet") {
    return (
      <ul className="absolute inset-x-2 bottom-7 flex flex-col items-start gap-1">
        {products.slice(0, 3).map((product) => (
          <li key={product.id}>
            <span className="pill">
              <span>{product.brand ? `${product.brand} ` : ""}{productTitle(product)}</span>
              <span className="text-mute">{product.category}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={`inventory ${layout === "quad" ? "is-quad" : ""}`}
      style={{ "--n": cards.length || textOnly.length } as CSSProperties}
    >
      {numbered.map((product, index) => {
        const point = markerPoint(product, layout);
        if (!point) return null;
        return (
          <span
            key={`${product.id}-dot`}
            className="hot-dot"
            style={
              {
                left: `${point.x}%`,
                top: `${point.y}%`,
                "--i": index,
              } as CSSProperties
            }
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        );
      })}

      <div className="inv-panel">
        <p className="inv-head">LOADOUT</p>
        {cards.length > 0 ? (
          <ul className="inv-cards">
            {cards.map((product, index) => {
              const slot = String(
                numbered.findIndex((item) => item.id === product.id) + 1,
              ).padStart(2, "0");
              const body = (
                <>
                  <span className="inv-card-slot">{slot}</span>
                  <img src={product.thumb} alt="" className="inv-cut" />
                  {product.brand ? (
                    <span className="inv-card-brand">{product.brand}</span>
                  ) : null}
                  <span className="inv-card-name">{productTitle(product)}</span>
                </>
              );
              return (
                <li key={product.id} style={{ "--i": index } as CSSProperties}>
                  {product.href ? (
                    <a href={product.href} target="_blank" rel="noreferrer" className="inv-card">
                      {body}
                    </a>
                  ) : (
                    <div className="inv-card">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
        {textOnly.length > 0 ? (
          <ul className="inv-list">
            {textOnly.map((product, index) => (
              <li key={product.id} style={{ "--i": index } as CSSProperties}>
                <div className="inv-row">
                  <span className="inv-name">
                    {product.brand ? `${product.brand} ` : ""}
                    {productTitle(product)}
                  </span>
                  <span className="inv-meta">{product.category}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
