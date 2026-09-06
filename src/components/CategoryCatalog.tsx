"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_TABS, type CategoryId } from "@/lib/activity";
import type { CatalogItem } from "@/lib/catalog";
import { CatalogCard } from "./CatalogCard";
import { SiteFooter } from "./SiteFooter";

export function CategoryCatalog({ items }: { items: CatalogItem[] }) {
  const [tab, setTab] = useState<CategoryId>("trail-running");
  const current = CATEGORY_TABS.find((item) => item.id === tab) ?? CATEGORY_TABS[0];

  const visible = useMemo(
    () => items.filter((item) => item.activity === tab),
    [items, tab],
  );

  return (
    <div className="bg-paper">
      <header className="sticky top-0 z-30 bg-paper">
        <div className="flex items-end justify-between px-4 pt-5 sm:px-6">
          <Link
            href="/"
            className="font-display text-[15px] font-medium tracking-[0.22em]"
          >
            GYUBOOK
          </Link>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-4 pb-3 pt-4 sm:gap-7 sm:px-6">
          {CATEGORY_TABS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`shrink-0 text-[13px] tracking-[0.02em] ${
                  active ? "text-ink" : "text-mute"
                }`}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="px-3 pb-20 sm:px-6">
        <div className="flex items-start justify-between gap-4 px-1 pb-6 pt-4 sm:px-0">
          <div>
            <h1 className="text-[34px] font-semibold leading-none tracking-tight sm:text-[44px]">
              {current.title}
            </h1>
            <p className="mt-2 text-[11px] font-light tracking-[0.06em] text-mute">
              PRODUCT / {current.crumb}
            </p>
          </div>
          <button
            type="button"
            className="mt-2 shrink-0 text-[11px] tracking-[0.08em] text-ink"
          >
            SORT +
          </button>
        </div>

        {visible.length === 0 ? (
          <p className="px-1 py-24 text-[13px] font-light text-mute">
            아직 올린 아이템이 없다.
          </p>
        ) : (
          <div className="catalog-grid">
            {visible.map((item, index) => (
              <CatalogCard key={item.id} item={item} priority={index < 2} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
