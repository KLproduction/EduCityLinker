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
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import CourseLevelInput from "../inputs/CourseLevel";
import AgeGroupInput from "../inputs/AgeGroups";
import ImageUpload from "../inputs/ImageUpload";
import { currentUser } from "@/lib/auth";
import { get } from "lodash";
import { useCurrentUser } from "@/hooks/use-current-user";

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
 
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Create Course"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        onSubmit={onNext}
      />
    </ResponsiveModel>
  );
};
