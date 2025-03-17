"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {};

const MobileTop = (props: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Logo animation
  const logoTransform = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["translate(0%, 20%)", "translate(0%, 0%)"],
  );
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [3, 1]);
  const logoHeight = useTransform(scrollYProgress, [0, 0.15], [400, 0]);

  // Sequential caption animations - each caption appears and disappears in sequence
  const caption1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const caption2Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    [0, 1, 0],
  );
  const caption3Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.75],
    [0, 1, 0],
  );
  const caption4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    [0, 1, 0],
  );
  const caption5Opacity = useTransform(
    scrollYProgress,
    [0.95, 0.975, 1.0],
    [0, 1, 0],
  );

  return (
    <motion.div
      className="relative min-h-[300vh] w-full overflow-hidden bg-white"
      ref={sectionRef}
    >
      <div className="h-full w-full">
        {/* Center-aligned sequential captions */}
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-md px-4 text-center">
            {/* Each caption is positioned in the same place but appears at different scroll positions */}
            <motion.h1
              style={{ opacity: caption1Opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-rose-500 sm:text-4xl"
            >
              FLEXIBLE STUDY
            </motion.h1>

            <motion.h1
              style={{ opacity: caption2Opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-rose-500 sm:text-4xl"
            >
              SUMMER EXCHANGE
            </motion.h1>

            <motion.h1
              style={{ opacity: caption3Opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-rose-500 sm:text-4xl"
            >
              ENGLISH COURSE
            </motion.h1>

            <motion.h1
              style={{ opacity: caption4Opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-rose-500 sm:text-4xl"
            >
              SKILLED TEACHERS
            </motion.h1>

            <motion.h1
              style={{ opacity: caption5Opacity }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold text-rose-500 sm:text-4xl"
            >
              DISCOVER UK
            </motion.h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileTop;
