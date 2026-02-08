"use client";

import { useEffect, useRef, useCallback } from "react";

export function useBackgroundMusic(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleMute = () => {
      if (audioRef.current) audioRef.current.volume = 0;
    };

    const handleUnmute = () => {
      if (audioRef.current) audioRef.current.volume = volume;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleMute();
      } else {
        handleUnmute();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleMute);
    window.addEventListener("pageshow", handleUnmute);

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleMute);
      window.removeEventListener("pageshow", handleUnmute);
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.play().catch(() => {
      console.warn("Audio play blocked");
    });
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  return { play, stop };
}
