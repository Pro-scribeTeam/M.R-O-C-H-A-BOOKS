"use client";

import FrameScrollSection, { Annotation } from "@/components/ui/FrameScrollSection";

const annotations: Annotation[] = [
  {
    id: "beat-1",
    show: 0.12,
    hide: 0.38,
    className: "top-24 right-6 md:right-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          Chapter Twelve
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Smoke took the shape of the thing they&apos;d been fighting all along.
        </p>
      </div>
    ),
  },
  {
    id: "beat-2",
    show: 0.55,
    hide: 0.8,
    className: "bottom-28 left-6 md:left-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          The Bear
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          It doesn&apos;t retreat. It doesn&apos;t negotiate. It only advances.
        </p>
      </div>
    ),
  },
];

export default function SceneFour() {
  return (
    <FrameScrollSection
      framesPath="/frames-scene4"
      frameCount={145}
      background="#0a0605"
      annotations={annotations}
      textFadeRatio={0.06}
      heroContent={
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            The Title, Made Real
          </p>
          <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold uppercase leading-[1.05] tracking-tighter text-white md:text-5xl">
            The Bear&apos;s Aggression
          </h2>
        </div>
      }
    />
  );
}
