"use client";

import { MapPin, Users, MessageCircle, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-blue-500" />,
    title: "Interactive Map",
    description:
      "Easily find and filter English learning centers in your area.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Tutor Directory",
    description: "Browse and book sessions with qualified tutors.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
    title: "Chat Functionality",
    description: "Communicate directly with centers and tutors.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-blue-500" />,
    title: "Student Dashboard",
    description: "Track your progress and manage your learning journey.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center text-blue-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              variants={itemVariants}
            >
              {feature.icon}
              <h3 className="mt-4 mb-2 text-xl font-semibold text-blue-800">
                {feature.title}
              </h3>
              <p className="text-blue-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
