"use client";

import { useEffect, useRef, useCallback } from "react";

export function useBackgroundMusic(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingOnBlurRef = useRef(false); // To track if music was playing before blur
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      isLoadedRef.current = true;
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);

    const handleBlur = () => {
      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingOnBlurRef.current = true;
        audioRef.current.pause();
      } else {
        wasPlayingOnBlurRef.current = false;
      }
    };

    const handleFocus = () => {
      if (audioRef.current && wasPlayingOnBlurRef.current) {
        audioRef.current.play().catch(() => {
          console.warn("Audio play blocked on focus gain");
        });
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current || !isLoadedRef.current || !audioRef.current.paused) {
      return;
    }

    audioRef.current.play().catch(() => {
      console.warn("Audio play blocked");
    });
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    wasPlayingOnBlurRef.current = false; // If explicitly stopped, don't resume on focus
  }, []);

  return { play, stop };
}
