"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary py-12 text-white">
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
            <p className="mb-4 text-zinc-50">
              Join EduCityLinker today and connect with the best English
              learning centers in your city.
            </p>
            <Button
              variant={"outline"}
              size="lg"
              className="transform rounded-full px-6 py-3 font-bold text-primary transition duration-300 ease-in-out hover:scale-105"
            >
              Sign Up Now
            </Button>
          </motion.div>
          <motion.div
            className="flex flex-col items-center space-y-6 md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="z-10 flex space-x-4">
              <a
                href="#"
                className="transition duration-300 hover:text-rose-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="transition duration-300 hover:text-rose-300"
              >
                Contact
              </a>
              <a
                href="#"
                className="transition duration-300 hover:text-rose-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition duration-300 hover:text-rose-300"
              >
                Terms of Service
              </a>
            </div>
            <motion.div
              className="flex w-full items-center justify-center gap-10 space-x-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition duration-300 hover:scale-110 hover:text-rose-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="size-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition duration-300 hover:scale-110 hover:text-rose-300"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="size-6" />
              </a>
              <a
                href="mailto:contact@educitylinker.com"
                className="transform transition duration-300 hover:scale-110 hover:text-rose-300"
                aria-label="Send us an email"
              >
                <Mail className="size-6" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 text-center text-zinc-50"
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
