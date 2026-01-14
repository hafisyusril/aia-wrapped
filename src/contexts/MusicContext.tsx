"use client";

import { createContext, useContext } from "react";

type MusicContextType = {
    playMusic: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({
    children,
    playMusic,
}: {
    children: React.ReactNode;
    playMusic: () => void;
}) {
    return (
        <MusicContext.Provider value={{ playMusic }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const ctx = useContext(MusicContext);
    if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
    return ctx;
}
