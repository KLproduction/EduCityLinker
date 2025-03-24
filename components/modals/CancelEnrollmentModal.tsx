"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import ResponsiveModel from "../global/responsive-model";
import { AlertTriangle } from "lucide-react";
import { EnrollmentRequest, EnrollmentRequestState } from "@prisma/client";
import { useCancelEnrollment } from "@/hooks/enrollment";
import { Button } from "../ui/button";

type Props = {
  enrollment: EnrollmentRequest;
};

const CancelEnrollmentModal = ({ enrollment }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteEnrollmentMutate, isDeletingEnrollment } =
    useCancelEnrollment();

  const isAlreadyConfirmed =
    enrollment.status === EnrollmentRequestState.CONFIRM_BY_CENTER;

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Cancel Enrollment
      </Button>
      {isOpen && (
        <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal
            title="Confirm Cancellation"
            actionLabel={
              isAlreadyConfirmed
                ? "This Enrollment is Confirmed"
                : "Yes, Cancel"
            }
            secondaryActionLabel="Go Back"
            onSubmit={() => {
              deleteEnrollmentMutate(enrollment.id);
              setIsOpen(false);
            }}
            secondaryAction={() => setIsOpen(false)}
            disabled={isDeletingEnrollment || isAlreadyConfirmed}
            body={
              <div className="flex flex-col items-center justify-center gap-4 text-center text-sm text-zinc-600">
                <AlertTriangle className="h-10 w-10 text-amber-500" />
                {isAlreadyConfirmed ? (
                  <p className="text-red-500">
                    This enrollment has already been confirmed and cannot be
                    cancelled.
                  </p>
                ) : (
                  <p>
                    Are you sure you want to cancel your enrollment? This action
                    cannot be undone.
                  </p>
                )}
              </div>
            }
          />
        </ResponsiveModel>
      )}
    </>
  );
};

export default CancelEnrollmentModal;
