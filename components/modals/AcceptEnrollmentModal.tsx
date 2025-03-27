"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResponsiveModel from "../global/responsive-model";
import { AlertCircle, Calendar, CheckCircle, MapPin } from "lucide-react";
import type { EnrollmentRequest, Listing, Organization } from "@prisma/client";
import { useAcceptEnrollment } from "@/hooks/enrollment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Props = {
  enrollment: EnrollmentRequest;
  listing: Listing;
  organization: Organization;
  userId: string;
};

const AcceptEnrollmentModal = ({
  enrollment,
  listing,
  organization,
  userId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { acceptEnrollmentMutate, isAcceptingEnrollment } =
    useAcceptEnrollment();

  const depositAmount = Math.floor(enrollment.orderTotalPrice * 0.2);
  const remainingBalance = enrollment.orderTotalPrice - depositAmount;
  const paymentDueDate = new Date(enrollment.startDate);
  paymentDueDate.setDate(paymentDueDate.getDate() - 30);

  return (
    <>
      <Button variant="default" onClick={() => setIsOpen(true)}>
        Accept & Pay Deposit
      </Button>

      {isOpen && (
        <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal
            title="Confirm Enrollment & Pay Deposit"
            actionLabel={`Pay Deposit (£${depositAmount})`}
            secondaryActionLabel="Cancel"
            onSubmit={() => {
              // acceptEnrollmentMutate(enrollment.id);
              setIsOpen(false);
            }}
            secondaryAction={() => setIsOpen(false)}
            disabled={!confirmed || isAcceptingEnrollment}
            body={
              <div className="flex flex-col gap-6">
                {/* Course Details */}
                <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">
                      {listing.title}
                    </h3>
                    <Badge variant="outline" className="bg-primary/10">
                      {enrollment.weeks} weeks
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">{organization.name}</span>
                        <p className="text-muted-foreground">
                          {organization.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Start Date</span>
                        <p className="text-muted-foreground">
                          {new Date(enrollment.startDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-3 font-semibold">Payment Details</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Course Price
                      </span>
                      <span>£{enrollment.orderTotalPrice}</span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-muted-foreground">
                        Deposit (20%)
                      </span>
                      <span className="text-primary">£{depositAmount}</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between">
                      <div>
                        <span className="text-muted-foreground">
                          Remaining Balance
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Due by{" "}
                          {paymentDueDate.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                      <span>£{remainingBalance}</span>
                    </div>
                  </div>
                </div>

                {/* Reminder */}
                <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <p className="font-medium text-primary">
                    Please pay your deposit to secure your place.
                  </p>
                </div>

                {/* Checkbox */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="confirm"
                      checked={confirmed}
                      onCheckedChange={(val) => setConfirmed(!!val)}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="confirm" className="font-medium">
                        I confirm my enrollment and would like to proceed with
                        the deposit.
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-6 text-xs text-green-600">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <p>
                      No worry — you can cancel anytime up to 30 days before the
                      course starts and get a full refund!
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </ResponsiveModel>
      )}
    </>
  );
};

export default AcceptEnrollmentModal;
