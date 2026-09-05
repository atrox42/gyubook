"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const on = fine.matches && !reduce.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
    };
    apply();
    fine.addEventListener("change", apply);
    reduce.addEventListener("change", apply);
    return () => {
      fine.removeEventListener("change", apply);
      reduce.removeEventListener("change", apply);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, [data-cursor='hover'], input, summary"),
      );
      setHovering(interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`custom-cursor ${hovering ? "is-hover" : ""}`}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden
    />
  );
}
