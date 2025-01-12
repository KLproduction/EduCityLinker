"use client";

import { useState } from "react";

import { CenterInfoCard } from "./CenterInfoCard";
import ImageSwiper from "./PartnershipSliderSection";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PartnershipSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className=" bg-zinc-50 min-h-[60vh] flex flex-col items-center ">
      <div className="pt-10  flex flex-col gap-3 w-full justify-start container ">
        <h1 className="text-3xl font-bold text-blue-900">Our Partner</h1>
        <Link href="/centers" className=" text-blue-700 ml-5">
          <div className=" flex items-center gap-3 w-full">
            <p>view all centers</p>
            <ArrowRightIcon />
          </div>
        </Link>
      </div>
      <div className="container mx-auto px-2 py-8 ">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <ImageSwiper onSlideChange={handleSlideChange} />
          <div className="w-full md:w-1/3">
            <CenterInfoCard activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};
