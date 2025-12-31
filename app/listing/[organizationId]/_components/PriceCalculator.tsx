"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formattedPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { brandName } from "@/data/data";

interface PriceCalculatorProps {
  basePrice: number;
}

export default function PriceCalculator({ basePrice }: PriceCalculatorProps) {
  const [week, setWeek] = useState(1);

  const originalPrice = basePrice * week;
  const discountPrice = originalPrice * 0.9;

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Price Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Week {week}</label>
          <Slider
            value={[week]}
            onValueChange={(value) => setWeek(value[0])}
            min={1}
            max={12}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Week 1</span>
            <span>Week 12</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-sm font-medium">Original Price:</span>
            <span className="text-lg font-bold">
              {formattedPrice(originalPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-end gap-2 text-rose-500">
              <h4>{brandName}</h4>
              <p className="font-bold">Price:</p>
            </div>
            <span className="text-lg font-bold text-rose-600">
              {formattedPrice(discountPrice)}
            </span>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            You save: {formattedPrice(originalPrice - discountPrice)}
          </div>
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-500" />
              <span className="text-sm leading-none">{`No Hidden Fees – What you see is what you pay.`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-500" />
              <span className="text-sm leading-none">
                {" "}
                {`Flexible Cancellation – Change or cancel lessons anytime. A small 5% admin fee applies for refunded payments to cover processing costs.`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
