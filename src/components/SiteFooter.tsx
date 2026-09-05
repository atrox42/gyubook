import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] tracking-[0.2em]">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">
            하이킹 · 트레킹 · 트레일러닝 룩북.
            <br />
            룩 하나 = 전후좌우 4장. 배경 제거 후 흰 그리드에 올린다.
          </p>
        </div>
        <p className="text-[11px] tracking-[0.12em] text-mute">
          {site.nameKo} · FIELD ARCHIVE
        </p>
      </div>
    </footer>
  );
}
