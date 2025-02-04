import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCourseData,
  resetCourseData,
} from "@/redux/slice/create-courseSlice";
import { Button } from "../ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  counterType?: string;
  type: "maxStudents" | "durationWeeks" | "price";
};

const Counter = ({ title, subtitle, type, counterType }: Props) => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  const value = useAppSelector((state) => state.createCourse[type]) || 1;

  const onAdd = useCallback(() => {
    dispatch(setCourseData({ [type]: value + 1 }));
  }, [value, dispatch, type]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    dispatch(setCourseData({ [type]: value - 1 }));
  }, [value, dispatch, type]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      dispatch(setCourseData({ [type]: newValue }));
    }
  };

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
          >
            <AiOutlineMinus />
          </Button>
          <div className="flex w-full items-center justify-center gap-3">
            {type === "price" && <p className="text-sm font-semibold">£</p>}
            <Input
              type="number"
              value={value}
              onChange={onChange}
              className={cn(
                "rounded-lg border border-gray-300 bg-zinc-50 p-1 text-center",
                type === "price" ? "w-full" : "w-16",
              )}
              min={1}
            />
          </div>

          <Button
            onClick={onAdd}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
          >
            <AiOutlinePlus />
          </Button>
        </div>
        <p className="text-sm text-zinc-600">{counterType}</p>
      </div>
    </div>
  );
};

export default Counter;
