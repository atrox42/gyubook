"use client";

import { ACTIVITY_FILTERS, type FilterId } from "@/lib/activity";

type FilterBarProps = {
  value: FilterId;
  onChange: (value: FilterId) => void;
  counts: Record<FilterId, number>;
};

export function FilterBar({ value, onChange, counts }: FilterBarProps) {
  return (
    <div className="border border-line bg-panel/70 px-3 py-3 backdrop-blur-md sm:px-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-hud text-[10px] tracking-[0.28em] text-amber">필터 / FILTER</p>
        <p className="font-hud text-[10px] tracking-[0.18em] text-mist">
          {String(counts[value]).padStart(2, "0")} FILES
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ACTIVITY_FILTERS.map((filter) => {
          const active = value === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              data-cursor="hover"
              onClick={() => onChange(filter.id)}
              className={`border px-3 py-1.5 font-hud text-[11px] tracking-[0.16em] transition-colors ${
                active
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-line text-mist hover:border-paper/30 hover:text-paper"
              }`}
              aria-pressed={active}
            >
              {filter.label}
              <span className="ml-2 text-[9px] opacity-60">{filter.en}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
