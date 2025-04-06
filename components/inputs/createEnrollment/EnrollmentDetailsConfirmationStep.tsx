import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AIMO_DISCOUNT } from "@/data/data";
import { formattedPrice } from "@/lib/formatPrice";
import { useAppSelector } from "@/redux/store";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import React from "react";

const EnrollmentDetailsConfirmationStep = () => {
  const enrollmentData = useAppSelector(
    (state) => state.createEnrollmentRequest,
  );
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Confirm Your Details</h2>
        <p className="text-sm text-muted-foreground">
          Please review the information before submitting
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">First Name:</dt>
              <dd className="font-semibold">{enrollmentData.firstName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Sure Name:</dt>
              <dd className="font-semibold">{enrollmentData.sureName}</dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Contact:</dt>
              <dd className="font-semibold">{enrollmentData.contactNumber}</dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Email:</dt>
              <dd className="font-semibold">{enrollmentData.emailAddress}</dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Start Date:</dt>
              <dd className="font-semibold">
                {format(enrollmentData.startDate, "PPP")}
              </dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">Duration:</dt>
              <dd className="font-semibold">{enrollmentData.weeks} weeks</dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">
                Accommodation:
              </dt>
              <dd className="font-semibold">
                {enrollmentData.accommodation ? "Yes" : "No"}
              </dd>
            </div>
            <Separator />

            <div className="flex justify-between">
              <dt className="font-medium text-muted-foreground">
                Airport Transfer:
              </dt>
              <dd className="font-semibold">
                {enrollmentData.airportTransfer ? "Yes" : "No"}
              </dd>
            </div>

            {enrollmentData.airportTransfer && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">
                    Transfer Type:
                  </dt>
                  <dd className="font-semibold">
                    {enrollmentData.airportTransfersType}
                  </dd>
                </div>
              </>
            )}
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">
                  Course Fee:
                </dt>
                <dd className="font-semibold line-through">
                  {formattedPrice(
                    enrollmentData.coursePrice * enrollmentData.weeks,
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">
                  <div className="flex items-center gap-1 text-rose-500">
                    <h4>AIMO</h4>
                    <span>Price:</span>
                  </div>
                </dt>
                <dd className="font-semibold text-rose-500">
                  {formattedPrice(
                    enrollmentData.coursePrice *
                      enrollmentData.weeks *
                      AIMO_DISCOUNT,
                  )}
                </dd>
              </div>
              {enrollmentData.airportTransferPrice > 0 && (
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">
                    Airport Transfer Fee:
                  </dt>
                  <dd className="font-semibold">
                    {formattedPrice(enrollmentData.airportTransferPrice)}
                  </dd>
                </div>
              )}
              {enrollmentData.accommodationPrice > 0 && (
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">
                    Accommodation Fee:
                  </dt>
                  <dd className="font-semibold">
                    {formattedPrice(enrollmentData.accommodationPrice)}
                  </dd>
                </div>
              )}

              <Separator className="my-2" />
              <div className="flex justify-between">
                <dt className="font-medium">Total Price:</dt>
                <dd className="text-lg font-bold text-primary">
                  {formattedPrice(
                    enrollmentData.coursePrice *
                      enrollmentData.weeks *
                      AIMO_DISCOUNT +
                      enrollmentData.accommodationPrice +
                      enrollmentData.airportTransferPrice,
                  )}
                </dd>
              </div>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="mt-6 flex items-start gap-2 rounded-md bg-green-100 p-4 text-zinc-800">
          <InfoIcon className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Note:</span>{" "}
            {`No payment required at
            this stage – just a simple confirmation of your enrollment details
            to secure your spot!`}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentDetailsConfirmationStep;
