"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

interface RefreshSplashCardProps {
  onPlayAgain: () => void;
  isLoading?: boolean;
}

export default function RefreshSplashCard({
  onPlayAgain,
  isLoading = false,
}: RefreshSplashCardProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handlePlay = () => {
    setIsExiting(true);
    setTimeout(() => {
      onPlayAgain();
    }, 500); // Match exit animation duration
  };

  if (!isExiting && isLoading) {
    // Optionally show a loading state before the button is interactive?
    // For now, we just disable the button.
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white ${isExiting ? "pointer-events-none" : ""
        }`}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/aia-new-red.svg"
            alt="AIA Vitality"
            width={200}
            height={80}
            className="w-48 md:w-64"
            priority
          />
        </motion.div>

        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#333536] tracking-wide">
            WRAPPED 2025
          </h1>
        </motion.div> */}

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={handlePlay}
          disabled={isLoading || isExiting}
          className="mt-12 flex items-center gap-2 text-[#D31145] text-lg font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <FiRefreshCcw
            className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
          />
          <span>{isLoading ? "Loading..." : "Play Again"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
