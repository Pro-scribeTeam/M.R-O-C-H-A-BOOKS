"use client";

import { useEffect, useRef, useState } from "react";

export type Annotation = {
  id: string;
  show: number;
  hide: number;
  content: React.ReactNode;
  className?: string;
};

type FrameScrollSectionProps = {
  framesPath: string;
  frameCount: number;
  framePad?: number;
  background?: string;
  annotations?: Annotation[];
  textFadeRatio?: number;
  heroContent?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
};

export default function FrameScrollSection({
  framesPath,
  frameCount,
  framePad = 4,
  background = "#0a0908",
  annotations = [],
  textFadeRatio = 0.08,
  heroContent,
  children,
  id,
}: FrameScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const prevVisibleIdsRef = useRef("");

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${framesPath}/frame_${String(i).padStart(framePad, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / frameCount);
        if (loadedCount === frameCount) setLoaded(true);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, [framesPath, frameCount, framePad]);

  // Canvas resize (DPR-aware)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const currentFrameRef = useRef(0);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      drawW *= 1.3;
      drawH *= 1.3;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // Scroll handler
  useEffect(() => {
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollableHeight)));

        const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        if (heroTextRef.current) {
          const opacity = Math.max(0, 1 - progress / textFadeRatio);
          heroTextRef.current.style.opacity = String(opacity);
        }

        const newVisible = new Set<string>();
        for (const a of annotations) {
          if (progress >= a.show && progress <= a.hide) newVisible.add(a.id);
        }
        const newIds = [...newVisible].sort().join(",");
        if (newIds !== prevVisibleIdsRef.current) {
          prevVisibleIdsRef.current = newIds;
          setVisibleIds([...newVisible]);
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, frameCount, annotations]);

  return (
    <section id={id} ref={sectionRef} className="scroll-animation relative" style={{ background }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4" style={{ background }}>
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-150"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-xs text-white/40">
              {Math.round(loadProgress * 100)}%
            </span>
          </div>
        )}

        {heroContent && (
          <div
            ref={heroTextRef}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.7)" }}
          >
            {heroContent}
          </div>
        )}

        {annotations.map((a) => {
          const visible = visibleIds.includes(a.id);
          return (
            <div
              key={a.id}
              className={`absolute z-10 transition-all duration-400 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              } ${a.className ?? ""}`}
            >
              {a.content}
            </div>
          );
        })}

        {children}
      </div>
    </section>
  );
}
