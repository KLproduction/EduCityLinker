"use client";

import { useCallback, useEffect } from "react";
import {
  setOrganizationData,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";

import { Button } from "../ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  counterType?: string;
  type?: "maxStudents" | "durationWeeks" | "price" | "distanceOfAmenities";
  disabled?: boolean;
};

const CreateOrganizationCounter = ({
  title,
  subtitle,
  type,
  counterType,
  disabled = false,
}: Props) => {
  const organizationData = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  const value =
    useAppSelector(
      (state) => state.organization[type as keyof typeof organizationData],
    ) || 1;

  const onAdd = useCallback(() => {
    dispatch(setOrganizationData({ [type!]: (value as number) + 1 }));
  }, [value, dispatch, type]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    dispatch(setOrganizationData({ [type!]: (value as number) - 1 }));
  }, [value, dispatch, type]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      dispatch(setOrganizationData({ [type!]: newValue }));
    }
  };

  useEffect(() => {
    if (disabled) {
      if (type === "distanceOfAmenities") {
        dispatch(setOrganizationData({ [type!]: 0 }));
      }
    }
  }, [disabled, dispatch]);

  return (
    <div className="flex w-full items-center justify-between gap-10">
      <div className={"flex flex-col"}>
        {title && <div className="font-medium">{title}</div>}
        {subtitle && (
          <p className="text-sm font-medium text-zinc-600">{subtitle}</p>
        )}
      </div>
      <div className={cn("flex w-full flex-1 flex-grow flex-col items-center")}>
        <div className="my-4 flex w-full items-center gap-4">
          <Button
            onClick={onReduce}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            disabled={disabled}
          >
            <AiOutlineMinus />
          </Button>
          <div className="flex w-full items-center justify-center gap-3">
            {type === "price" && <p className="text-sm font-semibold">£</p>}
            <Input
              type="number"
              value={organizationData.distanceOfAmenities}
              onChange={onChange}
              className={cn(
                "rounded-lg border border-gray-300 bg-zinc-50 p-1 text-center",
                type === "price" ? "w-full" : "w-16",
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
          >
            <AiOutlinePlus />
          </Button>
        </div>
        <p className="text-sm text-zinc-600">{counterType}</p>
      </div>
    </div>
  );
};

export default CreateOrganizationCounter;
