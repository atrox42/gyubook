import { existsSync } from "node:fs";
import path from "node:path";
import { EditorialGrid } from "@/components/EditorialGrid";
import { looks } from "@/data/looks";
import type { Look } from "@/types/look";

function publicExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function availableLooks(): Look[] {
  return looks
    .map((look) => {
      const hero = look.quad ?? look.image;
      return {
        ...look,
        image: hero,
        tiles: look.tiles.filter((tile) => publicExists(tile.src)),
      };
    })
    .filter((look) => look.tiles.length > 0 && publicExists(look.image));
}

export default function Home() {
  return <EditorialGrid looks={availableLooks()} />;
}
