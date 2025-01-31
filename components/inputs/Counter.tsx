import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setCourseData,
  resetCourseData,
} from "@/redux/slice/create-courseSlice";
import { Button } from "../ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Input } from "../ui/input";

type Props = {
  title: string;
  subtitle: string;
  type: "maxStudents" | "durationWeeks" | "price";
};

const Counter = ({ title, subtitle, type }: Props) => {
  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  console.log(courseData);

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
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <p className="text-sm font-medium text-zinc-600">{subtitle}</p>
      </div>
      <div className="my-4 flex items-center gap-4">
        <Button
          onClick={onReduce}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          <AiOutlineMinus />
        </Button>

        <Input
          type="number"
          value={value}
          onChange={onChange}
          className="w-16 rounded-lg border border-gray-300 bg-zinc-50 p-1 text-center"
          min={1}
        />

        <Button
          onClick={onAdd}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          <AiOutlinePlus />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
