"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  showArrow = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-200 active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-2"
      : "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/15";

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight size={16} weight="bold" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  );
}
