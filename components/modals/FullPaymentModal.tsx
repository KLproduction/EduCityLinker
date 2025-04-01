"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResponsiveModel from "../global/responsive-model";
import { Calendar, CheckCircle, MapPin } from "lucide-react";
import type {
  EnrollmentRequest,
  Listing,
  Organization,
  EnrollmentPayment,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { formattedPrice } from "@/lib/formatPrice";

type Props = {
  enrollment: EnrollmentRequest;
  listing: Listing;
  organization: Organization;
  payment: EnrollmentPayment;
};

const FullPaymentModal = ({
  enrollment,
  listing,
  organization,
  payment,
}: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const paymentDueDate = enrollment.startDate
    ? new Date(
        new Date(enrollment.startDate).getTime() - 30 * 24 * 60 * 60 * 1000,
      )
    : null;

  return (
    <>
      <Button variant="default" onClick={() => setIsOpen(true)}>
        Pay Remaining Balance
      </Button>

      {isOpen && (
        <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal
            title="Complete Your Enrollment"
            actionLabel={`Pay ${formattedPrice(payment.remainingBalance)}`}
            secondaryActionLabel="Cancel"
            onSubmit={() => {
              router.push(`/full-payment-checkout/${enrollment.id}`);
              setIsOpen(false);
            }}
            secondaryAction={() => setIsOpen(false)}
            disabled={!payment.depositPaid}
            body={
              <Card className="flex flex-col gap-6 p-3">
                {/* Course Summary */}
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

                {/* Payment Summary */}
                <div className="rounded-lg border border-border bg-card p-4 text-sm">
                  <h3 className="mb-3 font-semibold">Payment Summary</h3>

                  <div className="flex justify-between">
                    <span>{`Total Amount`}</span>
                    <span className="font-medium text-green-600">
                      {formattedPrice(enrollment.orderTotalPrice)}
                    </span>
                  </div>

                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span>{`Total Paid (Deposit)`}</span>
                    <span className="font-medium text-green-600">
                      {formattedPrice(payment.depositAmount)}
                    </span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between">
                    <div>
                      <span>Remaining Balance</span>
                      <p className="text-xs text-muted-foreground">
                        Due by{" "}
                        <strong>
                          {paymentDueDate?.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </strong>
                      </p>
                    </div>
                    <span className="font-medium text-primary">
                      {formattedPrice(payment.remainingBalance)}
                    </span>
                  </div>
                </div>

                {/* Success Info */}
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <p>
                    Your deposit has been received. Complete your payment to
                    finalize enrollment.
                  </p>
                </div>
              </Card>
            }
          />
        </ResponsiveModel>
      )}
    </>
  );
};

export default FullPaymentModal;
