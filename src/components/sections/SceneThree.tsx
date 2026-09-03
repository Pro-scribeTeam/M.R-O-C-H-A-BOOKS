"use client";

import FrameScrollSection, { Annotation } from "@/components/ui/FrameScrollSection";

const annotations: Annotation[] = [
  {
    id: "beat-1",
    show: 0.1,
    hide: 0.34,
    className: "top-24 left-6 md:left-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          Scene Three
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          &ldquo;Danger close, danger close &mdash; drop it on my position.&rdquo;
        </p>
      </div>
    ),
  },
  {
    id: "beat-2",
    show: 0.5,
    hide: 0.74,
    className: "bottom-28 right-6 md:right-12",
    content: (
      <div className="card-surface-dark max-w-[300px] p-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-2">
          Air Support
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          The bridge lit up like the end of the world. He didn&apos;t look away.
        </p>
      </div>
    ),
  },
];

export default function SceneThree() {
  return (
    <FrameScrollSection
      framesPath="/frames-scene3"
      frameCount={145}
      background="#0a0908"
      annotations={annotations}
      textFadeRatio={0.06}
      heroContent={
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            Chapter Nine
          </p>
          <h2 className="mt-4 max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-white md:text-5xl">
            Call it in.
          </h2>
        </div>
      }
    />
  );
}
