"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to start your English learning journey?
            </h2>
            <p className="text-blue-200 mb-4">
              Join LinguaLink today and connect with the best English learning
              centers in your city.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
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
            <a href="#" className="hover:text-blue-300 transition duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-blue-300 transition duration-300">
              Contact
            </a>
            <a href="#" className="hover:text-blue-300 transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-300 transition duration-300">
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
          <p>&copy; 2023 LinguaLink. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
