import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.18em] text-mute">404</p>
      <h1 className="mt-3 text-2xl font-medium">이 룩은 없다</h1>
      <Link href="/" className="mt-6 text-sm tracking-[0.06em] underline">
        GYUBOOK
      </Link>
    </main>
  );
}
