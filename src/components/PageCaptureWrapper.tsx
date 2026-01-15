"use client";

import { ReactNode, useRef, useState } from "react";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";
import ShareBottomSheet from "./ShareBottomSheet";

type PageCaptureWrapperProps = {
    children: (props: { onShare: () => void }) => ReactNode;
    fileName?: string;
    disableWatermark?: boolean;
};

export default function PageCaptureWrapper({
    children,
    fileName = "capture.png",
    disableWatermark = false,
}: PageCaptureWrapperProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [capturedFile, setCapturedFile] = useState<string | null>(null);
    const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

    // Step 1: tampilkan popup platform
    const handleShare = () => {
        setShowSharePopup(true);
    };

    // Step 2: user pilih platform → capture element
    const handlePlatformSelect = async (_platform: string) => {
        if (!captureRef.current) return;

        setShowSharePopup(false);

        // capture element baru
        const fileUrl = await captureWithWatermark({
            element: captureRef.current,
            fileName,
            disableWatermark,
        });

        setCapturedFile(fileUrl as any);
        setShowDownloadPrompt(true); // munculkan permission download
    };

    // Step 3: user klik tombol download → trigger download
    const handleDownload = () => {
        if (!capturedFile) return;

        const a = document.createElement("a");
        a.href = capturedFile;
        a.download = fileName;
        a.click();

        // reset state
        setCapturedFile(null);
        setShowDownloadPrompt(false);
    };

    return (
        <div className="relative">
            <div ref={captureRef} data-capture-root className="transform-none">
                {children({ onShare: handleShare })}
            </div>
            <ShareBottomSheet
                visible={showSharePopup}
                onClose={() => setShowSharePopup(false)}
                onSelect={handlePlatformSelect}
            />
        </div>
    );
}
