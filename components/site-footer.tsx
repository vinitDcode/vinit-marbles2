"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { PasscodeModal } from "@/components/passcode-modal";

const TAP_WINDOW_MS = 2000;
const TAPS_REQUIRED = 5;

export function SiteFooter() {
  const [modalOpen, setModalOpen] = useState(false);
  const tapTimestamps = useRef<number[]>([]);

  const handleGhostTap = () => {
    const now = Date.now();
    tapTimestamps.current = [
      ...tapTimestamps.current.filter((t) => now - t < TAP_WINDOW_MS),
      now,
    ];

    if (tapTimestamps.current.length >= TAPS_REQUIRED) {
      tapTimestamps.current = [];
      setModalOpen(true);
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="font-display text-lg tracking-wide">
          Vinit <span className="gold-text">Marbles</span>
        </div>

        <nav className="flex gap-8 text-sm text-white/50">
          <Link href="/privacy" className="hover:text-gold-light transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gold-light transition-colors">
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Ghost trigger: looks like plain copyright text, no visual affordance */}
        <p
          onClick={handleGhostTap}
          className="select-none text-xs text-white/30"
        >
          © 2026 Vinit Marbles
        </p>
      </div>

      <PasscodeModal open={modalOpen} onOpenChange={setModalOpen} />
    </footer>
  );
}
