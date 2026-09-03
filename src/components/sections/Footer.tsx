import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 px-6 py-12 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          OCHA <span className="text-accent-2">Books</span>
        </span>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} OCHA Books. The Bear&apos;s Aggression by M.R. Ocha.
        </p>
        <a
          href="#buy"
          className="flex items-center gap-1 text-xs uppercase tracking-wider text-white/50 transition hover:text-white"
        >
          Get the book <ArrowUpRight size={14} weight="bold" />
        </a>
      </div>
    </footer>
  );
}
