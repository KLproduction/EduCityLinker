"use client";

import { Minus, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditRating = ({ setValue, watch }: Props) => {
  const rating = watch("rating") ?? 3;
  const ratingDescription = watch("ratingDescription") ?? "";

  const handleChange = (value: number) => {
    const clampedValue = Math.min(5, Math.max(0.5, value));
    const roundedValue = Math.round(clampedValue * 2) / 2;
    setValue("rating", roundedValue, { shouldValidate: true });
  };

  const increment = () => handleChange(rating + 0.5);
  const decrement = () => handleChange(rating - 0.5);

  const onTextareaChange = (value: string) => {
    setValue("ratingDescription", value, { shouldValidate: true });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex flex-col justify-center gap-4">
          <Label
            htmlFor="rating"
            className="text-center text-4xl font-bold text-primary underline underline-offset-4"
          >
            {rating}
          </Label>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrement}
              disabled={rating <= 0.5}
              type="button"
              aria-label="Decrease rating"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              type="number"
              min={0.5}
              max={5}
              step={0.5}
              value={rating}
              onChange={(e) =>
                handleChange(Number.parseFloat(e.target.value) || 0.5)
              }
              className="hidden w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <div className="flex w-full justify-between">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-6 w-6",
                    i < Math.floor(rating)
                      ? "fill-primary text-primary"
                      : i === Math.floor(rating) && rating % 1 !== 0
                        ? "fill-primary/20 text-primary"
                        : "fill-muted text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={increment}
              disabled={rating >= 5}
              type="button"
              aria-label="Increase rating"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <h1>Description</h1>
        <Textarea
          rows={6}
          className="w-full border-zinc-800"
          placeholder="Describe the rating"
          value={ratingDescription}
          onChange={(e) => onTextareaChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditRating;
