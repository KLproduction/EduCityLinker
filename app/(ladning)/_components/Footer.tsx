"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-blue-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-3xl font-bold">
              Ready to start your English learning journey?
            </h3>
            <p className="mb-4 text-blue-200">
              Join EduCityLinker today and connect with the best English
              learning centers in your city.
            </p>
            <Button
              size="lg"
              className="transform rounded-full bg-white px-6 py-3 font-bold text-blue-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-100"
            >
              Sign Up Now
            </Button>
          </motion.div>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#" className="transition duration-300 hover:text-blue-300">
              About Us
            </a>
            <a href="#" className="transition duration-300 hover:text-blue-300">
              Contact
            </a>
            <a href="#" className="transition duration-300 hover:text-blue-300">
              Privacy Policy
            </a>
            <a href="#" className="transition duration-300 hover:text-blue-300">
              Terms of Service
            </a>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 text-center text-blue-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; 2025 Shim-solution. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
