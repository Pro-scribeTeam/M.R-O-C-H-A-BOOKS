"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const isSafari =
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <ReactLenis
      root
      options={{
        lerp: isSafari ? 0.1 : 0.07,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: !isSafari,
      }}
    >
      {children}
    </ReactLenis>
  );
}
