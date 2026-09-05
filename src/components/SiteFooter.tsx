import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-5 py-16">
      <div className="flex flex-col gap-3 text-[11px] font-light tracking-[0.12em] text-mute sm:flex-row sm:justify-between">
        <p>{site.name}</p>
        <p>하이킹 · 트레킹 · 트레일러닝</p>
        <p>{site.nameKo}</p>
      </div>
    </footer>
  );
}
