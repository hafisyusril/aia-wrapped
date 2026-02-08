"use client";

import { useEffect, useRef, useCallback } from "react";

export function useBackgroundMusic(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // On iOS, audio can only be initiated by a user gesture.
    // We create the audio element here, but the component using this hook
    // must call the returned `play` function from a user event handler (e.g., a click).
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handlePause = () => {
      audioRef.current?.pause();
    };

    const handlePlay = () => {
      // Only play if the user intended for it to be playing.
      if (isPlayingRef.current) {
        audioRef.current?.play().catch(() => {
          console.warn("Audio play blocked. User interaction may be needed.");
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePause();
      } else {
        handlePlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePause);
    window.addEventListener("pageshow", handlePlay);
    window.addEventListener("blur", handlePause);
    window.addEventListener("focus", handlePlay);

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePause);
      window.removeEventListener("pageshow", handlePlay);
      window.removeEventListener("blur", handlePause);
      window.removeEventListener("focus", handlePlay);
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    const promise = audioRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          isPlayingRef.current = true;
        })
        .catch(() => {
          console.warn(
            "Audio play blocked. Must be initiated by user gesture.",
          );
          isPlayingRef.current = false;
        });
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    }
  }, []);

  return { play, stop };
}
