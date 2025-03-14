"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      className="w-full bg-white font-sans dark:bg-neutral-950 md:px-10"
      ref={containerRef}
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 max-w-4xl text-lg font-black text-rose-500 dark:text-white md:text-4xl">
          How to Book Your Course
        </h2>
        <p className="max-w-sm text-sm font-bold text-neutral-700 dark:text-neutral-300 md:text-base">
          Follow our simple six-step process to find and book your perfect
          educational experience
        </p>
      </motion.div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-black text-neutral-500 dark:text-neutral-500 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-4xl font-black text-neutral-500 dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              <div className="text-xs font-bold leading-loose">
                {item.content}{" "}
              </div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-rose-500 from-[0%] via-pink-300 via-[10%] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};
