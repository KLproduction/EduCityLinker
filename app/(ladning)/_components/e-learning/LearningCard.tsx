import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  image?: string;
  title: string;
  description: string;
  points: string[];
  className?: string;
  backgroundColor?: string;
  range: number[];
  targetScale?: number;
  progress: MotionValue<number>;
};

export const LearningCard = ({
  image,
  title,
  description,
  points,
  className,
  backgroundColor,
  range,
  targetScale,
  progress,
}: Props) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "h-screen flex flex-col  justify-center items-center ",
        className
      )}
    >
      <motion.div style={{ scale: cardScale }}>
        <Card
          className={cn(
            "h-auto w-auto md:h-[400px] md:w-[800px] overflow-hidden border-none",
            backgroundColor
          )}
        >
          <CardHeader className="text-3xl text-zinc-900 w-full text-center">
            <CardTitle>{title}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row p-6 md:gap-6  ">
            <motion.div className="md:w-1/2  overflow-hidden rounded-xl">
              <motion.img
                style={{ scale: imageScale }}
                src={image}
                alt={title}
                className=" object-cover object-center hover:scale-105"
              />
            </motion.div>
            <div className="flex flex-col gap-3 justify-between flex-1 mt-4 md:mt-0">
              <div>
                <p className="text-gray-700 mt-2">{description}</p>
                <ul className="list-disc list-inside mt-4 text-gray-700">
                  {points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className=" w-full flex justify-end ">
                <Button>Start Learning</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
