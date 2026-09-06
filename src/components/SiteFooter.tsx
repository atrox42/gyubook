import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-5 py-20">
      <div className="flex flex-col gap-4 text-[10px] font-light tracking-[0.22em] text-mute sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-display text-[12px] tracking-[0.28em] text-ink">
          {site.name}
        </p>
        <p>SEOUL · LOOKS</p>
        <p>{site.nameKo}</p>
      </div>
    </footer>
  );
}
