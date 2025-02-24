"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setOrganizationData } from "@/redux/store";

const AirportTransferInput = () => {
  const organizationData = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  const handleTransferToggle = (checked: boolean) => {
    dispatch(
      setOrganizationData({
        airportTransfers: checked,
        ...(!checked && {
          airportTransferOnArrivalAndDeparturePrice: 0,
          airportTransferArrivalOnlyPrice: 0,
          airportTransferDepartureOnlyPrice: 0,
        }),
      }),
    );
  };

  const handlePriceChange = (
    type: "round-trip" | "arrival" | "departure",
    value: string,
  ) => {
    const numValue = value === "" ? 0 : Math.floor(Number(value));

    const updateData: any = {};
    switch (type) {
      case "round-trip":
        updateData.airportTransferOnArrivalAndDeparturePrice = numValue;
        break;
      case "arrival":
        updateData.airportTransferArrivalOnlyPrice = numValue;
        break;
      case "departure":
        updateData.airportTransferDepartureOnlyPrice = numValue;
        break;
    }
    dispatch(setOrganizationData(updateData));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="airportTransfers" className="text-sm font-medium">
              Airport Transfers
            </Label>
            <Switch
              id="airportTransfers"
              checked={organizationData.airportTransfers}
              onCheckedChange={handleTransferToggle}
            />
          </div>

          <div
            className={cn(
              "grid gap-6",
              !organizationData.airportTransfers && "opacity-50",
            )}
          >
            <div className="space-y-2">
              <Label htmlFor="bothPrice" className="text-sm">
                Round Trip Transfer Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <Input
                  id="bothPrice"
                  type="number"
                  min="0"
                  className="pl-7"
                  value={
                    organizationData.airportTransferOnArrivalAndDeparturePrice
                  }
                  onChange={(e) =>
                    handlePriceChange("round-trip", e.target.value)
                  }
                  disabled={!organizationData.airportTransfers}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalPrice" className="text-sm">
                Arrival Only Transfer Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="arrivalPrice"
                  type="number"
                  min="0"
                  className="pl-7"
                  value={organizationData.airportTransferArrivalOnlyPrice}
                  onChange={(e) => handlePriceChange("arrival", e.target.value)}
                  disabled={!organizationData.airportTransfers}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departurePrice" className="text-sm">
                Departure Only Transfer Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="departurePrice"
                  type="number"
                  min="0"
                  className="pl-7"
                  value={organizationData.airportTransferDepartureOnlyPrice}
                  onChange={(e) =>
                    handlePriceChange("departure", e.target.value)
                  }
                  disabled={!organizationData.airportTransfers}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirportTransferInput;
