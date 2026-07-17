"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="preloaderGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E6C875" />
                <stop offset="100%" stopColor="#B38D35" />
              </linearGradient>
            </defs>
            <motion.path
              d="M36 4 L64 24 L54 62 L18 62 L8 24 Z M36 4 L36 62 M8 24 L64 24 M20 24 L36 62 M52 24 L36 62"
              stroke="url(#preloaderGold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <motion.p
            className="mt-5 overline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Vinit Marbles
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
