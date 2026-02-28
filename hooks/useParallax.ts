'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useParallax(speed: number = 0.5) {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Only enable parallax on desktop (768px and above)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const y = useTransform(scrollY, (value) => {
    if (isMobile) return 0;
    return value * speed;
  });

  return { ref, y };
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
