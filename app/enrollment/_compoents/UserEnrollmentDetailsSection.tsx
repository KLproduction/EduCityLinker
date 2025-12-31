"use client";

import CancelEnrollmentSteps from "@/components/global/CacnelEnrollmentStep";
import EnrollmentSteps from "@/components/global/EnrollmentStep";
import ListingSection from "@/components/listing/ListingSection";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { brandName } from "@/data/data";
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import {
  EnrollmentConfirmation,
  EnrollmentConfirmationState,
  EnrollmentPayment,
  EnrollmentRequest,
  EnrollmentRequestState,
  Listing,
  Organization,
} from "@prisma/client";
import { format } from "date-fns";
import { Check, InfoIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  enrollmentData: EnrollmentRequest;
  organization: Organization;
  listing: Listing;
  userId: string;
  isCheckOut?: boolean;
  enrollmentConfirmation: EnrollmentConfirmation;
  payment?: EnrollmentPayment;
};

const UserEnrollmentDetailsSection = ({
  enrollmentData,
  organization,
  listing,
  userId,
  isCheckOut = false,
  enrollmentConfirmation,
  payment,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isEnrollmentPage = pathname.includes("/enrollment");

  if (enrollmentData.status === "CANCELLED") return;

  return (
    <Card className="mx-auto w-full max-w-[280px] px-2 sm:max-w-7xl sm:px-4">
      <div className="mx-auto flex w-full flex-col gap-6 py-8">
        {/* Organizer Header */}

        <Card
          key={organization?.id}
          className={cn(
            "overflow-hidden p-4 lg:min-w-[1000px]",
            isEnrollmentPage && "border-none shadow-none",
          )}
        >
          <CardHeader className="flex items-start justify-start">
            <CardDescription className="flex flex-col items-start gap-3">
              <p>Enrollment ID:</p>
              <p>{enrollmentData.id}</p>
            </CardDescription>
          </CardHeader>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* Cover Photo (Responsive) */}
            {organization?.coverPhoto && (
              <div className="relative h-40 w-full overflow-hidden rounded-md sm:h-48 sm:w-1/3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organization?.coverPhoto}/-/preview/600x400/`}
                  alt={organization?.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition duration-300 group-hover:scale-110"
                />
              </div>
            )}

            <div className="flex w-full flex-col sm:w-2/3">
              <CardTitle className="flex items-center gap-10 text-lg sm:text-xl">
                <div>{organization?.name}</div>
                <div>
                  <StarRating rating={organization?.rating!} readOnly />
                </div>
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1" />
                {organization?.location}
              </div>
              <Separator className="my-2" />
              {/* Features List */}
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                {organization?.feature.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="mr-1 text-green-500" />
                    <p className="text-xs">{feature}</p>
                  </div>
                ))}
                {organization?.feature.length! > 4 && (
                  <span className="text-gray-500">and more...</span>
                )}
              </div>
            </div>

            {/* Button (Stacks on small screens) */}
            <div className="flex w-full justify-end sm:h-full sm:w-auto sm:items-center">
              <Link
                href={`/listing/${organization?.id}`}
                onClick={() => router.push(`/listing/${organization?.id}`)}
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  View School
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Enrollment Details */}
      <div className="mx-auto w-full space-y-6 md:max-w-7xl">
        <Card className={cn("border-none shadow-none")}>
          <CardHeader>
            <CardDescription>Enrollment Details</CardDescription>
          </CardHeader>
          <div>{listing && <ListingSection listing={listing} />}</div>
          <CardContent className="pt-6">
            <dl className="space-y-4 text-xs sm:text-base">
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">
                  First Name:
                </dt>
                <dd className="font-semibold">{enrollmentData.firstName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">
                  Sure Name:
                </dt>
                <dd className="font-semibold">{enrollmentData.sureName}</dd>
              </div>
              <Separator />

              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Contact:</dt>
                <dd className="font-semibold">
                  {enrollmentData.contactNumber}
                </dd>
              </div>
              <Separator />

              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">Email:</dt>
                <dd className="font-semibold">{enrollmentData.emailAddress}</dd>
              </div>
              <Separator />

              <div className="flex justify-between">
                <dt className="font-medium text-muted-foreground">
                  Start Date:
                </dt>
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
                  <dd className="font-semibold">
                    {formattedPrice(
                      enrollmentData.courseTotalPriceBeforeDiscount,
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
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total Price:</span>
                    <span className="font-bold text-zinc-800">
                      {formattedPrice(
                        enrollmentData.courseTotalPriceBeforeDiscount +
                          enrollmentData.addOnPrice,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-1 sm:flex-row sm:items-center">
                    <div className="flex w-full items-center gap-2 text-rose-500">
                      <h4 className="">{brandName}</h4>
                      <span className="">Price:</span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {formattedPrice(enrollmentData.orderTotalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </dl>
          </CardContent>
          <Separator className="my-4" />

          <CardFooter>
            {enrollmentConfirmation?.status ===
              EnrollmentConfirmationState.CANCELLATION_REQUESTED ||
            enrollmentConfirmation?.status ===
              EnrollmentConfirmationState.CANCELLATION_PROCESSING ||
            enrollmentConfirmation?.status ===
              EnrollmentConfirmationState.CANCELLED_REFUNDED ? (
              <CancelEnrollmentSteps
                enrollmentConfirmation={enrollmentConfirmation}
                payment={payment}
              />
            ) : (
              <EnrollmentSteps
                enrollmentConfirmation={enrollmentConfirmation}
                enrollmentRequest={enrollmentData}
              />
            )}
          </CardFooter>
        </Card>
      </div>
    </Card>
  );
};

export default UserEnrollmentDetailsSection;
