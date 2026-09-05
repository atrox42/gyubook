"use client";

import Link from "next/link";
import { ACTIVITY_FILTERS, type FilterId } from "@/lib/activity";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  filter?: FilterId;
  onFilter?: (value: FilterId) => void;
};

export function SiteHeader({ filter = "all", onFilter }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-paper">
      <div className="flex items-end justify-between gap-6 px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-display text-[17px] font-medium tracking-[0.22em]"
        >
          {site.name}
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-[10px] font-light tracking-[0.22em] text-mute sm:gap-x-7">
          {ACTIVITY_FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilter?.(item.id)}
                className={`cursor-pointer transition-colors ${
                  active ? "text-ink" : "hover:text-ink"
                }`}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
