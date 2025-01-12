"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, Laptop, MessageCircle } from "lucide-react";

export default function ScrollCards() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const contentTranslateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );
  const captionTranslateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -50]
  );
  const cardsScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);

  const learningOptions = [
    {
      id: 1,
      title: "Learning Center Near Me",
      icon: <BookOpen className="h-6 w-6" />,
      description:
        "Find local learning centers for personalized, face-to-face education and support.",
    },
    {
      id: 2,
      title: "Chat with Tutor",
      icon: <MessageCircle className="h-6 w-6" />,
      description:
        "Connect with expert tutors online for real-time help and guidance on various subjects.",
    },
    {
      id: 3,
      title: "Self Studying Platform",
      icon: <Laptop className="h-6 w-6" />,
      description:
        "Access a comprehensive online platform for self-paced learning across multiple disciplines.",
    },
    {
      id: 4,
      title: "IELTS Prep",
      icon: <GraduationCap className="h-6 w-6" />,
      description:
        "Prepare for the IELTS exam with specialized resources, practice tests, and study materials.",
    },
  ];

  return (
    <section ref={sectionRef} className={cn("relative min-h-screen")}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pexels-yankrukov-8199759.jpg')",
          opacity: backgroundOpacity,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
        style={{
          opacity: contentOpacity,
          y: contentTranslateY,
        }}
      >
        <motion.div
          className="text-center mb-12"
          style={{
            y: captionTranslateY,
          }}
        >
          <h1 className="text-4xl md:text-5xl text-zinc-50 font-bold mb-4">
            Learning with{" "}
            <span className="bg-zinc-50 px-2 py-1 text-zinc-900">
              EduCityLinker
            </span>
          </h1>
          <p className="text-zinc-50 text-sm md:text-md max-w-2xl mx-auto">
            Learn English quickly with top-notch teachers in Bristol! Our
            courses help you improve your skills, make new friends, and have fun
            while learning.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
          style={{ scale: cardsScale }}
        >
          {learningOptions.map((option) => (
            <Card
              key={option.id}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {option.icon}
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
