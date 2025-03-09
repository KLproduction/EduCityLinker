"use client";

import Footer from "./_components/Footer";
import Hero from "./_components/Hero";

import { PartnershipSlider } from "./_components/partnershipSlider";
import FeaturesPage from "./_components/feature";
import ELearningPage from "./_components/e-learning";
import Lenis from "lenis";
import { useEffect } from "react";
import LogoScroll from "./_components/logo-scroll/LogoScroll";
import ParallaxBg from "./_components/parallex-bg/ParallaxBg";
import { motion } from "framer-motion";
import DragAndDrop from "./_components/drag-and-drop-hero/DragAndDrop";
import NewNav from "@/components/Nabar/newNav";
import HeroSearchBar from "./_components/HeroSearchBar";
import StepIntro from "./_components/StepIntro";
import WhyUsSection from "./_components/WhyUsSection";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="h-full w-full bg-white">
      <LogoScroll />
      <HeroSearchBar />
      <StepIntro />
      <WhyUsSection />
      {/* <FeaturesPage /> */}
      {/* <ParallaxBg /> */}
      {/* <Hero /> */}
      {/* <DragAndDrop className="z-[200] bg-zinc-800" /> */}
      {/* <ELearningPage /> */}
      {/* <PartnershipSlider /> */}
      {/* <MapPreview />
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
}
