"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  delay?: number; // Nilai dalam milidetik
  className?: string;
  style?: React.CSSProperties; 
}

export default function AnimatedCounter({
  target,
  duration = 1000,
  delay = 0,
  className,
  style,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let animationFrameId: number;
    
    // Gunakan setTimeout untuk menangani delay
    const timeoutId = setTimeout(() => {
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        
        // Menggunakan easing (opsional) agar lebih mulus
        const value = Math.floor(progress * target);

        setCount(value);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay);

    // Cleanup agar tidak terjadi memory leak atau tabrakan animasi
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, target, duration, delay]);

  if (!mounted) {
    return <span className={className}>0</span>;
  }

  return (
    <span className={className} style={style}>
      {count.toLocaleString("id-ID")}
    </span>
  );
}