"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 md:px-8 md:pt-6">
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-black/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white">
          OCHA <span className="text-accent-2">Books</span>
        </span>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#excerpt" className="text-sm text-white/70 transition hover:text-white">
            Excerpt
          </a>
          <a href="#author" className="text-sm text-white/70 transition hover:text-white">
            Author
          </a>
        </div>
        <Button href="#buy" variant="primary" className="!px-5 !py-2.5 !text-xs">
          Get the Book
        </Button>
      </nav>
    </header>
  );
}
