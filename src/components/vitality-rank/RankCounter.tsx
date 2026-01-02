"use client";

import { useEffect, useState } from "react";

interface RankCounterProps {
    target: number;
    duration?: number;
}

export default function RankCounter({
    target,
    duration = 1000,
}: RankCounterProps) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = performance.now();

        function animate(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);

            setValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [target, duration]);

    return <span>#{value.toLocaleString()}</span>;
}
