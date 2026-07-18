"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Share your requirement",
    description: "Tell us about your project by form, call, or WhatsApp.",
  },
  {
    number: "02",
    title: "Site visit or sample viewing",
    description: "See the stone in person at our showroom, or have us visit your site.",
  },
  {
    number: "03",
    title: "Quotation & selection",
    description: "We confirm material, quantity, and pricing for your project.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Your stone is delivered to site, ready for your team to install.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative px-6 py-28 md:px-16" style={{ scrollMarginTop: "5rem" }}>
      <div className="mx-auto max-w-7xl">
        <p className="overline mb-4">The Process</p>
        <h2 className="mb-16 max-w-2xl font-display text-4xl md:text-5xl">
          From enquiry to <span className="gold-text">your site</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {i < steps.length - 1 && (
                <div className="absolute left-[60%] right-[-40%] top-6 hidden h-px bg-gradient-to-r from-gold/30 via-white/10 to-transparent md:block" />
              )}
              <p className="gold-text font-display text-3xl">{step.number}</p>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
