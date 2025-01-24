"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <Image
        src="/pexels-olly-3776180.jpg"
        alt="background"
        fill
        className="inner pointer-events-none absolute inset-0 z-0 object-cover brightness-50 contrast-100 saturate-200 filter backdrop-blur-md"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 50, 0.5), rgba(0, 0, 100, 0.7))",
        }}
      />

      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <motion.h1
          className="z-10 mb-4 text-5xl font-bold text-zinc-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to EduCityLinker
        </motion.h1>
        <motion.p
          className="mb-8 flex text-xl text-blue-700"
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
            className="transform rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// {/* Background Overlay Animation - Top */}
// <motion.div
//   className="absolute inset-0 bg-zinc-500  h-1/2 z-[9999]"
//   initial={{ scaleY: 1 }}
//   animate={{ scaleY: 0 }}
//   transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
//   style={{ transformOrigin: "center top" }}
// ></motion.div>

// {/* Line Animation at the Middle */}
// <motion.div
//   className="absolute top-1/2 left-0 w-full h-1 bg-zinc-50 z-[9999]"
//   initial={{ scaleX: 0, opacity: 1 }}
//   animate={{ scaleX: 1, opacity: 0 }}
//   transition={{
//     duration: 0.8,
//     ease: "easeInOut",
//     opacity: { delay: 0.8, duration: 0.5 },
//   }}
//   style={{ transformOrigin: "left center" }}
// ></motion.div>

// {/* Background Overlay Animation - Bottom */}
// <motion.div
//   className="absolute bottom-0 inset-x-0 bg-zinc-500  h-1/2 z-[99999]"
//   initial={{ scaleY: 1 }}
//   animate={{ scaleY: 0 }}
//   transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
//   style={{ transformOrigin: "center bottom" }}
// ></motion.div>
