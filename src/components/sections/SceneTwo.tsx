"use client";

import FrameScrollSection, { Annotation } from "@/components/ui/FrameScrollSection";

const annotations: Annotation[] = [
  {
    id: "beat-1",
    show: 0.08,
    hide: 0.32,
    className: "top-24 left-6 md:left-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          Scene Two
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          They moved at first light, when the fog still owned the field.
        </p>
      </div>
    ),
  },
  {
    id: "beat-2",
    show: 0.4,
    hide: 0.64,
    className: "bottom-28 right-6 md:right-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          The Cost
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Every yard taken was paid for twice — once in blood, once in silence.
        </p>
      </div>
    ),
  },
];

export default function SceneTwo() {
  return (
    <FrameScrollSection
      id="excerpt"
      framesPath="/frames-scene2"
      frameCount={117}
      background="#050403"
      annotations={annotations}
      textFadeRatio={0.06}
      heroContent={
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            Excerpt
          </p>
          <h2 className="mt-4 max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-white md:text-5xl">
            The line broke before dawn.
          </h2>
        </div>
      }
    />
  );
}
