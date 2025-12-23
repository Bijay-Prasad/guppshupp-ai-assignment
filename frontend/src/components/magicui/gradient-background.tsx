"use client";

import { motion } from "framer-motion";

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-indigo-500/30 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-violet-500/20 blur-[120px]"
      />
    </div>
  );
}
