"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CaptionText from "./caption-text/CaptionText";
import { useRef } from "react";

const HeroSearchBar = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <motion.section
      className="relative my-20 flex min-h-screen flex-col items-center justify-center py-20 text-center"
      ref={targetRef}
      style={{ scale }}
    >
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <CaptionText text="Connecting Students with the Best English Learning Centers in Your City" />
      </div>
    </motion.section>
  );
};

export default HeroSearchBar;
