"use client";

import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  title?: string;
  subtitle?: string;
  counterType?: string;
  type:
    | "lessonDuration"
    | "studentMinAge"
    | "studentMaxAge"
    | "distanceOfAmenities"
    | "averageStudentPerClass"
    | "averageNumberOfStudent"
    | "accommodationHomeStayPrice"
    | "accommodationStudentResidencePrice"
    | "accommodationPrivateApartmentPrice";
  disabled?: boolean;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditOrganizationCounter = ({
  title,
  subtitle,
  type,
  counterType,
  disabled = false,
  setValue,
  watch,
}: Props) => {
  // Get the current value from the form
  const value = watch(type) ?? 1;

  const onAdd = () => {
    setValue(type, Number(value) + 1, { shouldValidate: true });
  };

  const onReduce = () => {
    if (value <= 1) return;
    setValue(type, Number(value) - 1, { shouldValidate: true });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(type, newValue, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (disabled && type === "distanceOfAmenities") {
      setValue(type, 0, { shouldValidate: true });
    }
  }, [disabled, setValue, type]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full items-start justify-between">
        <div className={"flex flex-col"}>
          {title && <div className="font-medium">{title}</div>}
          {subtitle && (
            <p className="text-sm font-medium text-zinc-600">{subtitle}</p>
          )}
        </div>
      </div>
      <div className={cn("flex flex-1 flex-grow flex-col items-center")}>
        <div className="my-4 flex w-full items-center gap-4">
          <Button
            onClick={onReduce}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            disabled={disabled}
            type="button"
          >
            <AiOutlineMinus />
          </Button>
          <div className="flex w-full items-center justify-center gap-3">
            {(type === "accommodationHomeStayPrice" ||
              type === "accommodationStudentResidencePrice" ||
              type === "accommodationPrivateApartmentPrice") && (
              <p className="text-sm font-semibold">£</p>
            )}
            <Input
              type="number"
              value={value}
              onChange={onChange}
              className={cn(
                "rounded-lg border border-gray-300 bg-zinc-50 p-1 text-center",
                type === "accommodationHomeStayPrice" ||
                  type === "accommodationStudentResidencePrice" ||
                  type === "accommodationPrivateApartmentPrice"
                  ? "w-full"
                  : "w-16",
              )}
              min={0}
              disabled={disabled}
            />
          </div>

          <Button
            onClick={onAdd}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            disabled={disabled}
            type="button"
          >
            <AiOutlinePlus />
          </Button>
        </div>
        <p className="text-sm text-zinc-600">{counterType}</p>
      </div>
      <div className="h-[1px] w-full bg-zinc-700" />
    </div>
  );
};

export default EditOrganizationCounter;
