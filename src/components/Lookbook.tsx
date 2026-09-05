"use client";

import { useMemo, useState } from "react";
import { looks } from "@/data/looks";
import type { FilterId } from "@/lib/activity";
import { FilterBar } from "./FilterBar";
import { LookCard } from "./LookCard";

export function Lookbook() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: looks.length,
      hiking: looks.filter((look) => look.activity === "hiking").length,
      trekking: looks.filter((look) => look.activity === "trekking").length,
      "trail-running": looks.filter((look) => look.activity === "trail-running").length,
    }),
    [],
  );

  const visible = looks.filter((look) =>
    filter === "all" ? true : look.activity === filter,
  );

  const onToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="archive" className="relative px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-hud text-[10px] tracking-[0.32em] text-amber">
              FIELD FILES
            </p>
            <h2 className="mt-2 font-serif-kr text-3xl text-paper sm:text-4xl">
              그날의 로드아웃
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
              카드를 누르거나 올려 입은 것을 펼친다. 사진은 자리표시 — 나중에 전신 컷으로 교체하면 된다.
            </p>
          </div>
          <p className="font-hud text-[10px] tracking-[0.2em] text-mist">
            HOVER / TAP · REVEAL GEAR
          </p>
        </div>

        <FilterBar value={filter} onChange={setFilter} counts={counts} />

        <div className="look-masonry mt-5">
          {visible.map((look) => (
            <LookCard
              key={look.id}
              look={look}
              open={openId === look.id}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
