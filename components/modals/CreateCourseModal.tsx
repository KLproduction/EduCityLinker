"use client";

import { useMemo, useState } from "react";
import ResponsiveModel from "../globel/responsive-model";
import Modal from "./Modal";
import { useCreateModal } from "@/hooks/modal";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import { createCourseSchema } from "@/schemas";
import { z } from "zod";
import CountrySelect from "../inputs/CountrySelect";
import { setCourseData, useAppDispatch, useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import CourseLevelInput from "../inputs/CourseLevel";
import AgeGroupInput from "../inputs/AgeGroups";
import ImageUpload from "../inputs/ImageUpload";
import { currentUser } from "@/lib/auth";
import { get } from "lodash";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const CreateCourseModal = () => {
  const user = useCurrentUser();
  const courseData = useAppSelector((state) => state.createCourse);
  const { isOpen, setIsOpen } = useCreateModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [disable, setDisable] = useState(false);

  const location = useAppSelector((state) => state.createCourse.location);
  const dispatch = useAppDispatch();
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location],
  );

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
    isDisabled = !courseData.category;
  }

  if (step === STEPS.LOCATION) {
    isDisabled = !courseData.location; // Disable if location is empty
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

  if (step === STEPS.IMAGES) {
    isDisabled = !courseData.imageSrc; // Disable if no image is uploaded
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

      <CategoryInput />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Where is the course located?</h1>
        <p className="text-sm font-medium text-zinc-600">
          Help student find you
        </p>
        <CountrySelect />
        <Map center={location?.latlng} />
      </div>
    );
  }

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
          title="Number of student"
          subtitle="How many students can join?"
          type="maxStudents"
        />

        <Counter
          title="Duration of the course"
          subtitle="How many days of the course?"
          type="durationWeeks"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Images</h1>
        <p className="mb-3 text-sm font-medium text-zinc-600">
          Add a photo to your course
        </p>
        <ImageUpload />
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

  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Create Course"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        onSubmit={onNext}
        disabled={isDisabled}
      />
    </ResponsiveModel>
  );
};
