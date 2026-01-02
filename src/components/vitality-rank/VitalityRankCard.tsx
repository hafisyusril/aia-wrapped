"use client";

import { useInView } from "@/src/app/hooks/useInView";
import { getVitalityRankTheme } from "./VitalityRankConfig";
import RankCounter from "./RankCounter";
import { useState, useEffect } from "react";

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

    const [counterKey, setCounterKey] = useState(0);

    useEffect(() => {
        if (isInView) {
            setCounterKey((prev) => prev + 1);
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            className={`w-full min-h-screen font-sans relative overflow-hidden ${theme.backgroundColor}`}
        >
            <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
                <img
                    src={theme.ornamentSrc}
                    alt="Vitality Ornament"
                    width={520}
                    height={900}
                    className="opacity-80 h-full"
                />
            </div>

            <div
                className={`
                    absolute inset-y-0 right-0 w-[120px] z-[1]
                    opacity-60 pointer-events-none
                    ${theme.sideAccentColor}
                `}
            />

            <div className="relative z-10 flex min-h-screen items-center px-6">
                <div className="flex w-full flex-col py-12">
                    <div className="mb-6 flex items-start justify-between">
                        <h1 className="text-4xl font-extrabold leading-tight text-white">
                            Vitality
                            <br />
                            Rank
                        </h1>

                        <img
                            src={theme.trophySrc}
                            alt="Trophy"
                            width={120}
                            height={200}
                            className="mt-2 mr-8"
                        />
                    </div>

                    <div className="mb-16 h-[2px] w-24 bg-white/70" />

                    <div className="flex flex-col gap-10">
                        <div>
                            <p className="text-lg font-medium text-white">
                                General Rank
                            </p>

                            {isInView ? (
                                <p className="text-6xl font-extrabold text-white">
                                    <RankCounter
                                        key={`general-${counterKey}`}
                                        target={generalRank}
                                    />
                                </p>
                            ) : (
                                <p className="text-6xl font-extrabold text-white">
                                    #0
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-lg font-medium text-white">
                                Gender Rank
                            </p>

                            {isInView ? (
                                <p className="text-6xl font-extrabold text-white">
                                    <RankCounter
                                        key={`gender-${counterKey}`}
                                        target={genderRank}
                                    />
                                </p>
                            ) : (
                                <p className="text-6xl font-extrabold text-white">
                                    #0
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
