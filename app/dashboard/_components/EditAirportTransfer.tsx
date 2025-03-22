"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditAirportTransfer = ({ setValue, watch }: Props) => {
  const airportTransfers = watch("airportTransfers") ?? false;
  const roundTrip = watch("airportTransferOnArrivalAndDeparturePrice") ?? 0;
  const arrivalOnly = watch("airportTransferArrivalOnlyPrice") ?? 0;
  const departureOnly = watch("airportTransferDepartureOnlyPrice") ?? 0;

  // Cache original values when toggled off
  const originalPricesRef = useRef({
    roundTrip,
    arrivalOnly,
    departureOnly,
  });

  const handleTransferToggle = (checked: boolean) => {
    setValue("airportTransfers", checked, { shouldValidate: true });

    if (!checked) {
      // Cache current prices before clearing
      originalPricesRef.current = {
        roundTrip,
        arrivalOnly,
        departureOnly,
      };

      // Reset to 0
      setValue("airportTransferOnArrivalAndDeparturePrice", 0, {
        shouldValidate: true,
      });
      setValue("airportTransferArrivalOnlyPrice", 0, { shouldValidate: true });
      setValue("airportTransferDepartureOnlyPrice", 0, {
        shouldValidate: true,
      });
    } else {
      // Restore cached prices
      setValue(
        "airportTransferOnArrivalAndDeparturePrice",
        originalPricesRef.current.roundTrip,
        { shouldValidate: true },
      );
      setValue(
        "airportTransferArrivalOnlyPrice",
        originalPricesRef.current.arrivalOnly,
        { shouldValidate: true },
      );
      setValue(
        "airportTransferDepartureOnlyPrice",
        originalPricesRef.current.departureOnly,
        { shouldValidate: true },
      );
    }
  };

  const handlePriceChange = (
    type: "round-trip" | "arrival" | "departure",
    value: string,
  ) => {
    const numValue = value === "" ? 0 : Math.floor(Number(value));

    switch (type) {
      case "round-trip":
        setValue("airportTransferOnArrivalAndDeparturePrice", numValue, {
          shouldValidate: true,
        });
        break;
      case "arrival":
        setValue("airportTransferArrivalOnlyPrice", numValue, {
          shouldValidate: true,
        });
        break;
      case "departure":
        setValue("airportTransferDepartureOnlyPrice", numValue, {
          shouldValidate: true,
        });
        break;
    }
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
              checked={airportTransfers}
              onCheckedChange={handleTransferToggle}
            />
          </div>

          <div className={cn("grid gap-6", !airportTransfers && "opacity-50")}>
            {/* Round Trip */}
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
                  value={roundTrip}
                  onChange={(e) =>
                    handlePriceChange("round-trip", e.target.value)
                  }
                  disabled={!airportTransfers}
                />
              </div>
            </div>

            {/* Arrival Only */}
            <div className="space-y-2">
              <Label htmlFor="arrivalPrice" className="text-sm">
                Arrival Only Transfer Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <Input
                  id="arrivalPrice"
                  type="number"
                  min="0"
                  className="pl-7"
                  value={arrivalOnly}
                  onChange={(e) => handlePriceChange("arrival", e.target.value)}
                  disabled={!airportTransfers}
                />
              </div>
            </div>

            {/* Departure Only */}
            <div className="space-y-2">
              <Label htmlFor="departurePrice" className="text-sm">
                Departure Only Transfer Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  £
                </span>
                <Input
                  id="departurePrice"
                  type="number"
                  min="0"
                  className="pl-7"
                  value={departureOnly}
                  onChange={(e) =>
                    handlePriceChange("departure", e.target.value)
                  }
                  disabled={!airportTransfers}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditAirportTransfer;
