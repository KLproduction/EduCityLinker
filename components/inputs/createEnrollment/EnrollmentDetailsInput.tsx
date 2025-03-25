import EnrollmentPriceSelector from "@/components/modals/EnrollmentPriceSelector";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { setEnrollmentData } from "@/redux/slice/create-enrollmentRequestSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Listing, Organization } from "@prisma/client";
import format from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

type Props = {
  listing: Listing;
  organization: Organization;
};

export const EnrollmentDetailsInput = ({ listing, organization }: Props) => {
  const [emailError, setEmailError] = useState("");
  const enrollmentData = useAppSelector(
    (state) => state.createEnrollmentRequest,
  );
  const dispatch = useAppDispatch();
  const emailSchema = z.string().email("Invalid email format");
  const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      setEmailError(result.error.errors[0].message);
    } else {
      setEmailError("");
    }
  };

  const isInvalidDate = enrollmentData.startDate <= new Date();
  const isValidPhoneNumber = (phone: string): boolean => {
    return /^\d+$/.test(phone.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    dispatch(setEnrollmentData({ emailAddress: email }));
    validateEmail(email);
  };

  return (
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

        {enrollmentData.contactNumber &&
          !isValidPhoneNumber(enrollmentData.contactNumber) && (
            <p className="text-sm text-red-600">
              Please enter a valid phone number.
            </p>
          )}

        <div className="space-y-2">
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            placeholder="Enter your email address"
            value={enrollmentData.emailAddress}
            onChange={handleEmailChange}
            className={`bg-white ${emailError ? "border-red-500" : ""}`}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
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
          {isInvalidDate && (
            <p className="text-sm text-red-600">
              Start date must be after today.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <EnrollmentPriceSelector basePrice={listing?.price || 0} />
        </div>
      </div>

      <Separator />
      {organization?.accommodationTypes === "No Accommodation" ? (
        <Card>
          <CardTitle className="flex w-full items-center justify-center p-6 text-zinc-500">
            No Accommodation Provided
          </CardTitle>
        </Card>
      ) : (
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
                        : enrollmentData.accommodationPrice -
                          accommodationPrice,
                    }),
                  );
                }}
              />
            </div>

            {enrollmentData.accommodation && organization && (
              <div className="mt-4 space-y-2 rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Available options:</p>
                <div className="ml-4 list-disc text-sm">
                  {organization.accommodationPrivateApartmentPrice! > 0 && (
                    <div className="flex gap-8">
                      <p>Private Apartment</p>

                      <p>
                        {formattedPrice(
                          organization.accommodationPrivateApartmentPrice!,
                        )}
                      </p>
                    </div>
                  )}
                  {organization.accommodationStudentResidencePrice! > 0 && (
                    <div className="flex gap-8">
                      <p>Student Residence</p>

                      <p>
                        {formattedPrice(
                          organization.accommodationStudentResidencePrice!,
                        )}
                      </p>
                    </div>
                  )}
                  {organization.accommodationHomeStayPrice! > 0 && (
                    <div className="flex gap-8">
                      <p>Home Stay</p>

                      <p>
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
};
