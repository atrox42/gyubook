"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ACTIVITY_META } from "@/lib/activity";
import type { Look, LookAngle } from "@/types/look";

const ANGLE_LABEL: Record<LookAngle, string> = {
  front: "FRONT",
  left: "LEFT",
  right: "RIGHT",
  back: "BACK",
};

type LookDetailProps = {
  look: Look;
  prevId: string;
  nextId: string;
};

export function LookDetail({ look, prevId, nextId }: LookDetailProps) {
  const angles = (["front", "left", "right", "back"] as const).filter(
    (angle) => look.angles?.[angle],
  );
  const [active, setActive] = useState<string>(
    look.quad ?? look.angles?.front ?? look.image,
  );
  const activity = ACTIVITY_META[look.activity];

  return (
    <div className="min-h-[100dvh] bg-paper">
      <header className="flex items-end justify-between px-5 py-5">
        <Link
          href="/"
          className="font-display text-[15px] font-medium tracking-[0.22em]"
        >
          GYUBOOK
        </Link>
        <p className="text-[10px] font-light tracking-[0.22em] text-mute">
          {activity.en}
        </p>
      </header>

      <div className="grid lg:grid-cols-2">
        <section className="bg-paper">
          <div className="relative aspect-square bg-paper lg:aspect-3/4">
            <Image
              src={active}
              alt={look.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center"
            />
          </div>
          {angles.length > 0 ? (
            <div className="grid grid-cols-4">
              {angles.map((angle) => {
                const src = look.angles?.[angle];
                if (!src) return null;
                const selected = active === src;
                return (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setActive(src)}
                    className={`relative aspect-square bg-paper ${
                      selected ? "opacity-100" : "opacity-40"
                    }`}
                    aria-label={ANGLE_LABEL[angle]}
                  >
                    <Image
                      src={src}
                      alt={`${look.title} ${ANGLE_LABEL[angle]}`}
                      fill
                      className="object-contain"
                      sizes="25vw"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <aside className="flex flex-col justify-end px-6 py-14 lg:min-h-[100dvh] lg:px-16">
          <p className="text-[10px] font-light tracking-[0.32em] text-mute">
            LOADOUT
          </p>
          <h1 className="font-serif mt-3 text-5xl leading-none tracking-tight">
            {look.title}
          </h1>
          <ul className="mt-12 space-y-5">
            {look.products.map((product) => {
              const row = (
                <>
                  {product.thumb ? (
                    <img
                      src={product.thumb}
                      alt=""
                      className="h-12 w-12 shrink-0 object-contain"
                    />
                  ) : (
                    <span className="block h-12 w-12 shrink-0" />
                  )}
                  <span className="min-w-0 flex-1">
                    {product.brand ? (
                      <span className="block text-[9px] tracking-[0.14em] text-mute uppercase">
                        {product.brand}
                      </span>
                    ) : null}
                    <span className="mt-0.5 block text-[15px] font-light">
                      {product.name}
                    </span>
                    {product.sku ? (
                      <span className="mt-1 block text-[10px] font-light tracking-[0.08em] text-mute">
                        {product.sku}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[10px] font-light tracking-[0.12em] text-mute uppercase">
                    {product.category}
                  </span>
                </>
              );
              return (
                <li key={product.id}>
                  {product.href ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 hover:opacity-45"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 opacity-70">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <nav className="mt-20 flex justify-between text-[10px] font-light tracking-[0.22em] text-mute">
            <Link href={`/look/${prevId}`}>PREV</Link>
            <Link href={`/look/${nextId}`}>NEXT</Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
