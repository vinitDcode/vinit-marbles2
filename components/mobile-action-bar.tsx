"use client";

import { Phone, MessageCircle } from "lucide-react";

const PRIMARY_PHONE = "919999346066";
const WHATSAPP_MESSAGE = "Hi, I'm interested in Vinit Marbles stone & granite for my project.";

export function MobileActionBar() {
  return (
    <div
      className="glass fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 px-4 py-3 md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={`tel:+${PRIMARY_PHONE}`}
        className="btn-sheen flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-sm font-semibold text-white"
      >
        <Phone size={16} />
        Call
      </a>
      <a
        href={`https://wa.me/${PRIMARY_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-sheen flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-semibold text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.3)]"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>
  );
}
