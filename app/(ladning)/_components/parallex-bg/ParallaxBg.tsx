import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;
const ParallaxBg = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["170%", "100%"],
  );

  const clip1 = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 1], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}%  ${clip2}%, ${clip1}%  ${clip2}%)`;

  return (
    <motion.div className="h-full bg-zinc-800" ref={sectionRef}>
      <motion.div className="relative w-full" style={{ height: `400vh` }}>
        <motion.div
          ref={bgRef}
          className="sticky top-0 h-screen w-full bg-cover bg-center saturate-150"
          style={{
            backgroundImage: "url(/pexels-george-pak-7972311.jpg)",
            backgroundSize,
            opacity,
            clipPath,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-b from-zinc-950/0 to-zinc-800"></div>
      </motion.div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return <div></div>;
};

export default ParallaxBg;
