"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Material = {
  name: string;
  origin: string;
  description: string;
  image: string;
  span: string;
};

const materials: Material[] = [
  {
    name: "Indian Marble",
    origin: "Rajasthan Quarries",
    description:
      "Classic Makrana and Kishangarh marble, prized for its soft veining and centuries-old legacy in Indian architecture.",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1600&auto=format&fit=crop",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    name: "Black Galaxy Granite",
    origin: "Andhra Pradesh",
    description:
      "Deep obsidian granite flecked with copper-gold crystals - a signature choice for premium countertops and flooring.",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1600&auto=format&fit=crop",
    span: "md:col-span-5 md:row-span-1",
  },
  {
    name: "Premium Granite",
    origin: "South Indian Belt",
    description:
      "Dense, durable granite in a spectrum of tones - engineered for high-traffic commercial and residential surfaces.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1600&auto=format&fit=crop",
    span: "md:col-span-5 md:row-span-1",
  },
  {
    name: "Imported Marble",
    origin: "Italy & Turkey",
    description:
      "Statuario, Calacatta, and Emperador slabs imported for architects seeking an unmistakably luxury finish.",
    image:
      "https://images.unsplash.com/photo-1614633714452-33a0dbdb8c0f?q=80&w=1600&auto=format&fit=crop",
    span: "md:col-span-12 md:row-span-1",
  },
];

export function MaterialsGrid() {
  return (
    <section className="relative px-6 py-28 md:px-16">
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <p className="overline mb-4">Our Collection</p>
        <h2 className="mb-16 max-w-2xl font-display text-4xl md:text-5xl">
          Four stones,{" "}
          <span className="gold-text">infinite expression</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[260px]">
          {materials.map((material, i) => (
            <motion.div
              key={material.name}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 ${material.span}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0">
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end p-7">
                <p className="overline mb-2 text-[0.65rem]">{material.origin}</p>
                <h3 className="font-display text-2xl md:text-3xl">
                  {material.name}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/60">
                  {material.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
