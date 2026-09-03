"use client";

import FrameScrollSection, { Annotation } from "@/components/ui/FrameScrollSection";

const annotations: Annotation[] = [
  {
    id: "cover-tag",
    show: 0.7,
    hide: 1,
    className: "bottom-16 left-1/2 -translate-x-1/2",
    content: (
      <div className="card-surface-dark flex items-center gap-3 px-6 py-4">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <p className="text-sm font-medium uppercase tracking-wider text-white/80">
          Official Cover &mdash; Available Now
        </p>
      </div>
    ),
  },
];

export default function SceneFive() {
  return (
    <FrameScrollSection
      framesPath="/frames-scene5"
      frameCount={145}
      background="#050608"
      annotations={annotations}
      textFadeRatio={0.05}
      heroContent={
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
          The Cover Reveal
        </p>
      }
    />
  );
}
