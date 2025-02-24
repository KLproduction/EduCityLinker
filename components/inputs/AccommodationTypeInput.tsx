"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  appendToRoomAmenities,
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";
import { setOrganizationData } from "@/redux/store";
import {
  accommodationTypes,
  studentAccommodationDetails,
  homeStayPreferences,
} from "@/data/data";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import CreateOrganizationCounter from "./CreateOrganizationCounter";
import { appendHomeStayPreference } from "@/redux/slice/create-organizationSlice";

const AccommodationTypeInput = () => {
  const organizationData = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  const amenities = organizationData.accommodationTypes;
  const roomType = organizationData.roomTypes;
  const roomAmenities = organizationData.roomAmenities;

  const handleSelect = (value: string) => {
    dispatch(
      setOrganizationData({
        accommodationTypes: value,
        accommodationHomeStayPrice: 0,
        accommodationPrivateApartmentPrice: 0,
        accommodationStudentResidencePrice: 0,
        homeStayPreference: [],
      }),
    );
  };

  const handleRoomTypeChange = (value: string) => {
    dispatch(setOrganizationData({ roomTypes: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    if (organizationData.roomAmenities?.includes(amenity)) {
      const updatedAmenities = organizationData.roomAmenities.filter(
        (item) => item !== amenity,
      );
      dispatch(setOrganizationData({ roomAmenities: updatedAmenities }));
    } else {
      dispatch(appendToRoomAmenities(amenity));
    }
  };
  const handleHomeStayPreferenceToggle = (preference: string) => {
    if (organizationData.homeStayPreference?.includes(preference)) {
      const updatedAmenities = organizationData.homeStayPreference.filter(
        (item) => item !== preference,
      );
      dispatch(setOrganizationData({ homeStayPreference: updatedAmenities }));
    } else {
      dispatch(appendHomeStayPreference(preference));
    }
  };

  const noAccommodation = amenities === "No Accommodation";

  useEffect(() => {
    if (noAccommodation) {
      dispatch(
        setOrganizationData({
          roomTypes: "",
          roomAmenities: [],
          distanceOfAmenities: 0,
        }),
      );
    }
    setOrganizationData({
      distanceOfAmenities: 1,
    });
  }, [noAccommodation, amenities, dispatch]);

  return (
    <div>
      <RadioGroup
        className="space-y-3"
        value={amenities || ""}
        onValueChange={handleSelect}
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

      {amenities === "Home Stay" && (
        <CreateOrganizationCounter
          type="accommodationHomeStayPrice"
          counterType="per week"
        />
      )}
      {amenities === "Student Residence" && (
        <CreateOrganizationCounter
          type="accommodationStudentResidencePrice"
          counterType="per week"
        />
      )}
      {amenities === "Private Apartment" && (
        <CreateOrganizationCounter
          type="accommodationPrivateApartmentPrice"
          counterType="per week"
        />
      )}
      {amenities === "Home Stay" && (
        <div className="space-y-4">
          <div className="my-3 text-sm font-medium">Home Stay Preferences</div>
          <div className="grid grid-cols-2 gap-5">
            {homeStayPreferences.map((preference) => (
              <Label key={preference.label} className="flex items-center gap-2">
                <Checkbox
                  checked={organizationData.homeStayPreference?.includes(
                    preference.label,
                  )}
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
            className="flex items-center gap-3"
            value={roomType || ""}
            onValueChange={handleRoomTypeChange}
            disabled={noAccommodation}
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
                  checked={organizationData.roomAmenities?.includes(
                    amenity.label,
                  )}
                  onCheckedChange={() => handleAmenityToggle(amenity.label)}
                  disabled={noAccommodation}
                />
                <span className="text-sm">{amenity.label}</span>
              </Label>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <CreateOrganizationCounter
            title="Distance from the center"
            subtitle="Distance between accommodation and center?"
            type="distanceOfAmenities"
            counterType="miles"
            disabled={noAccommodation}
          />
        </div>
      </div>
    </div>
  );
};

export default AccommodationTypeInput;
