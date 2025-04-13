"use client";

import { useEditEnrollment, useRefundConfirmAction } from "@/hooks/enrollment";
import {
  EnrollmentConfirmation,
  EnrollmentPayment,
  type EnrollmentRequest,
  EnrollmentRequestState,
  type Organization,
  PaymentState,
} from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formattedPrice } from "@/lib/formatPrice";
import { useState, useEffect } from "react";
import { AIMO_DISCOUNT } from "@/data/data";

type Props = {
  enrollment: EnrollmentRequest;
  organization: Organization;
  confirmation: EnrollmentConfirmation;
  payment: EnrollmentPayment;
  cancellationId: string;
};

const CancelEnrollmentForm = ({
  enrollment,
  organization,
  confirmation,
  payment,
  cancellationId,
}: Props) => {
  const isEditableAllowed =
    enrollment.status === EnrollmentRequestState.PENDING ||
    enrollment.status === EnrollmentRequestState.CONFIRM_BY_CENTER;

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (!isEditableAllowed) {
      setIsEditable(false);
    }
  }, [isEditableAllowed]);

  const {
    register,
    errors,
    onSubmit,
    isSubmitting,
    isUpdatingEnrollment,
    watch,
    setValue,
    resetForm,
    getValues,
  } = useEditEnrollment({
    enrollment: enrollment,
    setIsEditable: setIsEditable,
  });

  const isInvalidDate = watch("startDate") <= new Date();

  const { confirmRefundMutate, isConfirmingRefund } = useRefundConfirmAction();
  const isCancelled =
    payment.status === PaymentState.CANCELLED ||
    payment.status === PaymentState.CANCELLATION_PROCESSING;

  return (
    <Card className="my-6 flex w-full justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-xl space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              disabled={!isEditable}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Surname */}
          <div className="space-y-2">
            <Label htmlFor="sureName">Surname</Label>
            <Input
              id="sureName"
              {...register("sureName")}
              disabled={!isEditable}
            />
            {errors.sureName && (
              <p className="text-sm text-destructive">
                {errors.sureName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              {...register("contactNumber")}
              disabled={!isEditable}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              type="email"
              {...register("emailAddress")}
              disabled={!isEditable}
            />
            {errors.emailAddress && (
              <p className="text-sm text-destructive">
                {errors.emailAddress.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("startDate") && "text-muted-foreground",
                  )}
                  disabled={!isEditable}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("startDate") ? (
                    format(watch("startDate"), "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="z-[999999] w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("startDate")}
                  onSelect={(date) => setValue("startDate", date ?? new Date())}
                  initialFocus
                  className="w-full rounded-md bg-white p-3 shadow-md"
                  disabled={(date) => {
                    const isMonday = date.getDay() === 1;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const sevenDaysFromNow = new Date(today);
                    sevenDaysFromNow.setDate(today.getDate() + 7);

                    const isWithinNextSevenDays =
                      date >= today && date < sevenDaysFromNow;

                    return !isMonday || isWithinNextSevenDays || date < today;
                  }}
                />
              </DialogContent>
            </Dialog>

            {isInvalidDate && isEditable && (
              <p className="text-sm text-destructive">
                Start date must be after today.
              </p>
            )}
          </div>

          {/* Weeks */}
          <div className="space-y-2">
            <Label htmlFor="weeks">Weeks</Label>
            <Input
              id="weeks"
              type="number"
              min="1"
              {...register("weeks", { valueAsNumber: true })}
              disabled={!isEditable}
            />
            {errors.weeks && (
              <p className="text-sm text-destructive">{errors.weeks.message}</p>
            )}
          </div>
        </div>

        {/* Airport Transfer */}
        <Card>
          <CardHeader>
            <CardTitle>Airport Transfer</CardTitle>
            <CardDescription>
              Select your airport transfer options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="airportTransfer" className="flex-1">
                Request airport transfer
              </Label>
              <Switch
                disabled={!isEditable}
                id="airportTransfer"
                checked={watch("airportTransfer")}
                onCheckedChange={(checked) => {
                  setValue("airportTransfer", checked);
                  if (!checked) {
                    setValue("airportTransfersType", "");
                    setValue("airportTransferPrice", 0);
                  }
                }}
              />
            </div>

            <div className="mt-4 space-y-4">
              <div
                className={cn(
                  "rounded-md bg-white p-4",
                  !watch("airportTransfer") && "opacity-50",
                )}
              >
                <RadioGroup
                  disabled={!watch("airportTransfer") || !isEditable}
                  value={watch("airportTransfersType")}
                  onValueChange={(value) => {
                    setValue("airportTransfersType", value);

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

                    setValue("airportTransferPrice", newPrice);
                  }}
                >
                  {organization.airportTransferOnArrivalAndDeparturePrice && (
                    <div className="mb-2 flex items-center justify-between space-x-2 rounded-md border p-3">
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
                    <div className="mb-2 flex items-center justify-between space-x-2 rounded-md border p-3">
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
          </CardContent>
        </Card>

        {/* Accommodation */}
        {organization?.accommodationTypes === "No Accommodation" ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-zinc-500">
                No Accommodation Provided
              </CardTitle>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Accommodation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="accommodation" className="flex-1">
                  Request accommodation
                </Label>
                <Switch
                  disabled={!isEditable}
                  id="accommodation"
                  checked={watch("accommodation")}
                  onCheckedChange={(checked) => {
                    setValue("accommodation", checked);

                    const accommodationPrice =
                      organization?.accommodationHomeStayPrice ??
                      organization?.accommodationStudentResidencePrice ??
                      organization?.accommodationPrivateApartmentPrice ??
                      0;

                    setValue(
                      "accommodationPrice",
                      checked ? accommodationPrice : 0,
                    );
                  }}
                />
              </div>

              {organization && (
                <div
                  className={cn(
                    "mt-4 space-y-2 rounded-md bg-muted p-3",
                    !watch("accommodation") && "opacity-50",
                  )}
                >
                  <p className="text-sm font-medium">Available options:</p>
                  <div className="mt-2 space-y-2">
                    {organization.accommodationPrivateApartmentPrice! > 0 && (
                      <div className="flex justify-between rounded-md border bg-background p-2">
                        <p>Private Apartment</p>
                        <p className="font-medium">
                          {formattedPrice(
                            organization.accommodationPrivateApartmentPrice!,
                          )}
                        </p>
                      </div>
                    )}
                    {organization.accommodationStudentResidencePrice! > 0 && (
                      <div className="flex justify-between rounded-md border bg-background p-2">
                        <p>Student Residence</p>
                        <p className="font-medium">
                          {formattedPrice(
                            organization.accommodationStudentResidencePrice!,
                          )}
                        </p>
                      </div>
                    )}
                    {organization.accommodationHomeStayPrice! > 0 && (
                      <div className="flex justify-between rounded-md border bg-background p-2">
                        <p>Home Stay</p>
                        <p className="font-medium">
                          {formattedPrice(
                            organization.accommodationHomeStayPrice!,
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Price Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Price Summary</CardTitle>
            <CardDescription>Breakdown of all costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between border-b py-1">
              <span>Course Price:</span>
              <span className="font-medium line-through">
                {formattedPrice(watch("coursePrice") * watch("weeks") || 0)}
              </span>
            </div>
            <div className="flex justify-between border-b py-1 text-rose-500">
              <h4>
                AIMO <span>Price:</span>
              </h4>
              <span className="font-medium">
                {formattedPrice(watch("courseTotalPrice") || 0)}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span>Accommodation:</span>
              <span className="font-medium">
                {formattedPrice(watch("accommodationPrice") || 0)}
              </span>
            </div>
            <div className="flex justify-between border-b py-1">
              <span>Airport Transfer:</span>
              <span className="font-medium">
                {formattedPrice(watch("airportTransferPrice") || 0)}
              </span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Add-On Price:</span>
              <span>
                {formattedPrice(
                  watch("accommodationPrice") + watch("airportTransferPrice"),
                )}
              </span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total Price:</span>
              <span>
                {formattedPrice(
                  watch("coursePrice") * watch("weeks") +
                    watch("accommodationPrice") +
                    watch("airportTransferPrice"),
                )}
              </span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total Price after discount:</span>
              <span>
                {formattedPrice(
                  watch("coursePrice") * watch("weeks") * AIMO_DISCOUNT +
                    watch("accommodationPrice") +
                    watch("airportTransferPrice") || 0,
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-5">
              <Label htmlFor="status">Current Status:</Label>

              <h1
                className={cn(
                  "text-md inline-flex items-center rounded-full p-3 font-bold",
                  watch("status") === EnrollmentRequestState.PENDING &&
                    "bg-yellow-100 text-yellow-800",
                  watch("status") ===
                    EnrollmentRequestState.CONFIRM_BY_CENTER &&
                    "bg-green-100 text-green-800",
                  watch("status") === EnrollmentRequestState.CANCELLED &&
                    "bg-red-100 text-red-800",
                )}
              >
                {payment.status.replaceAll("_", " ").toLowerCase()}
              </h1>
            </div>
          </CardHeader>
        </Card>

        {/* Submit Button */}
        <div className="flex w-full flex-col gap-3">
          <Button
            type="button"
            className="w-full"
            onClick={() => confirmRefundMutate(cancellationId)}
            disabled={isConfirmingRefund || isCancelled}
          >
            {payment.status === PaymentState.CANCELLED
              ? "Refund Processed"
              : payment.status === PaymentState.CANCELLATION_PROCESSING
                ? "Refund Processing"
                : "Send Refund Request"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CancelEnrollmentForm;
