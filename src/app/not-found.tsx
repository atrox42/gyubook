import Link from "next/link";
import { HudCorners } from "@/components/HudCorners";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center px-6">
      <div className="absolute inset-4 border border-line">
        <HudCorners />
      </div>
      <div className="relative text-center">
        <p className="font-hud text-[10px] tracking-[0.3em] text-amber">
          SIGNAL LOST · 404
        </p>
        <h1 className="mt-4 font-serif-kr text-4xl text-paper">길을 잃었다</h1>
        <p className="mt-3 text-sm text-mist">이 좌표에는 파일이 없다.</p>
        <Link
          href="/"
          className="mt-8 inline-block border border-amber/70 px-4 py-2 font-hud text-[11px] tracking-[0.2em] text-amber"
        >
          RETURN TO ARCHIVE
        </Link>
      </div>
    </main>
  );
}
