"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  accommodationTypes,
  homeStayPreferences,
  studentAccommodationDetails,
} from "@/data/data";
import { cn } from "@/lib/utils";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import EditOrganizationCounter from "./EditOrganizationCounter";

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const EditAccommodationType = ({ setValue, watch }: Props) => {
  const accommodationType = watch("accommodationTypes");
  const roomType = watch("roomTypes");
  const roomAmenities = watch("roomAmenities") || [];
  const homeStayPreference = watch("homeStayPreference") || [];

  const noAccommodation = accommodationType === "No Accommodation";

  const handleSelect = (value: string) => {
    setValue("accommodationTypes", value, { shouldValidate: true });
    setValue("accommodationHomeStayPrice", 0);
    setValue("accommodationPrivateApartmentPrice", 0);
    setValue("accommodationStudentResidencePrice", 0);
    setValue("homeStayPreference", []);
  };

  const handleRoomTypeChange = (value: string) => {
    setValue("roomTypes", value, { shouldValidate: true });
  };

  const handleAmenityToggle = (amenity: string) => {
    const updated = roomAmenities.includes(amenity)
      ? roomAmenities.filter((a: string) => a !== amenity)
      : [...roomAmenities, amenity];
    setValue("roomAmenities", updated, { shouldValidate: true });
  };

  const handleHomeStayPreferenceToggle = (preference: string) => {
    const updated = homeStayPreference.includes(preference)
      ? homeStayPreference.filter((p: string) => p !== preference)
      : [...homeStayPreference, preference];
    setValue("homeStayPreference", updated, { shouldValidate: true });
  };

  return (
    <div>
      <RadioGroup
        value={accommodationType || ""}
        onValueChange={handleSelect}
        className="space-y-3"
      >
        {accommodationTypes.map((item) => (
          <Label
            key={item.label}
            className="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition hover:border-rose-800"
          >
            <RadioGroupItem value={item.label} />
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </Label>
        ))}
      </RadioGroup>

      {accommodationType === "Home Stay" && (
        <>
          <EditOrganizationCounter
            type="accommodationHomeStayPrice"
            counterType="per week"
            setValue={setValue}
            watch={watch}
          />
          <div className="space-y-4">
            <div className="my-3 text-sm font-medium">
              Home Stay Preferences
            </div>
            <div className="grid grid-cols-2 gap-5">
              {homeStayPreferences.map((preference) => (
                <Label
                  key={preference.label}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    checked={homeStayPreference.includes(preference.label)}
                    onCheckedChange={() =>
                      handleHomeStayPreferenceToggle(preference.label)
                    }
                    disabled={noAccommodation}
                  />
                  <span className="text-sm">{preference.label}</span>
                </Label>
              ))}
            </div>
          </div>
        </>
      )}

      {accommodationType === "Student Residence" && (
        <EditOrganizationCounter
          type="accommodationStudentResidencePrice"
          counterType="per week"
          setValue={setValue}
          watch={watch}
        />
      )}

      {accommodationType === "Private Apartment" && (
        <EditOrganizationCounter
          type="accommodationPrivateApartmentPrice"
          counterType="per week"
          setValue={setValue}
          watch={watch}
        />
      )}

      <div
        className={cn(
          "mt-4 flex flex-col gap-8 space-y-4",
          noAccommodation && "pointer-events-none opacity-50",
        )}
      >
        <div className="mt-4">
          <div className="text-sm font-medium">Room Type</div>
          <RadioGroup
            value={roomType || ""}
            onValueChange={handleRoomTypeChange}
            className="flex items-center gap-3"
          >
            {studentAccommodationDetails.roomTypes.map((room) => (
              <Label
                key={room.label}
                className="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition hover:border-rose-800"
              >
                <RadioGroupItem value={room.label} />
                <div className="text-sm">{room.label}</div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="mb-3 text-sm font-medium">Amenities</div>
          <div className="grid grid-cols-2 gap-2">
            {studentAccommodationDetails.amenities.map((amenity) => (
              <Label key={amenity.label} className="flex items-center gap-2">
                <Checkbox
                  checked={roomAmenities.includes(amenity.label)}
                  onCheckedChange={() => handleAmenityToggle(amenity.label)}
                  disabled={noAccommodation}
                />
                <span className="text-sm">{amenity.label}</span>
              </Label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <EditOrganizationCounter
            title="Distance from the center"
            subtitle="Distance between accommodation and center?"
            type="distanceOfAmenities"
            counterType="miles"
            disabled={noAccommodation}
            setValue={setValue}
            watch={watch}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccommodationType;
