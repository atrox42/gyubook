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
    look.angles?.front ?? look.image,
  );
  const activity = ACTIVITY_META[look.activity];

  return (
    <div className="min-h-[100dvh] bg-paper">
      <header className="flex items-center justify-between border-b border-line px-4 py-3.5 sm:px-6">
        <Link href="/" className="text-[13px] tracking-[0.04em] text-mute">
          ← GYUBOOK
        </Link>
        <p className="text-[11px] tracking-[0.14em] text-mute">{activity.ko}</p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.7fr)] lg:py-12">
        <section>
          <div className="relative aspect-3/4 overflow-hidden bg-[#eeebe4]">
            <Image
              src={active}
              alt={look.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-center"
            />
          </div>
          {angles.length > 0 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {angles.map((angle) => {
                const src = look.angles?.[angle];
                if (!src) return null;
                const selected = active === src;
                return (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setActive(src)}
                    className={`relative aspect-3/4 overflow-hidden bg-[#eeebe4] ${
                      selected ? "ring-1 ring-ink" : ""
                    }`}
                    aria-label={ANGLE_LABEL[angle]}
                  >
                    <Image
                      src={src}
                      alt={`${look.title} ${ANGLE_LABEL[angle]}`}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                    <span className="absolute bottom-1 left-1 text-[9px] tracking-[0.14em] text-mute">
                      {ANGLE_LABEL[angle]}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <aside className="lg:pt-4">
          <p className="text-[11px] tracking-[0.16em] text-mute">{activity.en}</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight">{look.title}</h1>
          <p className="mt-6 text-[11px] tracking-[0.16em] text-mute">WORN</p>
          <ul className="mt-3 divide-y divide-line">
            {look.products.map((product) => {
              const row = (
                <>
                  <span>
                    {product.brand ? (
                      <span className="text-mute">{product.brand} </span>
                    ) : null}
                    {product.name}
                  </span>
                  <span className="text-[11px] tracking-[0.08em] text-mute">
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
                      className="flex items-baseline justify-between gap-4 py-3 text-[14px] hover:opacity-60"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex items-baseline justify-between gap-4 py-3 text-[14px]">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <nav className="mt-10 flex justify-between text-[12px] tracking-[0.08em] text-mute">
            <Link href={`/look/${prevId}`} className="hover:text-ink">
              ← Prev
            </Link>
            <Link href={`/look/${nextId}`} className="hover:text-ink">
              Next →
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
