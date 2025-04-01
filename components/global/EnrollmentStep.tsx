"use client";

import { useEffect, useState } from "react";
import { Check, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  EnrollmentConfirmation,
  EnrollmentConfirmationState,
  EnrollmentRequest,
  EnrollmentRequestState,
} from "@prisma/client";

interface EnrollmentStep {
  id: number;
  title: string;
  pendingTitle: string;
  description: string;
  isActive: boolean;
}

type Props = {
  enrollmentConfirmation: EnrollmentConfirmation;
  enrollmentRequest: EnrollmentRequest;
};

export const EnrollmentSteps = ({
  enrollmentConfirmation,
  enrollmentRequest,
}: Props) => {
  const [steps, setSteps] = useState<EnrollmentStep[]>([
    {
      id: 0,
      title: "Enrollment request created",
      pendingTitle: "",
      description: "Your enrollment request has been submitted",
      isActive: true,
    },
    {
      id: 1,
      title: "Confirmed by center",
      pendingTitle: "Awaiting confirmation by center",
      description: "Your request has been reviewed and confirmed by the center",
      isActive: false,
    },
    {
      id: 2,
      title: "Confirmed by student & deposit paid",
      pendingTitle: "Awaiting deposit payment",
      description: "You've confirmed enrollment and paid the initial deposit",
      isActive: false,
    },
    {
      id: 3,
      title: "All payment paid",
      pendingTitle: "Awaiting full payment",
      description: "Everything is set! Just wait for your course to begin",
      isActive: false,
    },
  ]);

  const toggleStep = (id: number) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, isActive: !step.isActive } : step,
      ),
    );
  };

  useEffect(() => {
    if (!enrollmentConfirmation) {
      if (
        enrollmentRequest.status === EnrollmentRequestState.CONFIRM_BY_CENTER
      ) {
        setSteps((prev) =>
          prev.map((step) => ({
            ...step,
            isActive: step.id === 1,
          })),
        );
        return;
      }
      setSteps((prev) =>
        prev.map((step) => ({
          ...step,
          isActive: step.id === 0,
        })),
      );
      return;
    }

    const updatedSteps = steps.map((step) => {
      const { status } = enrollmentConfirmation;

      const statusToStepMap: Record<EnrollmentConfirmationState, number> = {
        AWAITING_USER: 1,
        DEPOSIT_PENDING: 1,
        DEPOSIT_PAID: 2,
        FULLY_PAID: 3,
        CANCELLED: -1,
      };

      const currentStep = statusToStepMap[status];

      return {
        ...step,
        isActive: step.id <= currentStep,
      };
    });

    setSteps(updatedSteps);
  }, [enrollmentConfirmation]);

  return (
    <Card className="mx-auto w-full max-w-7xl border-none shadow-none">
      <CardHeader>
        <CardTitle>Enrollment Progress</CardTitle>
        <CardDescription>
          Track your enrollment status through each step of the process
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex cursor-pointer items-start gap-4 transition-all",
                step.isActive ? "opacity-100" : "opacity-60",
              )}
            >
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    step.isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {step.isActive ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
              </div>
              <div className="space-y-1 pt-1">
                <p
                  className={cn(
                    "font-medium",
                    step.isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.isActive ? step.title : step.pendingTitle || step.title}
                </p>
                {step.isActive && (
                  <p className={"text-sm text-muted-foreground"}>
                    {step.description}
                  </p>
                )}
              </div>
              {!step.isActive && (
                <div className="ml-auto flex-shrink-0 pt-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentSteps;
