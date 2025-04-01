"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formattedPrice } from "@/lib/formatPrice";
import { Check } from "lucide-react";
import { setEnrollmentData } from "@/redux/slice/create-enrollmentRequestSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AIMO_DISCOUNT } from "@/data/data";

interface PriceCalculatorProps {
  basePrice: number;
}

export default function EnrollmentPriceSelector({
  basePrice,
}: PriceCalculatorProps) {
  const enrollmentData = useAppSelector(
    (state) => state.createEnrollmentRequest,
  );
  const dispatch = useAppDispatch();
  const [week, setWeek] = useState(enrollmentData.weeks);
  const originalPrice = basePrice * week;
  const discountPrice = originalPrice * 0.9;

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= 12) {
      setWeek(value);

      const updatedOriginalPrice = basePrice * value;
      const updatedDiscountPrice = updatedOriginalPrice * AIMO_DISCOUNT;

      dispatch(
        setEnrollmentData({
          weeks: value,
        }),
      );
    } else if (e.target.value === "") {
      setWeek(1);
      dispatch(
        setEnrollmentData({
          weeks: 1,
        }),
      );
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Select Duration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="week-input" className="text-sm font-medium">
            Week {week}
          </label>
          <Input
            id="week-input"
            type="number"
            min={1}
            max={12}
            value={week}
            onChange={handleWeekChange}
            className="w-full"
          />
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
              <h4>AIMO</h4>
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
