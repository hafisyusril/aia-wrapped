"use client";

import { favoriteReward } from "./favoriteRewardConfig";
import { formatStoreList } from "./favoriteRewardUtils";

interface FavoriteRewardCardProps {
    userName: string;
}

export default function FavoriteRewardCard({ userName }: FavoriteRewardCardProps) {
    const { background, headerBackground, illustrationSrc, title, message, stores } = favoriteReward;

    return (
        <section className={`w-full min-h-screen flex flex-col font-sans ${background}`}>
            <div className={`px-6 py-12 ${headerBackground}`}>
                <div className="text-white text-left">
                    <h1 className="text-4xl font-extrabold leading-snug mb-2">
                        {title}
                    </h1>
                    <p className="text-lg font-medium">
                        Reward summary for {userName}
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between px-6 py-6">
                <div className="text-black text-base sm:text-lg font-medium leading-relaxed mb-6 text-left">
                    {message.map((line, index) => (
                        <p key={index} className="mb-2">
                            {line}
                        </p>
                    ))}
                    <p className="mt-4 font-semibold">
                        Stores: {formatStoreList(stores)}
                    </p>
                </div>
                <div className="flex-1 w-full">
                    <img
                        src={illustrationSrc}
                        alt="Favorite Reward Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
