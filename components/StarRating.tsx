"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  maxStars?: number;
  onChange?: (newRating: number) => void;
  readOnly?: boolean;
};

const StarRating = ({
  rating,
  maxStars = 5,
  onChange,
  readOnly = false,
}: StarRatingProps) => {
  const handleClick = (index: number) => {
    if (onChange && !readOnly) {
      onChange(index + 1); // Convert from zero-based index
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          onClick={() => handleClick(i)}
          className={cn(
            "size-4 cursor-pointer transition",
            i < Math.floor(rating)
              ? "fill-primary text-primary"
              : i === Math.floor(rating) && rating % 1 !== 0
                ? "fill-primary/20 text-primary"
                : "fill-muted text-muted-foreground",
            readOnly ? "cursor-default" : "hover:scale-110",
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;
