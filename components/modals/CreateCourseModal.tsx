"use client";

import { useMemo, useState } from "react";
import ResponsiveModel from "../globel/responsive-model";
import Modal from "./Modal";
import { useCreateModal } from "@/hooks/modal";
import { categories } from "../Nabar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import { createCourseSchema } from "@/schemas";
import { z } from "zod";
import CountrySelect from "../inputs/CountrySelect";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const CreateCourseModal = () => {
  const { isOpen, setIsOpen } = useCreateModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

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
  }, [step]);

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
