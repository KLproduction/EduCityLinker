"use client";

import Image from "next/image";
import AnimatedSection from "../AnimatedSection";

export default function ChatFunctionality() {
  return (
    <AnimatedSection className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Seamless Communication
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="Chat Functionality Preview"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Chat with Centers and Tutors
            </h3>
            <ul className="list-disc list-inside mb-6 text-blue-700">
              <li>Real-time messaging with learning centers and tutors</li>
              <li>Share files and multimedia for efficient communication</li>
              <li>Get quick answers with automated responses for FAQs</li>
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
