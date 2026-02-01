"use client";

import { createContext, useContext } from "react";

type MusicContextType = {
  playMusic: () => void;
  stopMusic: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({
  children,
  playMusic,
  stopMusic,
}: {
  children: React.ReactNode;
  playMusic: () => void;
  stopMusic: () => void;
}) {
  return (
    <MusicContext.Provider value={{ playMusic, stopMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}
