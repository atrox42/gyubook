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
    <div className="bg-paper">
      <SiteHeader filter={filter} onFilter={setFilter} />
      <main>
        <div className="look-wall">
          <div className="look-brick">
            <div className="aspect-void flex items-end px-5 pb-6">
              <p className="text-[11px] font-light tracking-[0.22em] text-mute">
                VOL. 01
              </p>
            </div>
          </div>
          {tiles.map(({ look, tile }, index) => (
            <LookTile
              key={tile.id}
              look={look}
              tile={tile}
              index={index}
              open={openId === tile.id}
              onToggle={(id) =>
                setOpenId((current) => (current === id ? null : id))
              }
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
