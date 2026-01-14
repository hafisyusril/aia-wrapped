"use client";

import { SiWhatsapp, SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

type Platform = "whatsapp" | "facebook" | "instagram" | "tiktok";

type ShareBottomSheetProps = {
    visible: boolean;
    onClose: () => void;
    onSelect: (platform: Platform) => void;
};

const PLATFORM_DATA: { platform: Platform; label: string; color?: string; icon: JSX.Element }[] = [
    {
        platform: "whatsapp",
        label: "WhatsApp",
        color: "text-green-500",
        icon: <SiWhatsapp className="w-6 h-6" />,
    },
    {
        platform: "facebook",
        label: "Facebook",
        color: "text-blue-600",
        icon: <SiFacebook className="w-6 h-6" />,
    },
    {
        platform: "instagram",
        label: "Instagram",
        color: "text-pink-500",
        icon: <SiInstagram className="w-6 h-6" />,
    },
    {
        platform: "tiktok",
        label: "TikTok",
        color: "text-black",
        icon: <SiTiktok className="w-6 h-6" />,
    },
];

export default function ShareBottomSheet({ visible, onClose, onSelect }: ShareBottomSheetProps) {
    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-40"
            onClick={onClose}
        >
            <div
                className="bg-white w-full rounded-t-2xl p-4 flex flex-col gap-3 animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-center font-bold">Share to</h3>

                <div className="flex justify-around mt-2">
                    {PLATFORM_DATA.map(({ platform, label, color, icon }) => (
                        <button
                            key={platform}
                            onClick={() => onSelect(platform)}
                            className={`flex flex-col items-center gap-1 btn ${color ?? ""}`}
                        >
                            {icon}
                            <span className="text-sm">{label}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="btn mt-2 text-red-500 w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
