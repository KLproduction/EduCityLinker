"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cards = [
  { id: 1, title: "Card 1", content: "Content for the first card." },
  { id: 2, title: "Card 2", content: "Content for the second card." },
  { id: 3, title: "Card 3", content: "Content for the third card." },
];

export default function ScrollCards() {
  const sectionRef = useRef(null);
  const captionRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"], // Adjust offsets based on your needs
  });

  // Transform values based on scroll progress
  const height = useTransform(scrollY, [400, 700], ["0vh", "100vh"]);
  const width = useTransform(scrollY, [250, 500], ["100vw", "100vw"]);
  const opacity = useTransform(scrollY, [0, 1000], [1, 1]);
  const backgroundTransformY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const captionTransformY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const cardContent = [
    { id: 1, title: "Learning Center Near Me", icon: "", description: "" },
    { id: 2, title: "Chat with Tutor", icon: "", description: "" },
    { id: 3, title: "Online Learning Platform", icon: "", description: "" },
    { id: 3, title: "Online Learning Platform", icon: "", description: "" },
  ];

  return (
    <div ref={sectionRef} className={cn("relative h-[100]")}>
      <motion.div
        style={{
          height,
          width,
          opacity,
        }}
        className={cn(
          "flex flex-col items-center justify-center overflow-hidden relative h-full"
        )}
      >
        {/* Sticky Background */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-75"
          style={{
            backgroundImage: "url('/pexels-yankrukov-8199759.jpg')",
          }}
        />

        {/* Caption */}
        <motion.div
          style={{
            y: captionTransformY,
          }}
          className="flex flex-col gap-3 z-10"
        >
          <h1 className="text-4xl text-zinc-50 font-bold flex gap-3 items-center">
            <span className=" text-md">Learning with</span>
            <span className="bg-zinc-50 p-1 text-zinc-900">EduCityLinker</span>
          </h1>
          <p className="text-zinc-50 text-md">
            Learn English quickly with top-notch teachers in Bristol! Our
            courses help you improve your skills, make new friends, and have fun
            while learning.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div className="flex items-center gap-5"></motion.div>
      </motion.div>
    </div>
  );
}

{
  /* <AnimatePresence mode="wait">
  <motion.div
    key={cards[currentCard].id}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
    className="relative text-center w-96"
  >
    <Card className="text-2xl font-bold">
      <CardTitle className="text-lg text-gray-700 mt-4">
        {cards[currentCard].title}
      </CardTitle>
      <CardDescription>{cards[currentCard].content}</CardDescription>
    </Card>
  </motion.div>
</AnimatePresence> */
}
