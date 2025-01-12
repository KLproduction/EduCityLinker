"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-20 text-center min-h-screen flex flex-col justify-center items-center relative">
      {/* Background Overlay Animation - Top */}
      <motion.div
        className="absolute inset-0 bg-zinc-500 z-20 h-1/2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
        style={{ transformOrigin: "center top" }}
      ></motion.div>

      {/* Line Animation at the Middle */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-1 bg-zinc-50 z-50"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          opacity: { delay: 0.8, duration: 0.5 },
        }}
        style={{ transformOrigin: "left center" }}
      ></motion.div>

      {/* Background Overlay Animation - Bottom */}
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-zinc-500 z-20 h-1/2"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
        style={{ transformOrigin: "center bottom" }}
      ></motion.div>

      <Image
        src="/pexels-olly-3776180.jpg"
        alt="background"
        fill
        className="object-cover absolute z-0 inset-0 filter brightness-50 backdrop-blur-md inner contrast-100 saturate-200 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 50, 0.5), rgba(0, 0, 100, 0.7))",
        }}
      />

      <div className=" min-h-screen w-full items-center justify-center flex flex-col">
        <motion.h1
          className="mb-4 text-5xl font-bold text-zinc-50 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to EduCityLinker
        </motion.h1>
        <motion.p
          className="mb-8 text-xl text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Connecting Students with the Best English Learning Centers in Your
          City
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
