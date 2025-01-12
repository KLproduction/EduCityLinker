"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Student",
    content:
      "LinguaLink made it so easy to find the perfect English learning center for me. The interactive map and tutor profiles were incredibly helpful!",
    avatar: "/placeholder.svg",
  },
  {
    name: "John D.",
    role: "Learning Center Owner",
    content:
      "As a center owner, LinguaLink has significantly increased our visibility and student engagement. The management tools are fantastic!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emma W.",
    role: "Tutor",
    content:
      "I love how LinguaLink connects me with students who are truly interested in learning. The booking system is seamless and user-friendly.",
    avatar: "/placeholder.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-blue-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-blue-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-blue-700 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
