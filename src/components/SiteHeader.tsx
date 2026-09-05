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
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="min-w-0">
          <p className="text-[15px] font-medium tracking-[0.22em]">{site.name}</p>
          <p className="text-[10px] tracking-[0.16em] text-mute">{site.nameKo}</p>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-[11px] tracking-[0.08em] text-mute sm:gap-x-5 sm:text-[12px]">
          {ACTIVITY_FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilter?.(item.id)}
                className={`cursor-pointer transition-colors ${
                  active ? "text-ink underline underline-offset-4" : "hover:text-ink"
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
