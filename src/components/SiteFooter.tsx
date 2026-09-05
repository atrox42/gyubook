import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-hud text-[10px] tracking-[0.3em] text-amber">
            {site.name} · {site.nameKo}
          </p>
          <p className="mt-3 max-w-sm font-serif-kr text-2xl leading-snug text-paper">
            좌표는 바뀌고,
            <br />
            기록은 남는다.
          </p>
          <p className="mt-3 text-sm text-mist">
            하이킹 · 트레킹 · 트레일러닝 필드 아카이브.
            <br />
            Instagram bio link용 v1. 전신 사진은 나중에 교체.
          </p>
        </div>
        <div className="font-hud text-[10px] uppercase tracking-[0.2em] text-mist">
          <p>NO BACKEND · LOCAL DATA</p>
          <p className="mt-2">DAWN RIDGE · DAMP TRAIL · QUIET FOCUS</p>
        </div>
      </div>
    </footer>
  );
}
