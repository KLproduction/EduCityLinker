"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface CaptionTextProps {
  text: string;
  className?: string;
}

const CaptionText: FC<CaptionTextProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  // Opacity transitions from 0 → 1 as user scrolls down
  const mapOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);
  const mobileMapOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh] w-full", className)}
    >
      {/* Laptop Screen */}
      <motion.div
        className="absolute left-0 top-1/4 z-0 hidden h-full w-full md:block"
        style={{ opacity: mapOpacity }}
      >
        <img
          src="/heroMap_upscayl_2x_upscayl-standard-4x.png"
          alt="background"
          className="object-fit sticky top-0"
        />
      </motion.div>
      {/* Mobile Screen */}
      <motion.div
        className="absolute left-0 top-2/4 z-0 h-full w-full overflow-hidden md:hidden"
        style={{ opacity: mobileMapOpacity }}
      >
        <img
          src="/heroMap_upscayl_2x_upscayl-standard-4x.png"
          alt="background"
          className="sticky top-[15%] scale-125 object-cover object-center"
        />
      </motion.div>
      <div
        className={
          "sticky top-0 z-50 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p
            ref={targetRef}
            className={
              "flex flex-wrap p-5 text-2xl font-bold text-rose-500/10 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
            }
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
          <motion.div style={{ opacity: opacity }}>
            <Link href="/explore">
              <InteractiveHoverButton
                text="Explore"
                className="text-rose-500"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-rose-500 dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default CaptionText;
