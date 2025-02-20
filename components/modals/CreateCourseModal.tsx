"use client";

import { useMemo, useState } from "react";
import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { useCreateCourseModal } from "@/hooks/modal";

import { setCourseData, useAppDispatch, useAppSelector } from "@/redux/store";
import Counter from "../inputs/Counter";
import CourseLevelInput from "../inputs/CourseLevel";
import AgeGroupInput from "../inputs/AgeGroups";
import { currentUser } from "@/lib/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import GoogleMapWithAddressInput from "../GoogleMapWithAddressInput";
import { useCreateCourse } from "@/hooks/create-course";
import CourseTypeInput from "../inputs/CourseTypeInput";

export enum STEPS {
  CATEGORY = 0,
  INFO = 1,
  DESCRIPTION = 2,
  PRICE = 3,
}

export const CreateCourseModal = () => {
  const user = useCurrentUser();
  const courseData = useAppSelector((state) => state.createCourse);
  const { isOpen, setIsOpen } = useCreateCourseModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const dispatch = useAppDispatch();

  const onBack = () => {
    setStep((perv) => perv - 1);
  };
  const onNext = () => {
    setStep((perv) => perv + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create Course";
    }
    return "Next";
  }, [step, courseData]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let isDisabled = false;

  if (step === STEPS.CATEGORY) {
    isDisabled = !courseData.courseType;
  }

  if (step === STEPS.INFO) {
    isDisabled =
      !courseData.courseLevels ||
      !courseData.ageGroups ||
      !courseData.maxStudents ||
      courseData.maxStudents < 1 ||
      !courseData.durationWeeks ||
      courseData.durationWeeks < 1;
  }

  if (step === STEPS.DESCRIPTION) {
    isDisabled =
      !courseData.title ||
      !courseData.description ||
      courseData.description.length < 1;
  }

  if (step === STEPS.PRICE) {
    isDisabled = !courseData.price || courseData.price < 1;
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold">Which of these best describes your course?</h1>
      <p className="text-sm font-medium text-zinc-600">Pick a category</p>

      <CourseTypeInput />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold">Information about your course</h1>
          <p className="mb-3 text-sm font-medium text-zinc-600">
            Details for your course
          </p>
        </div>
        <div>
          <h1 className="font-bold">Age Groups</h1>
          <p className="mb-3 text-sm font-medium text-zinc-600">
            What age group is the course targeting?
          </p>
          <AgeGroupInput />
        </div>
        <div>
          <h1 className="font-bold">Course Levels</h1>
          <p className="mb-3 text-sm font-medium text-zinc-600">
            What level is the course?
          </p>
          <CourseLevelInput />
        </div>
        <Counter
          title="Max students per class"
          subtitle="How many students can join?"
          type="maxStudents"
          counterType="students"
        />

        <Counter
          title="Duration of the course"
          subtitle="How many days of the course?"
          type="durationWeeks"
          counterType="Weeks"
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Course description</h1>
        <p className="mb-3 text-sm font-medium text-zinc-600">
          How would you describe your course?
        </p>
        <Input
          onChange={(e) => dispatch(setCourseData({ title: e.target.value }))}
          value={courseData.title}
          className="border-zinc-500 bg-zinc-50"
          placeholder="Course Name"
        />

        <Textarea
          onChange={(e) =>
            dispatch(setCourseData({ description: e.target.value }))
          }
          className="border-zinc-500 bg-zinc-50"
          rows={6}
          value={courseData.description}
          placeholder="Course description"
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold">Course Pricing</h1>
          <p className="mb-3 text-sm font-medium text-zinc-600">
            How much do you charge for your course?
          </p>
        </div>

        <Counter type="price" />
      </div>
    );
  }
  const { createCourseMutate, isCreatingCourse } = useCreateCourse(
    courseData,
    setStep,
  );
  const onSubmit = () => {
    if (step !== STEPS.PRICE) return onNext();
    createCourseMutate();
  };

  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Create Course"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        onSubmit={onSubmit}
        disabled={isDisabled || isCreatingCourse}
      />
    </ResponsiveModel>
  );
};
