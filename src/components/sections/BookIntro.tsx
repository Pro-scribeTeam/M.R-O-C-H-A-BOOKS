"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const stats = [
  { label: "Pages", value: "412" },
  { label: "Chapters", value: "34" },
  { label: "Theater", value: "Eastern Front" },
];

export default function BookIntro() {
  return (
    <section id="author" className="bg-zinc-950 px-6 py-24 md:px-8 md:py-32">
      <AnimatedSection className="mx-auto max-w-[1400px]">
        <AnimatedItem>
          <EyebrowBadge dark>About the Book</EyebrowBadge>
        </AnimatedItem>

        <AnimatedItem>
          <h2 className="mt-6 max-w-[20ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-white md:text-5xl">
            A war novel about the price of holding ground.
          </h2>
        </AnimatedItem>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-[3fr_2fr]">
          <AnimatedItem className="card-surface-dark p-7">
            <p className="max-w-[55ch] text-lg leading-relaxed text-white/70">
              <span className="font-semibold text-white">The Bear&apos;s Aggression</span> follows
              a squad of soldiers thrown into a collapsing eastern front, where every mile
              gained costs more than command is willing to admit. M.R. Ocha writes war without
              flinching — the noise, the silence after, and the men who carry both home.
            </p>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-white/50">
              A story of aggression, survival, and the thin line between duty and ruin.
            </p>
          </AnimatedItem>

          <AnimatedItem className="card-surface-dark flex flex-col justify-between p-7">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">Author</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">M.R. Ocha</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-lg font-semibold text-accent-2">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </section>
  );
}
