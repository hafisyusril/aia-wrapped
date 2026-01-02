"use client";

import { useEffect, useState } from "react";

interface RankCounterProps {
    target: number;
    duration?: number;
    className?: string;
}

export default function RankCounter({
    target,
    duration = 1000,
    className,
}: RankCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start: number | null = null;
        setCount(0);

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;

            const progress = Math.min(
                (timestamp - start) / duration,
                1
            );

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target, duration]);

    return (
        <span className={className}>
            #{count.toLocaleString("id-ID")}
        </span>
    );
}
