"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "#materials", label: "Materials" },
  { href: "#why-us", label: "Why Us" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const PRIMARY_PHONE = "919999346066";

export function SiteNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-hidden={!visible}
      className={`glass fixed inset-x-0 top-0 z-40 hidden items-center justify-between px-8 py-4 transition-all duration-500 ease-out md:flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <a href="#" className="font-display text-lg tracking-wide">
        Vinit <span className="gold-text">Marbles</span>
      </a>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-white/70 transition-colors hover:text-gold-light"
            tabIndex={visible ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href={`tel:+${PRIMARY_PHONE}`}
          aria-label="Call Vinit Marbles"
          tabIndex={visible ? 0 : -1}
          className="btn-sheen flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white transition-colors hover:border-gold/40"
        >
          <Phone size={16} />
        </a>
        <a
          href="#enquiry"
          tabIndex={visible ? 0 : -1}
          className="btn-sheen inline-flex h-10 items-center rounded-full bg-gold-gradient px-5 text-sm font-semibold text-obsidian shadow-[0_0_24px_rgba(212,175,55,0.25)] transition-transform hover:-translate-y-0.5"
        >
          Get a Quote
        </a>
      </div>
    </nav>
  );
}
