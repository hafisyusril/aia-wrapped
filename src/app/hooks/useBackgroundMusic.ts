"use client";

import { useEffect, useRef, useCallback } from "react";

export function useBackgroundMusic(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
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
