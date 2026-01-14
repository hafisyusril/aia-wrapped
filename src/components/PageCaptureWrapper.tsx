"use client";

import { ReactNode, useRef } from "react";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";

type PageCaptureWrapperProps = {
    children: (props: { onShare: () => void }) => ReactNode;
    fileName?: string;
};

export default function PageCaptureWrapper({
    children,
    fileName = "capture.png",
}: PageCaptureWrapperProps) {
    const captureRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!captureRef.current) return;

        await new Promise((r) => requestAnimationFrame(r));
        await new Promise((r) => setTimeout(r, 0));

        await captureWithWatermark({
            element: captureRef.current,
            fileName,
        });
    };

    return (
        <div className="relative">
            <div
                ref={captureRef}
                data-capture-root
                className="transform-none"
            >
                {children({ onShare: handleShare })}
            </div>
        </div>
    );
}
