"use client";

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

    return (
        <section
            className={`w-full min-h-screen font-sans relative overflow-hidden ${theme.backgroundColor}`}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={theme.ornamentSrc}
                    className="h-full opacity-80"
                    alt=""
                />
            </div>
            <div
                className={`absolute inset-y-0 right-0 w-[120px] opacity-60 ${theme.sideAccentColor}`}
            />

            <div
                ref={ref}
                className="relative z-10 flex min-h-screen items-center px-6"
            >
                <div className="flex w-full flex-col py-12 gap-10">
                    <div>
                        <p className="text-white">General Rank</p>
                        <p className="text-6xl font-extrabold text-white">
                            {isInView ? (
                                <RankCounter key="general" target={generalRank} />
                            ) : (
                                "#0"
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-white">Gender Rank</p>
                        <p className="text-6xl font-extrabold text-white">
                            {isInView ? (
                                <RankCounter key="gender" target={genderRank} />
                            ) : (
                                "#0"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
