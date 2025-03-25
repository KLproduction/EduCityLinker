"use client";

import { useState, useMemo, useEffect } from "react";
import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { useCreateEnrollmentModal } from "@/hooks/modal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  resetEnrollmentRequestData,
  setEnrollmentData,
} from "@/redux/slice/create-enrollmentRequestSlice";
import {
  useCreateEnrollmentRequest,
  useGetListingByEnrollmentModal,
  useGetOrganizationByEnrollmentModal,
} from "@/hooks/enrollment";
import { Card } from "../ui/card";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MyLoader from "@/loader/MyLoader";
import { EnrollmentDetailsInput } from "../inputs/createEnrollment/EnrollmentDetailsInput";
import { z } from "zod";
import EnrollmentDetailsConfirmationStep from "../inputs/createEnrollment/EnrollmentDetailsConfirmationStep";

export enum ENROLLMENT_STEPS {
  USER_DETAILS = 0,
  CONFIRMATION = 1,
  FINAL_MESSAGE = 2,
}

export const CreateEnrollmentModal = () => {
  const params = useSearchParams();
  const listingId = params.get("enrollment-listing-id");
  const organizationId = params.get("enrollment-organization-id");

  const enrollmentData = useAppSelector(
    (state) => state.createEnrollmentRequest,
  );
  const { isOpen, setIsOpen, selectedListingId } = useCreateEnrollmentModal();
  const { data: organizationData, isPending: isGettingOrganization } =
    useGetOrganizationByEnrollmentModal(organizationId!);
  const organization = organizationData?.organization;
  const { data: listingData, isPending: isGettingListing } =
    useGetListingByEnrollmentModal(listingId!);
  const listing = listingData?.listing;

  const isPending = isGettingOrganization || isGettingListing;

  const dispatch = useAppDispatch();
  const [step, setStep] = useState(ENROLLMENT_STEPS.USER_DETAILS);
  const [emailError, setEmailError] = useState(false);
  const emailSchema = z.string().email("Invalid email format");
  const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  useEffect(() => {
    if (enrollmentData.emailAddress) {
      validateEmail(enrollmentData.emailAddress);
    }
  }, [enrollmentData]);

  useEffect(() => {
    if (listing?.price) {
      dispatch(
        setEnrollmentData({
          totalPrice: listing?.price * enrollmentData.weeks,
        }),
      );
    }
  }, [listing]);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === ENROLLMENT_STEPS.FINAL_MESSAGE) {
      return "Close";
    }
    if (step === ENROLLMENT_STEPS.CONFIRMATION) {
      return "Submit Enrollment";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (
      step === ENROLLMENT_STEPS.USER_DETAILS ||
      step === ENROLLMENT_STEPS.FINAL_MESSAGE
    ) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let isDisabled = false;
  let bodyContent;

  const { createEnrollmentMutate, isCreatingEnrollment } =
    useCreateEnrollmentRequest(enrollmentData, selectedListingId, setStep);

  const onSubmit = () => {
    if (step === ENROLLMENT_STEPS.USER_DETAILS) return onNext();
    if (step === ENROLLMENT_STEPS.CONFIRMATION) {
      createEnrollmentMutate();
    } else {
      setIsOpen(false);
      setStep(ENROLLMENT_STEPS.USER_DETAILS);
      dispatch(resetEnrollmentRequestData());
    }
  };

  if (isPending) {
    bodyContent = <MyLoader />;
  }

  if (step === ENROLLMENT_STEPS.USER_DETAILS) {
    bodyContent = (
      <EnrollmentDetailsInput listing={listing!} organization={organization!} />
    );
  }

  if (step === ENROLLMENT_STEPS.CONFIRMATION) {
    bodyContent = <EnrollmentDetailsConfirmationStep />;
  }

  if (step === ENROLLMENT_STEPS.FINAL_MESSAGE) {
    bodyContent = (
      <Card className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="p-5">
          <div className="mx-auto flex items-center justify-center gap-3 rounded-full p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-bold">{`You're All Set!`}</h2>
          </div>
          <div className="space-y-4 text-center">
            <div className="space-y-5 text-muted-foreground">
              <p>Your enrollment request has been successfully submitted.</p>
              <p>
                We'll be in touch soon to confirm availability and next steps.
              </p>
              <p className="text-sm">
                {`If you don’t receive an email within 24 hours, please check your spam folder or contact us for assistance.`}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (step === ENROLLMENT_STEPS.USER_DETAILS) {
    const isAccommodationSelected =
      enrollmentData.airportTransfer && !enrollmentData.airportTransfersType;
    const isValidPhoneNumber = (phone: string): boolean => {
      return /^\d+$/.test(phone.trim());
    };
    isDisabled =
      !enrollmentData.firstName ||
      !enrollmentData.sureName ||
      !enrollmentData.contactNumber ||
      !enrollmentData.emailAddress ||
      emailError ||
      !enrollmentData.startDate ||
      enrollmentData.startDate <= new Date() ||
      enrollmentData.weeks < 1 ||
      isAccommodationSelected ||
      !isValidPhoneNumber(enrollmentData.contactNumber);
  }

  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Enrollment Request"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={
          step === ENROLLMENT_STEPS.USER_DETAILS ||
          step === ENROLLMENT_STEPS.FINAL_MESSAGE
            ? undefined
            : onBack
        }
        body={bodyContent}
        onSubmit={onSubmit}
        disabled={isDisabled || isCreatingEnrollment}
      />
    </ResponsiveModel>
  );
};
