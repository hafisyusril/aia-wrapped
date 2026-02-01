"use client";

import { useEffect, useRef, useCallback } from "react";

// Detect if the browser is running on an iOS device.
const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

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

    // This handler will mute/unmute the audio when the tab visibility changes.
    const handleVisibilityChange = () => {
      if (!audioRef.current || !isPlayingRef.current) {
        return;
      }
      audioRef.current.volume = document.hidden ? 0 : volume;
    };

    // Only apply the visibility handling logic for non-iOS devices.
    if (!isIOS) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Make sure to remove the listener only if it was added.
      if (!isIOS) {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }
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
