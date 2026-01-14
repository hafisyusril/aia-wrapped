"use client";

import { ReactNode, useRef } from "react";
import ShareButton from "./ShareButton";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";

export default function PageWrapper({ children }: { children: ReactNode }) {
    const captureRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!captureRef.current) return;

        await captureWithWatermark({
            element: captureRef.current,
            fileName: "my-page.png",
        });
    };

    return (
        <div className="relative">
            <ShareButton onClick={handleShare} />

            <div ref={captureRef}>
                {children}
            </div>
        </div>
    );
}
