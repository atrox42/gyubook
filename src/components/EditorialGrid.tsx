"use client";

import { useMemo, useState } from "react";
import type { FilterId } from "@/lib/activity";
import type { Look } from "@/types/look";
import { LookTile } from "./LookTile";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function EditorialGrid({ looks }: { looks: Look[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const tiles = useMemo(() => {
    return looks
      .filter((look) => (filter === "all" ? true : look.activity === filter))
      .flatMap((look) => look.tiles.map((tile) => ({ look, tile })));
  }, [filter, looks]);

  return (
    <div>
      <SiteHeader filter={filter} onFilter={setFilter} />
      <main>
        <div className="grid grid-cols-1 gap-[3px] bg-line sm:grid-cols-2 md:grid-cols-4">
          {tiles.map(({ look, tile }, index) => (
            <LookTile
              key={tile.id}
              look={look}
              tile={tile}
              index={index}
              open={openId === tile.id}
              onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
