"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

export default function TutorDirectory() {
  return (
    <AnimatedSection className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Find Your Perfect Tutor
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="Tutor Directory Preview"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pr-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Tutor Directory
            </h3>
            <ul className="list-disc list-inside mb-6 text-blue-700">
              <li>Browse profiles of qualified tutors</li>
              <li>Check availability and book sessions directly</li>
              <li>Read reviews from other students</li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Find a Tutor
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
