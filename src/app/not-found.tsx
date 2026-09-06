import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-6xl leading-none">404</p>
      <h1 className="mt-6 text-[11px] font-light tracking-[0.28em] text-mute">
        NO LOOK
      </h1>
      <Link
        href="/"
        className="font-display mt-8 text-[13px] tracking-[0.22em]"
      >
        GYUBOOK
      </Link>
    </main>
  );
}
