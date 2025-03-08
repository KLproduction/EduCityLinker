"use client";

import {
  getListingByIdAction,
  getOrganizationByListingIdAction,
} from "@/actions/listing";
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
import {
  useGetListingById,
  useGetOrganizationByListingId,
} from "@/hooks/listing";
import { formattedPrice } from "@/lib/formatPrice";
import { EnrollmentRequest, Listing, Organization } from "@prisma/client";
import { format } from "date-fns";
import { Check, InfoIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

type Props = {
  enrollmentData: EnrollmentRequest;
  organization: Organization;
  listing: Listing;
};

const UserEnrollmentDetailsSection = ({
  enrollmentData,
  organization,
  listing,
}: Props) => {
  const router = useRouter();

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
        {/* Organizer Header */}

        <Card
          key={organization?.id}
          className="overflow-hidden p-4 lg:min-w-[1000px]"
        >
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
      <div className="space-y-6">
        <Card>
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
                    {formattedPrice(enrollmentData.totalPrice)}
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
                      enrollmentData.totalPrice * 0.9 +
                        enrollmentData.accommodationPrice +
                        enrollmentData.airportTransferPrice,
                    )}
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col justify-end gap-3 md:flex-row">
              <Button
                disabled={enrollmentData.status !== "CONFIRM_BY_CENTER"}
                className="bg-green-500"
              >
                {enrollmentData.status === "CONFIRM_BY_CENTER"
                  ? " Accept Enrollment"
                  : "Waiting For Confirmation"}
              </Button>
              <Button variant="outline">Cancel Enrollment</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default UserEnrollmentDetailsSection;
