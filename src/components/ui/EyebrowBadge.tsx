"use client";

import type { ReactNode } from "react";

export function EyebrowBadge({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider shadow-sm backdrop-blur-md ${
        dark
          ? "border-white/15 bg-white/10 text-white/70"
          : "border-black/10 bg-white/60 text-zinc-500"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
