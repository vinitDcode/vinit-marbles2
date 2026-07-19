"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, [role="button"], [data-cursor="interactive"]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!canHover) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        WebkitBackdropFilter: isHovering ? "blur(6px) saturate(160%)" : "none",
      }}
      animate={{
        width: isHovering ? 44 : 8,
        height: isHovering ? 44 : 8,
        backgroundColor: isHovering ? "rgba(212,175,55,0.08)" : "#D4AF37",
        borderWidth: isHovering ? 1 : 0,
        backdropFilter: isHovering ? "blur(6px) saturate(160%)" : "blur(0px)",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          border: isHovering ? "1px solid rgba(212,175,55,0.5)" : "none",
        }}
      />
    </motion.div>
  );
}
