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
  const [active, setActive] = useState<string>(look.angles?.front ?? look.image);
  const activity = ACTIVITY_META[look.activity];

  return (
    <div className="min-h-[100dvh] bg-paper">
      <header className="flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="text-[13px] font-normal tracking-[0.22em]">
          GYUBOOK
        </Link>
        <p className="text-[11px] font-light tracking-[0.1em] text-mute">
          {activity.ko}
        </p>
      </header>

      <div className="grid lg:grid-cols-2">
        <section className="bg-paper">
          <div className="relative aspect-3/4 bg-paper">
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
                    className={`relative aspect-3/4 bg-paper ${
                      selected ? "opacity-100" : "opacity-50"
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

        <aside className="flex flex-col justify-end px-6 py-12 lg:min-h-[100dvh] lg:px-16">
          <p className="text-[11px] font-light tracking-[0.18em] text-mute">
            {activity.en}
          </p>
          <h1 className="mt-3 text-3xl font-normal tracking-tight">{look.title}</h1>
          <ul className="mt-10 space-y-3">
            {look.products.map((product) => {
              const row = (
                <>
                  <span className="text-[14px] font-light">
                    {product.brand ? `${product.brand} ` : ""}
                    {product.name}
                  </span>
                  <span className="text-[11px] font-light text-mute">
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
                      className="flex items-baseline justify-between gap-4 hover:opacity-50"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex items-baseline justify-between gap-4">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <nav className="mt-16 flex justify-between text-[11px] font-light tracking-[0.12em] text-mute">
            <Link href={`/look/${prevId}`}>Prev</Link>
            <Link href={`/look/${nextId}`}>Next</Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
