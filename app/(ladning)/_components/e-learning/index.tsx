"use client";

import { cn } from "@/lib/utils";
import { LearningCard } from "./LearningCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const cards = [
  {
    id: 1,
    title: "Conversation",
    image: "/pexels-jopwell-2422290.jpg",
    description:
      "Enhance your speaking skills through interactive exercises and real-life practice scenarios.",
    points: [
      "Learn to express yourself fluently.",
      "Practice pronunciation and intonation.",
      "Build confidence in conversations.",
    ],
    color: "bg-zinc-100",
  },
  {
    id: 2,
    title: "Listening",
    image: "/pexels-nappy-935949.jpg",
    description:
      "Improve your listening comprehension with engaging audio and video lessons.",
    points: [
      "Understand native speakers better.",
      "Learn to recognize different accents.",
      "Improve your ability to follow conversations.",
    ],
    color: "bg-zinc-100",
  },
  {
    id: 3,
    title: "Grammar",
    image: "/pexels-olly-3807755.jpg",
    description:
      "Master English grammar with clear explanations and practice exercises.",
    points: [
      "Learn grammar rules step by step.",
      "Apply grammar in speaking and writing.",
      "Fix common mistakes effectively.",
    ],
    color: "bg-zinc-100",
  },
  {
    id: 4,
    title: "Vocabulary",
    image: "/pexels-rethaferguson-3059748.jpg",
    description:
      "Expand your vocabulary with thematic word lists and interactive activities.",
    points: [
      "Learn new words daily.",
      "Practice using words in context.",
      "Boost your reading and writing skills.",
    ],
    color: "bg-zinc-100",
  },
];

const ELearningPage = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="h-full bg-gradient-to-b from-zinc-100 to-zinc-50">
      <div className={cn(" flex flex-col items-center")}>
        <motion.div ref={sectionRef} className="mb-[50vh] mt-[20vh]">
          {cards.map((card, index) => {
            const targetScale = 1 - (cards.length - index) * 0.05;
            return (
              <motion.div
                key={card.id}
                style={{ position: "sticky", top: `${index * 80}px` }}
              >
                <LearningCard
                  image={card.image!}
                  title={card.title}
                  description={card.description}
                  points={card.points}
                  backgroundColor={card.color}
                  range={[index * 0.25, 1]}
                  targetScale={targetScale}
                  progress={scrollYProgress}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ELearningPage;
