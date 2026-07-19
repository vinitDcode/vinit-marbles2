"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADDRESS = "Plot No. 44 A, Tikri Khurd Village, Narela, New Delhi, Delhi, 110036";
const WHATSAPP_MESSAGE = "Hi, I'm interested in Vinit Marbles stone & granite for my project.";

const owners = [
  {
    name: "Daryao Singh",
    role: "Founder & Proprietor",
    phone: "919999346066",
    displayPhone: "+91 99993 46066",
  },
  {
    name: "Ajay Khatri",
    role: "Partner & Trade Relations",
    phone: "919910241386",
    displayPhone: "+91 99102 41386",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-16" style={{ scrollMarginTop: "5rem" }}>
      <div className="pointer-events-none absolute left-0 bottom-0 z-10 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-0 z-10 h-[240px] w-[240px] rounded-full bg-[#C7D6EC]/[0.06] blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <p className="overline mb-4">Visit &amp; Connect</p>
        <h2 className="mb-6 font-display text-4xl md:text-5xl">
          Speak with <span className="gold-text">the owners</span>
        </h2>

        <div className="mb-12 flex items-start gap-3 text-white/60">
          <MapPin size={20} className="mt-0.5 shrink-0 text-gold-light" />
          <p className="max-w-xl">{ADDRESS}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {owners.map((owner, i) => (
            <motion.div
              key={owner.name}
              className="stone-ring glass relative rounded-2xl p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="overline mb-3 text-[0.65rem]">{owner.role}</p>
              <h3 className="mb-6 font-display text-3xl">{owner.name}</h3>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="glass" size="default">
                  <a href={`tel:+${owner.phone}`} aria-label={`Call ${owner.name}`}>
                    <Phone size={16} />
                    {owner.displayPhone}
                  </a>
                </Button>

                <Button asChild variant="glass" size="icon" className="shrink-0">
                  <a
                    href={`https://wa.me/${owner.phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${owner.name}`}
                  >
                    <MessageCircle size={18} className="text-gold-light" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
