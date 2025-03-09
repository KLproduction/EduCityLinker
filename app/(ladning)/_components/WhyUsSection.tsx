"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MessageSquareText,
  School,
  Video,
  CreditCard,
  ShieldCheck,
  ListChecks,
} from "lucide-react";

export default function WhyUsSection() {
  const trustPoints = [
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24h Staff Contact",
      description:
        "We reply within 24 hours of your enquiry, ensuring you're never left waiting.",
    },
    {
      icon: <MessageSquareText className="h-10 w-10 text-primary" />,
      title: "WhatsApp Contact Option",
      description:
        "Reach us instantly through WhatsApp for quick and convenient communication.",
    },
    {
      icon: <School className="h-10 w-10 text-primary" />,
      title: "Strong School Relationships",
      description:
        "We maintain excellent relationships with all our partner schools for your benefit.",
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "Honest Content & Reviews",
      description:
        "Transparent video content and authentic reviews to help you make informed decisions.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "No Agency Fees",
      description:
        "Zero booking fees or hidden costs - what you see is what you pay.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Free Cancellation Policy",
      description:
        "Flexible plans with our hassle-free cancellation policy for your peace of mind.",
    },
    {
      icon: <ListChecks className="h-10 w-10 text-primary" />,
      title: "Simple Booking Process",
      description:
        "An easy 6-step process from inquiry to enrollment, guiding you every step of the way.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-2 text-3xl font-bold tracking-tight text-rose-500 md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {` We're committed to providing the best experience for our students
            with transparency and excellence`}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  {point.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
