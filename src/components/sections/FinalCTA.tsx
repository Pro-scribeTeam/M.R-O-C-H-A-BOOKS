"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section id="buy" className="relative overflow-hidden border-t border-white/5 bg-zinc-950 px-6 py-24 md:px-8 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(185,28,28,0.25), transparent 70%)",
        }}
      />
      <AnimatedSection className="relative mx-auto max-w-[1400px] text-center">
        <AnimatedItem>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-2">
            The Bear&apos;s Aggression
          </p>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-3xl font-semibold leading-[1.05] tracking-tighter text-white md:text-6xl">
            Hold the line. Read the front.
          </h2>
        </AnimatedItem>
        <AnimatedItem>
          <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-white/60">
            A novel by M.R. Ocha. Available now from OCHA Books.
          </p>
        </AnimatedItem>
        <AnimatedItem className="mt-10 flex items-center justify-center gap-4">
          <Button href="/order" variant="primary" showArrow>
            Buy the Book
          </Button>
          <Button href="/order#audio" variant="secondary">
            Listen to a Sample
          </Button>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
