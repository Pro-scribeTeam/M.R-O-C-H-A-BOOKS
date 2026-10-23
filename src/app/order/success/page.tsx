"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowLeft } from "@phosphor-icons/react";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(600px circle at 50% 40%, rgba(185,28,28,0.25), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="relative flex max-w-lg flex-col items-center gap-6"
      >
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
          <CheckCircle size={40} weight="fill" className="text-green-400" />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Order Confirmed
          </p>
          <h1 className="text-3xl font-semibold tracking-tighter text-white md:text-4xl">
            Your book is on its way.
          </h1>
        </div>

        {/* Body */}
        <p className="text-base leading-relaxed text-white/60">
          Thank you for your order. We&apos;ve sent your details to our print
          partner — your copy of{" "}
          <span className="text-white">The Bear&apos;s Aggression</span> will be
          printed and shipped directly to you.
        </p>

        {/* Timeline */}
        <div className="w-full rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20">
              <Package size={16} className="text-accent" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-white">What happens next?</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-white/50">
                <li>1. Confirmation email sent to you</li>
                <li>2. Your book is printed (3–5 business days)</li>
                <li>3. Shipped directly to your address</li>
                <li>4. Tracking info emailed once dispatched</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
