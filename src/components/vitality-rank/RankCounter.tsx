"use client";

import { useEffect, useState } from "react";

interface RankCounterProps {
    target: number;
    duration?: number;
}

export default function RankCounter({
    target,
    duration = 2000,
}: RankCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start: number | null = null;
        let rafId: number;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;

            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            }
        };

        rafId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafId);
    }, [target, duration]);

    return <>{count.toLocaleString("id-ID")}</>;
}
