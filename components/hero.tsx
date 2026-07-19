"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="mask-reveal-wrap">
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Ambient radial glows for the glass to refract against — warm gold paired with a cool platinum counter-glow, like light splitting across a polished slab */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 z-10 h-[380px] w-[380px] translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[15%] top-[18%] z-10 h-[260px] w-[260px] rounded-full bg-[#C7D6EC]/[0.06] blur-3xl" />

      {/* Massive background watermark, with a slow shimmer drifting across it */}
      <div
        aria-hidden="true"
        className="watermark-shimmer pointer-events-none absolute -z-10 select-none whitespace-nowrap font-display font-black text-[26vw] leading-none"
      >
        VINIT
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.p
          className="overline mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          Delhi NCR &middot; Est. Natural Stone Craftsmen
        </motion.p>

        <h1 className="font-display text-[13vw] leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">
          <MaskedWord word="Vinit" delay={1.6} />{" "}
          <span className="gold-text">
            <MaskedWord word="Marbles" delay={1.75} />
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-balance text-lg text-white/60 md:text-xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.8, ease: EASE }}
        >
          Masterpieces in Stone &amp; Granite
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-14 flex flex-col items-center text-white/30"
        >
          <span className="overline mb-2 text-[0.65rem]">Explore the collection</span>
          <ChevronDown className="animate-bounce" size={18} />
        </motion.div>
      </div>
    </section>
  );
}
