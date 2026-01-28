"use client";

import { ReactNode, useRef, useCallback } from "react";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";

type PageCaptureWrapperProps = {
    children: (props: { onShare: () => void }) => ReactNode;
    fileName?: string;
    disableWatermark?: boolean;
    pageName: string;
};

export default function PageCaptureWrapper({
    children,
    fileName = "capture.png",
    disableWatermark = false,
}: PageCaptureWrapperProps) {
    const captureRef = useRef<HTMLDivElement>(null);

    const handleShareExecution = useCallback(
        async () => {
            if (!captureRef.current) return;

            await new Promise((r) => setTimeout(r, 300));
            await captureWithWatermark({
                element: captureRef.current,
                fileName,
                disableWatermark,
            });
        },
        [fileName, disableWatermark]
    );

    return (
        <div className="relative">
            <div ref={captureRef} data-capture-root className="transform-none">
                {children({ onShare: handleShareExecution })}
            </div>
        </div>
    );
}
