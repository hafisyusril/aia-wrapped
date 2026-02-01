"use client";

import { useEffect, useRef, useCallback } from "react";

export function useBackgroundMusic(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
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

    const handleVisibilityChange = () => {
      if (!audioRef.current || !isPlayingRef.current) {
        return;
      }
      // Mute when hidden, unmute when visible
      audioRef.current.volume = document.hidden ? 0 : volume;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current || !isLoadedRef.current || isPlayingRef.current) {
      return;
    }

    isPlayingRef.current = true;

    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        // If play fails, reset the intent to play.
        isPlayingRef.current = false;
        console.warn("Audio play blocked", error);
      });
    }
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) {
      return;
    }
    isPlayingRef.current = false;
    audioRef.current.pause();
  }, []);

  return { play, stop };
}
