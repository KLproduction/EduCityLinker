"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  gallery: string[];
};

const ListingGallery = ({ gallery }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallery[activeIndex];

  const next = () => {
    setActiveIndex((current) => (current + 1) % gallery.length);
  };

  const previous = () => {
    setActiveIndex(
      (current) => (current - 1 + gallery.length) % gallery.length,
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="relative rounded-xl">
        <img
          src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${active}/-/preview/800x600/`}
          alt={`Gallery image ${activeIndex + 1} of ${gallery.length}`}
          className="aspect-video z-20 max-h-[600px] w-full overflow-hidden rounded-xl object-cover object-center"
        />

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={previous}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto p-3">
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative flex-shrink-0"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${image}/-/preview/300x300/`}
              alt={`Go to image ${index + 1}`}
              className={cn(
                "h-16 w-16 cursor-pointer rounded-lg object-cover transition-all duration-300 hover:opacity-100 md:h-20 md:w-20",
                activeIndex === index
                  ? "opacity-100 ring-2 ring-primary"
                  : "opacity-60",
              )}
            />
          </button>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1">
        {gallery.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              activeIndex === index ? "w-4 bg-primary" : "w-1.5 bg-primary/30",
            )}
          >
            <span className="sr-only">Go to image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListingGallery;
