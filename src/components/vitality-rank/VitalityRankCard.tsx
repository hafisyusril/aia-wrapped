"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/src/app/hooks/useInView";
import { getVitalityRankTheme } from "./VitalityRankConfig";
import RankCounter from "./RankCounter";

interface VitalityRankCardProps {
    generalRank: number;
    genderRank: number;
}

export default function VitalityRankCard({
    generalRank,
    genderRank,
}: VitalityRankCardProps) {
    const theme = getVitalityRankTheme("default");
    const { ref, isInView } = useInView({ threshold: 0.6 });

    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (isInView && !shouldAnimate) {
            setShouldAnimate(true);
        }
    }, [isInView, shouldAnimate]);

    return (
        <section
            ref={ref}
            className={`w-full min-h-screen font-sans relative overflow-hidden ${theme.backgroundColor}`}
        >
            <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
                <img
                    src={theme.ornamentSrc}
                    alt=""
                    className="opacity-80 h-full"
                />
            </div>
            <div
                className={`absolute inset-y-0 right-0 w-[120px] opacity-60 ${theme.sideAccentColor}`}
            />
            <div className="relative z-10 flex min-h-screen items-center px-6">
                <div className="flex w-full flex-col py-12">
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-4xl font-extrabold text-white">
                            Vitality<br />Rank
                        </h1>

                        <img src={theme.trophySrc} className="w-[120px]" />
                    </div>
                    <div className="mb-16 h-[2px] w-24 bg-white/70" />
                    <div className="flex flex-col gap-10">
                        <div>
                            <p className="text-lg text-white">General Rank</p>
                            <p className="text-6xl font-extrabold text-white">
                                {shouldAnimate ? (
                                    <RankCounter target={generalRank} />
                                ) : (
                                    "#0"
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg text-white">Gender Rank</p>
                            <p className="text-6xl font-extrabold text-white">
                                {shouldAnimate ? (
                                    <RankCounter target={genderRank} />
                                ) : (
                                    "#0"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
