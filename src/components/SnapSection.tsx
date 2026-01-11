"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SnapSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      className="min-h-svh snap-start snap-always"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.section>
  );
}
