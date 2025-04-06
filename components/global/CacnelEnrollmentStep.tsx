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
} from "@prisma/client";

interface CancelStep {
  id: number;
  title: string;
  pendingTitle?: string;
  description: string;
  isActive: boolean;
}

type Props = {
  enrollmentConfirmation: EnrollmentConfirmation;
};

export const CancelEnrollmentSteps = ({ enrollmentConfirmation }: Props) => {
  const [steps, setSteps] = useState<CancelStep[]>([
    {
      id: 0,
      title: "Cancellation Requested",
      pendingTitle: "",
      description: "You’ve submitted a cancellation request.",
      isActive: true,
    },
    {
      id: 1,
      title: "Refund Processing ",
      pendingTitle: "Awaiting refund processing",
      description:
        "The center is reviewing your cancellation and processing a refund, if applicable.",
      isActive: false,
    },
    {
      id: 2,
      title: "Enrollment Cancelled",
      pendingTitle: "Awaiting final confirmation",
      description: "Your enrollment has been officially cancelled.",
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (!enrollmentConfirmation) return;

    console.log(
      "Enrollment Confirmation Status:",
      enrollmentConfirmation.status,
      "ID",
      enrollmentConfirmation.id,
    );

    const statusToStepMap: Record<EnrollmentConfirmationState, number> = {
      AWAITING_USER: -1,
      DEPOSIT_PENDING: -1,
      DEPOSIT_PAID: -1,
      FULLY_PAID: -1,
      CANCELLATION_REQUESTED: 0,
      CANCELLED: 2,
      CANCELLED_REFUNDED: 2,
      CANCELLATION_PROCESSING: 1,
    };

    const currentStep = statusToStepMap[enrollmentConfirmation.status];

    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        isActive: step.id <= currentStep,
      })),
    );
  }, [enrollmentConfirmation]);

  return (
    <Card className="mx-auto w-full max-w-7xl border-none shadow-none">
      <CardHeader>
        <CardTitle>Cancellation Progress</CardTitle>
        <CardDescription>
          Track the status of your enrollment cancellation
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-4 transition-all",
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
                  <p className="text-sm text-muted-foreground">
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

export default CancelEnrollmentSteps;
