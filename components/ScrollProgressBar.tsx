'use client';

import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ width: scrollYProgress }}
    />
  );
}
