"use client";

import { motion } from "framer-motion";
import { CalendarDays, Mountain, HeartHandshake } from "lucide-react";

const pillars = [
  {
    icon: CalendarDays,
    label: "Since 2014",
    description:
      "Over a decade supplying stone and granite to homeowners, builders, and architects across Delhi NCR.",
  },
  {
    icon: Mountain,
    label: "Straight from Rajasthan",
    description:
      "Marble sourced directly from Rajasthan's quarries - no middlemen between the stone and your project.",
  },
  {
    icon: HeartHandshake,
    label: "Owners on every enquiry",
    description:
      "No call centre, no sales reps. Every enquiry is handled personally by Daryao Singh and Ajay Khatri.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative px-6 py-28 md:px-16" style={{ scrollMarginTop: "5rem" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <p className="overline mb-4 text-center">Why Vinit Marbles</p>
        <h2 className="mx-auto mb-16 max-w-2xl text-center font-display text-4xl md:text-5xl">
          Built on <span className="gold-text">stone, not shortcuts</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.label}
                className="stone-ring glass relative rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06]">
                  <Icon size={24} className="text-gold-light" />
                </div>
                <h3 className="mb-2 font-display text-xl">{pillar.label}</h3>
                <p className="text-sm text-white/60">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
