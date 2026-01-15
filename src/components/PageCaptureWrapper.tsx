"use client";

import { ReactNode, useRef, useState, useCallback } from "react";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";
import ShareBottomSheet from "./ShareBottomSheet";
import { useUserFlow } from "../contexts/UserFlowContext";

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
    pageName,
}: PageCaptureWrapperProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [capturedFile, setCapturedFile] = useState<string | null>(null);
    const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

    // We need vitalityId to track sharing
    // Ideally we should store it in context when fetching user data.
    // Looking at UserFlowContext, setVitalityId uses 'id' arg, but doesn't seem to expose 'vitalityId' in userData or context root directly?
    // Let me double check UserFlowContext contents.
    // If it's not exposed, I might need to parse it from somewhere or add it to context.
    // Assuming for now I can add it or it's there.
    // Wait, the user 'setVitalityId' is a function.
    // I should check if I can store the ID in the context state too.
    const { userData, isDummyUser } = useUserFlow();
    // Ah, previous step I saw 'id' was passed to setVitalityId.
    // But is it stored?
    // Let me check UserFlowContext content in previous turns.
    // It has `userData: UserData | null`. `UserData` interface has `vhcStatus`, `steps`, etc. but NO `vitalityId`.
    // I MUST ADD vitalityId to UserFlowContext state to access it here.

    // For this step I will assume I can access it via a new property I will add to context called `vitalityId`.
    const { vitalityId } = useUserFlow() as any; // Temporary cast until context is updated

    // Step 1: tampilkan popup platform
    const handleShare = () => {
        setShowSharePopup(true);
    };

    // Step 2: user pilih platform → capture element
    const handlePlatformSelect = useCallback(async (platform: string) => {
        console.log("handlePlatformSelect triggered for:", platform); // DEBUG LOG

        if (!captureRef.current) {
            console.error("captureRef.current is missing!"); // DEBUG LOG
            return;
        }

        console.log("captureRef found. Proceeding..."); // DEBUG LOG

        setShowSharePopup(false);
        console.log("Current vitalityId:", vitalityId); // DEBUG LOG
        console.log("Page Name:", pageName); // DEBUG LOG

        // Call Share API
        // Fire and forget - tracking logic shouldn't block user experience
        const effectiveVitalityId = vitalityId || localStorage.getItem("aia-vitality-id");

        if (effectiveVitalityId) {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
            console.log("Sending share request to:", `${baseUrl}/api/v1/vitality/share`); // DEBUG LOG

            fetch(`${baseUrl}/api/v1/vitality/share`, {
                method: 'POST',
                keepalive: true,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    vitalityId: effectiveVitalityId,
                    platform: platform,
                    page: pageName
                })
            })
                .then(res => console.log("Share API status:", res.status)) // DEBUG LOG
                .catch(err => console.error("Share tracking failed:", err));
        } else {
            console.warn("Skipping share API: vitalityId is missing (Context + LocalStorage)"); // DEBUG LOG
        }

        // Give the network request a moment to be dispatched before the heavy CPU task (canvas capture) starts
        await new Promise(resolve => setTimeout(resolve, 300));

        // capture element baru
        const fileUrl = await captureWithWatermark({
            element: captureRef.current,
            fileName,
            disableWatermark,
        });

        setCapturedFile(fileUrl as any);
        setShowDownloadPrompt(true); // munculkan permission download
    }, [vitalityId, pageName, disableWatermark, fileName]);

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

            {/* Bottom sheet platform */}
            <ShareBottomSheet
                visible={showSharePopup}
                onClose={() => setShowSharePopup(false)}
                onSelect={(p) => {
                    console.log("Inline Prop Call:", p);
                    handlePlatformSelect(p);
                }}
            />

            {/* Download permission */}
            {showDownloadPrompt && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center"
                    onClick={() => setShowDownloadPrompt(false)}
                >
                    <div
                        className="bg-white p-4 rounded shadow-md flex flex-col gap-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-center font-medium">Download image to share?</p>
                        <button onClick={handleDownload} className="btn">
                            Download
                        </button>
                        <button
                            onClick={() => setShowDownloadPrompt(false)}
                            className="btn mt-2 text-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
