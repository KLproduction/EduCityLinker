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
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import {
  EnrollmentConfirmation,
  EnrollmentConfirmationState,
  EnrollmentRequest,
  EnrollmentRequestState,
  Listing,
  Organization,
} from "@prisma/client";
import { format } from "date-fns";
import {
  Check,
  ChevronDown,
  ChevronRight,
  InfoIcon,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  enrollmentData: EnrollmentRequest;
  organization: Organization;
  listing: Listing;
  userId: string;
  isCheckOut?: boolean;
  enrollmentConfirmation: EnrollmentConfirmation;
};

const DashboardUserEnrollmentDetailsSection = ({
  enrollmentData,
  organization,
  listing,
  userId,
  isCheckOut = false,
  enrollmentConfirmation,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isEnrollmentPage = pathname.includes("/enrollment");
  const [isOpen, setIsOpen] = useState(false);

  if (enrollmentData.status === "CANCELLED") return null;

  return (
    <>
      <div className="w-full">
        <Card className="mb-4 border-none shadow-none lg:min-w-[1000px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Enrollment ID: {enrollmentData.id}
              </CardTitle>
              <CardDescription>
                {format(enrollmentData.startDate, "PPP")} ·{" "}
                {enrollmentData.weeks} weeks
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronRight className="mr-1 h-4 w-4" />
                  Show Details
                </>
              )}
            </Button>
          </CardHeader>

          {isOpen && (
            <CardContent className="pt-0">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
                {/* Organizer Header */}

                <Card
                  key={organization?.id}
                  className={cn(
                    "overflow-hidden border-none p-4 shadow-none lg:min-w-[1000px]",
                    isEnrollmentPage && "border-none shadow-none",
                  )}
                >
                  <CardHeader className="flex items-start justify-start">
                    <CardDescription className="flex items-center gap-3">
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
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        {organization?.location}
                      </div>
                    </div>

                    {/* Button (Stacks on small screens) */}
                    <div className="flex w-full justify-end sm:h-full sm:w-auto sm:items-center">
                      <Link
                        href={`/dashboard/enrollment/${enrollmentData?.id}`}
                      >
                        <Button variant="outline" className="w-full sm:w-auto">
                          View Enrollment Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Enrollment Details */}
              <div className="space-y-6">
                <Card className={cn("border-none shadow-none")}>
                  <CardHeader>
                    <CardDescription>Enrollment Details</CardDescription>
                    <div>{listing && <ListingSection listing={listing} />}</div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="font-medium text-muted-foreground">
                          First Name:
                        </dt>
                        <dd className="font-semibold">
                          {enrollmentData.firstName}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-muted-foreground">
                          Sure Name:
                        </dt>
                        <dd className="font-semibold">
                          {enrollmentData.sureName}
                        </dd>
                      </div>
                      <Separator />

                      <div className="flex justify-between">
                        <dt className="font-medium text-muted-foreground">
                          Contact:
                        </dt>
                        <dd className="font-semibold">
                          {enrollmentData.contactNumber}
                        </dd>
                      </div>
                      <Separator />

                      <div className="flex justify-between">
                        <dt className="font-medium text-muted-foreground">
                          Email:
                        </dt>
                        <dd className="font-semibold">
                          {enrollmentData.emailAddress}
                        </dd>
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
                        <dt className="font-medium text-muted-foreground">
                          Duration:
                        </dt>
                        <dd className="font-semibold">
                          {enrollmentData.weeks} weeks
                        </dd>
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
                              {formattedPrice(
                                enrollmentData.airportTransferPrice,
                              )}
                            </dd>
                          </div>
                        )}
                        {enrollmentData.accommodationPrice > 0 && (
                          <div className="flex justify-between">
                            <dt className="font-medium text-muted-foreground">
                              Accommodation Fee:
                            </dt>
                            <dd className="font-semibold">
                              {formattedPrice(
                                enrollmentData.accommodationPrice,
                              )}
                            </dd>
                          </div>
                        )}

                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <div className="font-medium">Total Price:</div>
                          <div className="flex flex-col justify-end gap-2 text-lg font-bold text-primary">
                            <div className="flex w-full items-center justify-end text-zinc-800">
                              {formattedPrice(
                                enrollmentData.courseTotalPriceBeforeDiscount +
                                  enrollmentData.addOnPrice,
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <h4>AIMO</h4>
                                <span>Price:</span>
                              </div>
                              <span>
                                {formattedPrice(enrollmentData.orderTotalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </dl>
                  </CardContent>
                  <Separator className="my-4" />
                </Card>
              </div>
            </CardContent>
          )}

          {isOpen && (
            <CardFooter>
              {enrollmentConfirmation?.status ===
                EnrollmentConfirmationState.CANCELLATION_REQUESTED ||
              enrollmentConfirmation?.status ===
                EnrollmentConfirmationState.CANCELLATION_PROCESSING ||
              enrollmentConfirmation?.status ===
                EnrollmentConfirmationState.CANCELLED_REFUNDED ? (
                <CancelEnrollmentSteps
                  enrollmentConfirmation={enrollmentConfirmation}
                />
              ) : (
                <EnrollmentSteps
                  enrollmentConfirmation={enrollmentConfirmation}
                  enrollmentRequest={enrollmentData}
                />
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
};

export default DashboardUserEnrollmentDetailsSection;
