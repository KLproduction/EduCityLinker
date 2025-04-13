"use client";

import { useState, useMemo, useEffect } from "react";
import Modal from "./Modal";
import ResponsiveModel from "../global/responsive-model";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  EnrollmentConfirmationState,
  EnrollmentRequest,
  EnrollmentRequestState,
  EnrollmentPayment,
  PaymentState,
} from "@prisma/client";
import {
  useDeleteEnrollment,
  useRequestCancelEnrollment,
} from "@/hooks/enrollment";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "../ui/card";

export enum CANCEL_STEPS {
  REASON = 0,
  CONFIRM = 1,
  SUCCESS = 2,
}

type Props = {
  enrollment: EnrollmentRequest;
  payment?: EnrollmentPayment;
};

const CancelEnrollmentModal = ({ enrollment, payment }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(CANCEL_STEPS.REASON);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reason = selectedReason === "other" ? customReason : selectedReason;

  const { deleteEnrollmentMutate, isDeletingEnrollment } =
    useDeleteEnrollment();
  const { requestCancelEnrollmentMutate, isRequestCancellingEnrollment } =
    useRequestCancelEnrollment();

  const isAlreadyConfirmed =
    enrollment.status === EnrollmentRequestState.CONFIRM_BY_CENTER;

  const isTextAreaNull =
    selectedReason === "other" &&
    customReason.trim() === "" &&
    step === CANCEL_STEPS.REASON;

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);

  const handleCancel = () => {
    if (enrollment.status === EnrollmentRequestState.PENDING) {
      deleteEnrollmentMutate(enrollment.id, {
        onSuccess: () => setStep(CANCEL_STEPS.SUCCESS),
      });
    } else {
      requestCancelEnrollmentMutate(
        { enrollmentId: enrollment.id, reason },
        {
          onSuccess: () => setStep(CANCEL_STEPS.SUCCESS),
        },
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(CANCEL_STEPS.REASON);
    setSelectedReason("");
    setCustomReason("");
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case CANCEL_STEPS.REASON:
        return "Next";
      case CANCEL_STEPS.CONFIRM:
        return isAlreadyConfirmed ? "Request Cancellation" : "Yes, Cancel";
      case CANCEL_STEPS.SUCCESS:
        return "Close";
      default:
        return "Next";
    }
  }, [step, isAlreadyConfirmed]);

  const secondaryActionLabel = useMemo(() => {
    if (step === CANCEL_STEPS.REASON || step === CANCEL_STEPS.SUCCESS)
      return undefined;
    return "Go Back";
  }, [step]);

  let bodyContent;

  if (step === CANCEL_STEPS.REASON) {
    bodyContent = (
      <div className="flex flex-col gap-5 text-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-amber-50 p-3">
            <AlertTriangle className="h-8 w-8 text-rose-500" />
          </div>
          <p className="text-lg font-semibold text-red-600">
            Why are you cancelling your enrollment?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Select a reason:</label>
          <Select onValueChange={setSelectedReason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent className="z-[9999]">
              <SelectItem value="found-better-course">
                Found a better course
              </SelectItem>
              <SelectItem value="schedule-conflict">
                Schedule conflict
              </SelectItem>
              <SelectItem value="financial">Financial reasons</SelectItem>
              <SelectItem value="personal">Personal reasons</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {selectedReason === "other" && (
            <Textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Tell us more..."
              rows={3}
              className="mt-1"
            />
          )}
        </div>
      </div>
    );
  }

  if (step === CANCEL_STEPS.CONFIRM) {
    bodyContent = (
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <div className="rounded-full bg-amber-50 p-4">
          <AlertTriangle className="h-10 w-10 text-amber-500" />
        </div>
        <p className="text-base font-medium text-red-600">
          Are you sure you want to cancel your enrollment?
        </p>
        {payment?.status === PaymentState.FULLY_PAID ? (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            You've paid in full. If you cancel now, the total amount will be
            refunded <strong>minus the non-refundable holding fee</strong>.
          </div>
        ) : (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            You've paid a holding fee. This fee is{" "}
            <strong>non-refundable</strong> if you cancel.
          </div>
        )}
        <p className="text-sm text-gray-600">
          Reason: <em>{reason}</em>
        </p>
      </div>
    );
  }

  if (step === CANCEL_STEPS.SUCCESS) {
    bodyContent = (
      <Card className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="p-5">
          <div className="mx-auto flex items-center justify-center gap-3 rounded-full p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
            <h2 className="text-2xl font-bold">Cancellation Requested</h2>
          </div>
          <div className="space-y-4 text-center">
            <div className="space-y-5 text-muted-foreground">
              <p>Your cancellation request has been successfully submitted.</p>
              <p>
                {`We will process your cancellation shortly and send a
                confirmation email.`}
              </p>
              <p className="text-sm">
                {`If you don’t receive an update within 24 hours, please contact
                us.`}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      {(payment?.status === PaymentState.DEPOSIT_PENDING ||
        payment?.status === PaymentState.DEPOSIT_PAID ||
        payment?.status === PaymentState.FULLY_PAID ||
        enrollment.status === EnrollmentRequestState.CONFIRM_BY_CENTER ||
        enrollment.status === EnrollmentRequestState.PENDING) && (
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Cancel Enrollment
        </Button>
      )}

      {isOpen && (
        <ResponsiveModel isOpen={isOpen} onOpenChange={handleClose}>
          <Modal
            title="Cancel Enrollment"
            actionLabel={actionLabel}
            secondaryActionLabel={
              step !== CANCEL_STEPS.SUCCESS ? secondaryActionLabel : undefined
            }
            secondaryAction={
              step === CANCEL_STEPS.REASON || step === CANCEL_STEPS.SUCCESS
                ? undefined
                : onBack
            }
            onSubmit={
              step === CANCEL_STEPS.CONFIRM
                ? handleCancel
                : step === CANCEL_STEPS.SUCCESS
                  ? handleClose
                  : onNext
            }
            disabled={
              isDeletingEnrollment ||
              isRequestCancellingEnrollment ||
              isTextAreaNull
            }
            body={bodyContent}
          />
        </ResponsiveModel>
      )}
    </>
  );
};

export default CancelEnrollmentModal;
