"use client";

import FrameScrollSection, { Annotation } from "@/components/ui/FrameScrollSection";

const annotations: Annotation[] = [
  {
    id: "tag-1",
    show: 0.16,
    hide: 0.4,
    className: "bottom-24 left-6 md:left-12",
    content: (
      <div className="card-surface-dark max-w-[280px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          Chapter One
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          The border holds until it doesn&apos;t. Every soldier knows the silence before it breaks.
        </p>
      </div>
    ),
  },
  {
    id: "tag-2",
    show: 0.45,
    hide: 0.68,
    className: "bottom-24 right-6 md:right-12",
    content: (
      <div className="card-surface-dark max-w-[280px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          A New Series
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          No mercy in the mountains. No retreat in the valley.
        </p>
      </div>
    ),
  },
];

export default function Hero() {
  return (
    <FrameScrollSection
      framesPath="/frames-scene1"
      frameCount={192}
      background="#0a0908"
      annotations={annotations}
      textFadeRatio={0.08}
      heroContent={
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            OCHA Books
          </p>
          <h1 className="mt-4 max-w-[16ch] text-4xl font-semibold uppercase leading-[1.05] tracking-tighter text-white md:text-6xl lg:text-7xl">
            The Bear&apos;s Aggression
          </h1>
          <p className="mt-5 text-sm uppercase tracking-[0.25em] text-white/50">
            M.R. Ocha
          </p>
          <p className="mt-8 text-xs uppercase tracking-widest text-white/30">
            Scroll to enter the front line
          </p>
        </div>
      }
    />
  );
}
