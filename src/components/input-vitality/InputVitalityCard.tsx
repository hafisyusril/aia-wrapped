"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUserFlow } from "../../contexts/UserFlowContext";
import { useMusic } from "@/src/contexts/MusicContext";

export default function InputVitalityCard() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { setVitalityId, isLoading, error: apiError } = useUserFlow();
  const { playMusic } = useMusic();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      setError("Your year with AIA Vitality cannot be empty");
      return;
    }
    setError("");
    playMusic();
    setVitalityId(value);
  }

  return (
    <div className="flex min-h-dvh items-center overflow-y-auto justify-center bg-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative h-175 w-97.5 bg-white overflow-hidden"
      >
        <div className="absolute inset-10 flex flex-col justify-evenly  gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="flex justify-center"
          >
            <img
              src="/intro/aia-vitality-wrapped.svg"
              alt="AIA Vitality"
              className="h-14 w-auto"
            />
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            ref={formRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut",
            }}
            className=" flex flex-col gap-2"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => {
                setTimeout(() => {
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 150); // delay biar keyboard kebuka dulu
              }}
              placeholder="Enter your Vitality ID"
              className={`
                                h-12 rounded-xl border px-4 text-base
                                focus:outline-none focus:ring-2 focus:ring-red-500
                                ${(error || apiError) ? "border-red-500" : "border-gray-300"}
                            `}
            />

            {(error || apiError) && <p className="text-xs text-red-500">{error || apiError}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`
                                mt-2 h-12 rounded-xl
                                bg-red-600 text-white font-semibold
                                active:scale-[0.98]
                                transition
                                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                            `}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
