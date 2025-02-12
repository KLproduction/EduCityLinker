"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ageGroups, courseLevels } from "@/data/data";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  parseAsInteger,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 2000;
const DEFAULT_PRICE = 2000 / 2;

const PriceFilter = () => {
  const [selectedPrice, setSelectedPrice] = useState<number>(DEFAULT_PRICE);
  const [labels, setLabels] = useQueryState(
    "price",
    parseAsInteger.withDefault(1000).withOptions({ clearOnDefault: true }),
  );

  const params = useSearchParams();
  const priceFilter = params.get("price");
  const handlePriceChange = (value: number[]) => {
    setSelectedPrice(value[0]);
  };
  useEffect(() => {
    setLabels(selectedPrice);
  }, [selectedPrice]);

  const handleReset = () => {
    setSelectedPrice(DEFAULT_PRICE);
    setLabels(DEFAULT_PRICE); // This will remove the "price" param from the URL due to clearOnDefault.
  };

  return (
    <div className={cn("space-y-4")}>
      <h1 className="text-lg font-bold">Price Filter</h1>
      <div className="space-y-2">
        <Slider
          min={MIN_PRICE}
          max={2000}
          step={10}
          value={[selectedPrice]}
          onValueChange={handlePriceChange}
          className={cn(!priceFilter && "opacity-50")}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${MIN_PRICE}</span>
          <span>${selectedPrice}</span>
          <span>${MAX_PRICE}</span>
        </div>
      </div>
      <Button
        variant={"outline"}
        onClick={() => handleReset()}
        className="flex w-full justify-center text-xs"
        disabled={!priceFilter}
      >
        Reset
      </Button>
    </div>
  );
};

export default PriceFilter;
