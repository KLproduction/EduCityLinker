"use client";

import { useState, useMemo } from "react";
import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { useCreateEnrollmentModal } from "@/hooks/modal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Input } from "../ui/input";
import {
  resetEnrollmentRequestData,
  setEnrollmentData,
} from "@/redux/slice/create-enrollmentRequestSlice";
import {
  useCreateEnrollmentRequest,
  useGetListingByEnrollmentModal,
  useGetOrganizationByEnrollmentModal,
} from "@/hooks/enrollment";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { airportTransfers } from "@/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { formattedPrice } from "@/lib/formatPrice";
import EnrollmentPriceSelector from "./EnrollmentPriceSelector";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export enum ENROLLMENT_STEPS {
  USER_DETAILS = 0,
  CONFIRMATION = 1,
  FINAL_MESSAGE = 2,
}

export const CreateEnrollmentModal = () => {
  const enrollmentData = useAppSelector(
    (state) => state.createEnrollmentRequest,
  );
  const { isOpen, setIsOpen, selectedListingId } = useCreateEnrollmentModal();
  const { data: organizationData } = useGetOrganizationByEnrollmentModal();
  const organization = organizationData?.organization;
  const { data: listingData } = useGetListingByEnrollmentModal();
  const listing = listingData?.listing;

  const [step, setStep] = useState(ENROLLMENT_STEPS.USER_DETAILS);
  const dispatch = useAppDispatch();

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === ENROLLMENT_STEPS.FINAL_MESSAGE) {
      return "Close";
    }
    if (step === ENROLLMENT_STEPS.CONFIRMATION) {
      return "Confirm Enrollment";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === ENROLLMENT_STEPS.USER_DETAILS) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let isDisabled = false;

  if (step === ENROLLMENT_STEPS.USER_DETAILS) {
    isDisabled =
      !enrollmentData.firstName ||
      !enrollmentData.sureName ||
      !enrollmentData.contactNumber ||
      !enrollmentData.emailAddress ||
      !enrollmentData.startDate ||
      (enrollmentData.airportTransfer &&
        !enrollmentData.airportTransfersType) ||
      enrollmentData.weeks < 1;
  }

  const { createEnrollmentMutate, isCreatingEnrollment } =
    useCreateEnrollmentRequest(enrollmentData, selectedListingId, setStep);

  const onSubmit = () => {
    if (step === ENROLLMENT_STEPS.USER_DETAILS) return onNext();
    if (step === ENROLLMENT_STEPS.CONFIRMATION) {
      createEnrollmentMutate();
    } else {
      setIsOpen(false);
      dispatch(resetEnrollmentRequestData());
    }
  };

  let bodyContent = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your contact details
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="userName"
            placeholder="Enter your full name"
            value={enrollmentData.firstName}
            onChange={(e) =>
              dispatch(setEnrollmentData({ firstName: e.target.value }))
            }
            className="bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sureName">Sure Name</Label>
          <Input
            id="userName"
            placeholder="Enter your full name"
            value={enrollmentData.sureName}
            onChange={(e) =>
              dispatch(setEnrollmentData({ sureName: e.target.value }))
            }
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            placeholder="Enter your phone number"
            value={enrollmentData.contactNumber}
            onChange={(e) =>
              dispatch(setEnrollmentData({ contactNumber: e.target.value }))
            }
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            placeholder="Enter your email address"
            value={enrollmentData.emailAddress}
            onChange={(e) =>
              dispatch(setEnrollmentData({ emailAddress: e.target.value }))
            }
            className="bg-white"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-lg font-semibold">Program Details</h2>
        <p className="text-sm text-muted-foreground">
          Specify your program preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                id="startDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !enrollmentData.startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {enrollmentData.startDate ? (
                  format(enrollmentData.startDate, "PPP")
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="z-[999999] w-auto p-0">
              <Calendar
                mode="single"
                selected={enrollmentData.startDate}
                onSelect={(date) =>
                  dispatch(setEnrollmentData({ startDate: date ?? new Date() }))
                }
                initialFocus
                className="w-full rounded-md bg-white p-3 shadow-md"
                disabled={(date) => {
                  const isMonday = date.getDay() === 1;
                  const isUpcoming =
                    date > new Date(new Date().setHours(0, 0, 0, 0));
                  return !isMonday || !isUpcoming;
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <EnrollmentPriceSelector basePrice={listing?.price || 0} />
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Accommodation</CardTitle>
          <CardDescription>
            Do you need accommodation during your stay?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="accommodation" className="flex-1">
              Request accommodation
            </Label>
            <Switch
              id="accommodation"
              checked={enrollmentData.accommodation}
              onCheckedChange={(checked) => {
                dispatch(setEnrollmentData({ accommodation: checked }));

                const accommodationPrice =
                  organization?.accommodationHomeStayPrice ??
                  organization?.accommodationStudentResidencePrice ??
                  organization?.accommodationPrivateApartmentPrice ??
                  0;

                dispatch(
                  setEnrollmentData({
                    accommodationPrice: checked
                      ? enrollmentData.accommodationPrice + accommodationPrice
                      : enrollmentData.accommodationPrice - accommodationPrice,
                  }),
                );
              }}
            />
          </div>

          {enrollmentData.accommodation && organization && (
            <div className="mt-4 space-y-2 rounded-md bg-muted p-3">
              <p className="text-sm font-medium">Available options:</p>
              <div className="ml-4 list-disc text-sm">
                {organization.accommodationPrivateApartmentPrice && (
                  <div className="flex gap-8">
                    <p>Private Apartment</p>

                    <p>
                      {formattedPrice(
                        organization.accommodationPrivateApartmentPrice,
                      )}
                    </p>
                  </div>
                )}
                {organization.accommodationStudentResidencePrice && (
                  <div className="flex gap-8">
                    <p>Student Residence</p>

                    <p>
                      {formattedPrice(
                        organization.accommodationStudentResidencePrice,
                      )}
                    </p>
                  </div>
                )}
                {organization.accommodationHomeStayPrice && (
                  <div className="flex gap-8">
                    <p>Home Stay</p>

                    <p>
                      {formattedPrice(organization.accommodationHomeStayPrice)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Airport Transfer</CardTitle>
          <CardDescription>
            Do you need transportation from the airport?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="airportTransfer" className="flex-1">
              Request airport transfer
            </Label>
            <Switch
              id="airportTransfer"
              checked={enrollmentData.airportTransfer}
              onCheckedChange={(checked) => {
                dispatch(setEnrollmentData({ airportTransfer: checked }));
                if (!checked) {
                  dispatch(
                    setEnrollmentData({
                      airportTransfersType: "",
                      airportTransferPrice: 0,
                    }),
                  );
                }
              }}
            />
          </div>

          {enrollmentData.airportTransfer && organization && (
            <div className="mt-4 space-y-4">
              <div className="rounded-md bg-white p-4">
                <RadioGroup
                  value={enrollmentData.airportTransfersType}
                  onValueChange={(value) => {
                    dispatch(
                      setEnrollmentData({ airportTransfersType: value }),
                    );

                    // Calculate the new airport transfer price based on selection
                    let newPrice = 0;
                    if (value === "Arrival and Departure") {
                      newPrice =
                        organization.airportTransferOnArrivalAndDeparturePrice ??
                        0;
                    } else if (value === "Arrival Only") {
                      newPrice =
                        organization.airportTransferArrivalOnlyPrice ?? 0;
                    } else if (value === "Departure Only") {
                      newPrice =
                        organization.airportTransferDepartureOnlyPrice ?? 0;
                    }

                    // Update the addOnPrice with the new transfer price
                    dispatch(
                      setEnrollmentData({
                        airportTransferPrice: newPrice,
                      }),
                    );
                  }}
                >
                  {organization.airportTransferOnArrivalAndDeparturePrice && (
                    <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Arrival and Departure"
                          id="arrivalAndDeparture"
                        />
                        <Label htmlFor="arrivalAndDeparture">
                          Arrival & Departure Transfer
                        </Label>
                      </div>
                      <span className="font-medium">
                        {formattedPrice(
                          organization.airportTransferOnArrivalAndDeparturePrice,
                        )}
                      </span>
                    </div>
                  )}

                  {organization.airportTransferArrivalOnlyPrice && (
                    <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Arrival Only" id="arrivalOnly" />
                        <Label htmlFor="arrivalOnly">Arrival Only</Label>
                      </div>
                      <span className="font-medium">
                        {formattedPrice(
                          organization.airportTransferArrivalOnlyPrice,
                        )}
                      </span>
                    </div>
                  )}

                  {organization.airportTransferDepartureOnlyPrice && (
                    <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Departure Only"
                          id="departureOnly"
                        />
                        <Label htmlFor="departureOnly">Departure Only</Label>
                      </div>
                      <span className="font-medium">
                        {formattedPrice(
                          organization.airportTransferDepartureOnlyPrice,
                        )}
                      </span>
                    </div>
                  )}
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (step === ENROLLMENT_STEPS.CONFIRMATION) {
    bodyContent = (
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium text-muted-foreground">
                    Course Fee:
                  </dt>
                  <dd className="font-semibold">
                    {formattedPrice(enrollmentData.totalPrice)}
                  </dd>
                </div>
                {enrollmentData.accommodationPrice ||
                  (enrollmentData.airportTransferPrice > 0 && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Add-ons:
                      </dt>
                      <dd className="font-semibold">
                        {formattedPrice(
                          enrollmentData.accommodationPrice +
                            enrollmentData.airportTransferPrice,
                        )}
                      </dd>
                    </div>
                  ))}
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <dt className="font-medium">Total Price:</dt>
                  <dd className="text-lg font-bold text-primary">
                    {formattedPrice(
                      enrollmentData.totalPrice +
                        enrollmentData.accommodationPrice +
                        enrollmentData.airportTransferPrice,
                    )}
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === ENROLLMENT_STEPS.FINAL_MESSAGE) {
    bodyContent = (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">{`You're All Set!`}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>Your enrollment request has been successfully submitted.</p>
            <p>
              We'll be in touch soon to confirm availability and next steps.
            </p>
            <p className="text-sm">
              {`If you don’t receive an email within 24 hours, please check your spam folder or contact us for assistance.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal
        title="Enrollment Request"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={
          step === ENROLLMENT_STEPS.USER_DETAILS ? undefined : onBack
        }
        body={bodyContent}
        onSubmit={onSubmit}
        disabled={isDisabled || isCreatingEnrollment}
      />
    </ResponsiveModel>
  );
};
