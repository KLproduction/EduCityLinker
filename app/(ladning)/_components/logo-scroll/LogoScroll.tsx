import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LogoScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // Animation trigger points
  });

  // Combining both x and y into a single transform
  const transform = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["translate(45%, 45%)", "translate(0%, 0%)"],
  );
  const transformMobile = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["-translate(-30%, 20%)", "translate(0%, 0%)"],
  );

  const scale = useTransform(scrollYProgress, [0, 0.5], [7, 1]);
  const scaleMobile = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  const height = useTransform(scrollYProgress, [0, 0.5], [800, 0]);
  const mobileHeight = useTransform(scrollYProgress, [0, 0.5], [400, 0]);

  const opacity0 = useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.8, 1], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.8, 1], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 1, 0]);

  return (
    <motion.div
      className="relative min-h-[300vh] w-full overflow-hidden bg-zinc-800"
      ref={sectionRef}
    >
      <div className="h-full w-full">
        <motion.div
          style={{
            transform,
            scale,
            height,
          }}
          className="fixed -top-2 left-24 z-[100] w-full text-5xl font-bold text-rose-500"
        >
          {/* SCREEN LOGO */}
          <motion.div
            style={{ scale }}
            className="fixed left-0 top-0 hidden p-3 sm:block"
          >
            <h2 className="pointer-events-none">AMIO</h2>
          </motion.div>

          {/* MOBILE LOGO */}
          <motion.div
            style={{
              scale: scaleMobile,
              transform: transformMobile,
              height: mobileHeight,
            }}
            className="pointer-events-none fixed left-0 top-0 p-3 text-5xl sm:hidden"
          >
            <h2>AMIO</h2>
          </motion.div>
        </motion.div>

        {/* SCREEN CAPTION */}
        <div>
          <motion.h1
            style={{ opacity: opacity0, scale }}
            className="fixed left-20 top-32 -translate-x-1/2 -translate-y-1/2 transform p-10 text-6xl font-bold text-zinc-50"
          >
            Flexible Study
          </motion.h1>

          <motion.h1
            style={{ opacity: opacity1, scale }}
            className="fixed bottom-1/2 left-1/3 right-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 transform p-10 text-6xl font-bold text-zinc-50"
          >
            Summer Exchange
          </motion.h1>

          <motion.h1
            style={{ opacity: opacity2, scale }}
            className="fixed right-24 top-1/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-bold text-zinc-50"
          >
            English Course
          </motion.h1>

          <motion.h1
            style={{ opacity: opacity3, scale }}
            className="fixed left-24 top-3/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-bold text-zinc-50"
          >
            Skilled Teachers
          </motion.h1>

          <motion.h1
            style={{ opacity: opacity4, scale }}
            className="fixed bottom-48 right-48 -translate-x-1/2 -translate-y-1/2 transform text-6xl font-bold text-zinc-50"
          >
            Discover UK
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoScroll;
