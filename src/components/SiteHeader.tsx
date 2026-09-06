import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-paper">
      <div className="px-4 py-5 sm:px-6">
        <Link
          href="/"
          className="font-display text-[17px] font-medium tracking-[0.22em]"
        >
          {site.name}
        </Link>
      </div>
    </header>
  );
}
