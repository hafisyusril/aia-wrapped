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
      // Play if the user intended it to be playing (persisted across reloads)
      const intended = localStorage.getItem("bgm-intended") === "true";
      if (isPlayingRef.current || intended) {
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

    // If user previously intended background music, try to resume on next user interaction
    const previouslyIntended = localStorage.getItem("bgm-intended") === "true";
    const resumeOnInteraction = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          isPlayingRef.current = true;
          events.forEach((event) =>
            window.removeEventListener(event, resumeOnInteraction)
          );
        })
        .catch(() => {
          isPlayingRef.current = false;
        });
    };

    const events = ["click", "touchstart", "keydown"];
    if (previouslyIntended) {
      events.forEach((event) =>
        window.addEventListener(event, resumeOnInteraction)
      );
    }

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePause);
      window.removeEventListener("pageshow", handlePlay);
      window.removeEventListener("blur", handlePause);
      window.removeEventListener("focus", handlePlay);
      events.forEach((event) =>
        window.removeEventListener(event, resumeOnInteraction)
      );
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current) return;

    localStorage.setItem("bgm-intended", "true");

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

  // Note: autoplay without user interaction is blocked by many browsers.
  // We attach resume listeners during audio setup above and remove them on cleanup.




  return { play, stop };
}
