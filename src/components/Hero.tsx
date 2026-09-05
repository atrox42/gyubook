"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { looks } from "@/data/looks";
import { HudCorners } from "./HudCorners";
import { KstClock } from "./KstClock";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-8 h-[120%]">
        <Image
          src="/hero/dawn-ridge.jpg"
          alt="새벽 안개가 능선을 넘는 골짜기"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
      <div className="vignette absolute inset-0" />

      <div className="absolute inset-3 border border-white/8 sm:inset-5">
        <HudCorners />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex min-h-[100dvh] flex-col px-5 pt-[max(1.1rem,env(safe-area-inset-top))] pb-6 sm:px-8"
      >
        <header className="flex items-start justify-between gap-4 font-hud text-[10px] tracking-[0.22em] text-mist">
          <div>
            <p className="text-amber">GYUBOOK · 규북</p>
            <p className="mt-1 hidden sm:block">LAT 37.658 · LNG 126.977</p>
          </div>
          <div className="text-right">
            <KstClock />
            <p className="mt-1">WX · DAWN HAZE</p>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-16">
          <p className="font-hud text-[10px] tracking-[0.34em] text-amber">
            FIELD ARCHIVE · VOL. 01
          </p>
          <h1 className="mt-4 font-serif-kr text-[clamp(3.4rem,12vw,7.4rem)] leading-[0.88] text-paper">
            규북
          </h1>
          <p className="mt-3 font-display text-2xl tracking-[0.12em] text-paper/80 sm:text-3xl">
            GYUBOOK
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist sm:text-base">
            새벽 능선, 젖은 흙, 조용한 집중.
            <br />
            그날 입은 것을 기록한다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#archive"
              data-cursor="hover"
              className="border border-amber/70 bg-amber/10 px-4 py-2.5 font-hud text-[11px] tracking-[0.22em] text-amber transition-colors hover:bg-amber/20"
            >
              ARCHIVE 열기
            </a>
            <span className="font-hud text-[10px] tracking-[0.2em] text-mist">
              {String(looks.length).padStart(2, "0")} LOOKS · 3 ACTIVITIES
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 font-hud text-[10px] tracking-[0.18em] text-mist">
          <p>SYS READY · SIG CLEAR · MODE LOOKBOOK</p>
          <a
            href="#archive"
            data-cursor="hover"
            className="hidden items-center gap-2 sm:flex"
          >
            <span>SCROLL</span>
            <span className="block h-8 w-px bg-amber/70" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
