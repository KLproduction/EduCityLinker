"use client";

import { useEffect, useMemo, useState } from "react";
import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { useCreateModal, useCreateOrganizerModal } from "@/hooks/modal";

import {
  useAppDispatch,
  useAppSelector,
  setOrganizationData,
} from "@/redux/store";
import Counter from "../inputs/Counter";
import CourseLevelInput from "../inputs/CourseLevel";
import AgeGroupInput from "../inputs/AgeGroups";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import GoogleMapWithAddressInput from "../GoogleMapWithAddressInput";
import LogoUpload from "../inputs/LogoUpload";
import GalleryUpload from "../inputs/GalleryUpload";
import FeatureInput from "../inputs/FeaturesInput";
import { useCreateOrganization } from "@/hooks/create-organization";
import { z } from "zod";
import { createOrganizerSchema } from "@/schemas";
import CoverPhotoUpload from "../inputs/CoverPhotoUpload";
import FacilitiesInput from "../inputs/FacilitiesInput";

export enum STEPS {
  DESCRIPTION = 0,
  LOCATION = 1,
  LOGO = 2,
  COVER_PHOTO = 3,
  GALLERY = 4,
  INFO = 5,
  FACILITY = 6,
  FEATURE = 7,
}

export const CreateOrganizerModal = () => {
  const organizationData = useAppSelector((state) => state.organization);
  const { isOpen, setIsOpen } = useCreateOrganizerModal();
  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const dispatch = useAppDispatch();
  const { createOrganizationMutate, isPending } = useCreateOrganization({
    setStep: setStep,
  });

  const onBack = () => {
    setStep((perv) => perv - 1);
  };
  const onNext = () => {
    setStep((perv) => perv + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.FEATURE) {
      return "Create Organization";
    }
    if (step === STEPS.GALLERY) {
      if (organizationData.gallery?.length === 0) {
        return "Skip";
      }
    }
    return "Next";
  }, [step, organizationData]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let isDisabled = false;

  if (step === STEPS.DESCRIPTION) {
    isDisabled = !organizationData.name || !organizationData.description;
  }

  if (step === STEPS.LOCATION) {
    isDisabled =
      !organizationData.location ||
      !organizationData.lat ||
      !organizationData.lng;
  }
  if (step === STEPS.LOGO) {
    isDisabled = !organizationData.logo;
  }
  if (step === STEPS.COVER_PHOTO) {
    isDisabled = !organizationData.coverPhoto;
  }
  if (step === STEPS.FACILITY) {
    isDisabled = organizationData.facility?.length === 0;
  }
  if (step === STEPS.FEATURE) {
    isDisabled = organizationData.feature?.length === 0;
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold">Course description</h1>
      <p className="mb-3 text-sm font-medium text-zinc-600">
        How would you describe your course?
      </p>
      <Input
        onChange={(e) =>
          dispatch(setOrganizationData({ name: e.target.value }))
        }
        value={organizationData.name}
        className="border-zinc-500 bg-zinc-50"
        placeholder="Center Name"
      />

      <Textarea
        onChange={(e) =>
          dispatch(setOrganizationData({ description: e.target.value }))
        }
        className="border-zinc-500 bg-zinc-50"
        rows={6}
        value={organizationData.description}
        placeholder="Center description"
      />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Where is the center located?</h1>
        <p className="text-sm font-medium text-zinc-600">
          Help student find you
        </p>

        <GoogleMapWithAddressInput />
      </div>
    );
  }

  if (step === STEPS.LOGO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">LOGO</h1>
        <p className="mb-3 text-sm font-medium text-zinc-600">
          Add a Logo for your center
        </p>
        <LogoUpload />
      </div>
    );
  }
  if (step === STEPS.COVER_PHOTO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Images</h1>
        <p className="mb-3 text-sm font-medium text-zinc-600">
          Add a cover photo for your center
        </p>
        <CoverPhotoUpload />
      </div>
    );
  }
  if (step === STEPS.GALLERY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">Gallery</h1>
        <p className="mb-3 text-sm font-medium text-zinc-600">
          {`Add a gallery photos for your center (Up to 10 images)`}
        </p>
        <GalleryUpload />
      </div>
    );
  }
  // TODO: CORRECT INFO
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold">Introduction about your Center</h1>
          <p className="mb-3 text-sm font-medium text-zinc-600">
            Details of the center
          </p>
        </div>
        <div>
          <h1 className="font-bold">Distance from the city center</h1>
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
          counterType="students"
        />

        <Counter
          title="Duration of the course"
          subtitle="How many days of the course?"
          type="durationWeeks"
          counterType="days"
        />
      </div>
    );
  }

  if (step === STEPS.FACILITY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">
          Which facilities are available in your center?
        </h1>
        <p className="text-sm font-medium text-zinc-600">Add facilities</p>

        <FacilitiesInput />
      </div>
    );
  }
  if (step === STEPS.FEATURE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="font-bold">
          Which of these best describes your course?
        </h1>
        <p className="text-sm font-medium text-zinc-600">Add features</p>

        <FeatureInput />
      </div>
    );
  }

  const onSubmit = () => {
    if (step !== STEPS.FEATURE) return onNext();
    return createOrganizationMutate(organizationData);
  };
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Create Organization"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
        body={bodyContent}
        onSubmit={onSubmit}
        disabled={isDisabled || isPending}
      />
    </ResponsiveModel>
  );
};
