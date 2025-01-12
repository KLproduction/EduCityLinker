"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../AnimatedSection";

export default function MapPreview() {
  return (
    <AnimatedSection className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Discover Learning Centers Near You
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg"
              alt="Interactive Map Preview"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Interactive Map
            </h3>
            <ul className="list-disc list-inside mb-6 text-blue-700">
              <li>Filter centers by type, rating, or proximity</li>
              <li>View detailed information for each center</li>
              <li>Get directions to your chosen learning center</li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Explore the Map
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
