"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  DownloadSimple,
  BookOpen,
  Headphones,
  ArrowLeft,
  DeviceMobile,
} from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

// ─── Audio Player ─────────────────────────────────────────────────────────────

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  };

  const onLoadedMetadata = () => {
    const el = audioRef.current;
    if (el) setDuration(el.duration);
  };

  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * el.duration;
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Replace /audiobook-sample.mp3 with your actual audio file in /public */}
      <audio
        ref={audioRef}
        src="/audiobook-sample.mp3"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all duration-200 hover:bg-accent-2 active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" />}
        </button>

        <div className="flex flex-1 flex-col gap-1.5">
          <div
            className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/10"
            onClick={seek}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-xs text-white/40">
            <span>{fmt((progress / 100) * duration)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Order Card ────────────────────────────────────────────────────────────────

function OrderCard({
  icon,
  label,
  sub,
  price,
  format,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  price: string;
  format: "hardcover" | "softcover";
  accent?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleOrder}
      disabled={loading}
      className={`group flex w-full items-center gap-4 rounded-2xl border px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed ${
        accent
          ? "border-accent/40 bg-accent/10 hover:bg-accent/20 hover:border-accent/60"
          : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          accent ? "bg-accent/20 text-accent" : "bg-white/10 text-white/70"
        }`}
      >
        {loading ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : icon}
      </div>
      <div className="min-w-0 text-left">
        <div className="font-semibold tracking-tight text-white">{label}</div>
        <div className="text-sm text-white/50">{sub}</div>
      </div>
      <div
        className={`ml-auto text-sm font-semibold transition-colors ${
          accent
            ? "text-accent group-hover:text-accent-2"
            : "text-white/40 group-hover:text-white/70"
        }`}
      >
        {loading ? "Redirecting…" : price}
      </div>
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Top nav bar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-6 py-4 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-sm text-white/40">Get the Book</span>
        </div>
      </div>

      {/* Ambient red glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px circle at 20% 20%, rgba(185,28,28,0.2), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-8 md:py-24">

        {/* ── Hero split ─────────────────────────────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Book mockup */}
          <AnimatedSection>
            <AnimatedItem>
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
                  className="relative"
                >
                  {/* Red glow behind book */}
                  <div
                    className="absolute inset-0 -z-10 scale-75 blur-3xl opacity-50"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(185,28,28,0.7) 0%, transparent 70%)",
                    }}
                  />
                  <Image
                    src="/book-cover-hardback.jpg"
                    alt="The Bear's Aggression — Hardcover"
                    width={480}
                    height={643}
                    priority
                    className="relative z-10 max-w-[320px] rounded-xl drop-shadow-2xl md:max-w-[420px]"
                  />
                </motion.div>
              </div>
            </AnimatedItem>
          </AnimatedSection>

          {/* Text + buttons */}
          <AnimatedSection className="flex flex-col gap-8">
            <AnimatedItem>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                OCHA Books
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter text-white md:text-6xl">
                The Bear&apos;s<br />Aggression
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="font-mono text-sm uppercase tracking-[0.15em] text-white/40">
                by M.R. Ocha
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <p className="max-w-[44ch] text-base leading-relaxed text-white/60 md:text-lg">
                The invasion of Europe by the Russians has begun. A relentless
                war novel that puts you on the front line — where every decision
                carries a cost.
              </p>
            </AnimatedItem>

            <AnimatedItem className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                Choose your format
              </p>
              <OrderCard
                icon={<BookOpen size={22} weight="fill" />}
                label="Order Hardcover"
                sub="Case-laminate hardback edition"
                price="$29.99"
                format="hardcover"
                accent
              />
              <OrderCard
                icon={<BookOpen size={22} />}
                label="Order Softcover"
                sub="Perfect-bound paperback edition"
                price="$19.99"
                format="softcover"
              />
            </AnimatedItem>
          </AnimatedSection>
        </div>

        {/* ── Audio sample ──────────────────────────────── */}
        <div id="audio" className="mt-20 md:mt-28">
        <AnimatedSection>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">

              <AnimatedItem className="flex flex-col gap-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                  <Headphones size={14} />
                  Audiobook
                </div>
                <h2 className="text-2xl font-semibold tracking-tighter text-white md:text-3xl">
                  Listen to a sample
                </h2>
                <p className="text-sm leading-relaxed text-white/50">
                  Hear the first chapter narrated before you commit. Full
                  audiobook download available below.
                </p>
                {/* Replace href="#" with your download link or file path */}
                <a
                  href="#"
                  download
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/15 hover:border-white/25 active:scale-[0.98]"
                >
                  <DownloadSimple size={16} weight="bold" />
                  Download Full Audiobook
                </a>
              </AnimatedItem>

              <AnimatedItem>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src="/book-cover-hardback.jpg"
                        alt="The Bear's Aggression"
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Chapter 1 — Sample</div>
                      <div className="text-sm text-white/40">The Bear&apos;s Aggression · M.R. Ocha</div>
                    </div>
                  </div>
                  <AudioPlayer />
                </div>
              </AnimatedItem>

            </div>
          </div>
        </AnimatedSection>
        </div>

        {/* ── Kindle / eBook ────────────────────────────── */}
        <AnimatedSection className="mt-10 md:mt-14">
          <div className="grid items-center gap-10 rounded-3xl border border-white/8 bg-white/[0.03] p-8 md:grid-cols-2 md:gap-16 md:p-12">

            <AnimatedItem className="flex flex-col gap-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                <DeviceMobile size={14} />
                eBook
              </div>
              <h2 className="text-2xl font-semibold tracking-tighter text-white md:text-3xl">
                Also available as an eBook
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Read on any device — Kindle, tablet, phone, or desktop.
                Instant download, no waiting.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Replace href="#" with your Kindle/ebook store links */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Kindle Store →
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Other Stores →
                </a>
              </div>
            </AnimatedItem>

            <AnimatedItem className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, damping: 18 }}
                className="relative"
              >
                <div
                  className="absolute inset-0 -z-10 scale-75 blur-3xl opacity-20"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(217,119,6,0.6) 0%, transparent 70%)",
                  }}
                />
                {/*
                  NOTE: book-cover-kindle.jpg has a white background.
                  Replace with a PNG (transparent bg) for a cleaner look on dark pages.
                */}
                <Image
                  src="/book-cover-kindle.jpg"
                  alt="The Bear's Aggression — eBook on Kindle"
                  width={380}
                  height={510}
                  className="max-w-[260px] rounded-2xl drop-shadow-xl md:max-w-[300px]"
                />
              </motion.div>
            </AnimatedItem>

          </div>
        </AnimatedSection>

        {/* ── Footer note ──────────────────────────────── */}
        <AnimatedSection className="mt-20 text-center">
          <AnimatedItem>
            <p className="text-sm text-white/30">
              Questions?{" "}
              <a
                href="mailto:info@ochabooks.com"
                className="text-white/60 underline underline-offset-4 transition-colors hover:text-white"
              >
                Contact OCHA Books
              </a>
            </p>
          </AnimatedItem>
        </AnimatedSection>

      </div>
    </main>
  );
}
