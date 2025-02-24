import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrganizerSchema } from "@/schemas"; // Adjust the import path as needed
import { z } from "zod";

export type organizationSliceState = z.infer<typeof createOrganizerSchema>;

const initialState: organizationSliceState = {
  name: "",
  description: "",
  logo: "",
  coverPhoto: "",
  gallery: [],
  feature: [],
  facility: [],
  accommodationTypes: "",
  roomTypes: "",
  roomAmenities: [],
  location: "",
  city: "",
  country: "",
  lat: 51.4545,
  lng: -2.5879,
  distanceOfAmenities: 1,
  amenityGallery: [],
  rating: 3,
  ratingDescription: "",
  lessonDuration: 1,
  studentMinAge: 1,
  studentMaxAge: 1,
  averageStudentPerClass: 1,
  accommodationHomeStayPrice: 0,
  accommodationStudentResidencePrice: 0,
  accommodationPrivateApartmentPrice: 0,
  homeStayPreference: [],
  airportTransfers: false,
  airportTransferOnArrivalAndDeparturePrice: 0,
  airportTransferArrivalOnlyPrice: 0,
  airportTransferDepartureOnlyPrice: 0,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizationData: (
      state,
      action: PayloadAction<Partial<organizationSliceState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    appendToGallery: (state, action: PayloadAction<string>) => {
      if (state.gallery) {
        state.gallery.push(action.payload);
      }
    },
    appendToAmenityGallery: (state, action: PayloadAction<string>) => {
      if (state.amenityGallery) {
        state.amenityGallery.push(action.payload);
      }
    },
    appendToFeature: (state, action: PayloadAction<string>) => {
      if (state.feature) {
        state.feature.push(action.payload);
      }
    },
    appendToFacility: (state, action: PayloadAction<string>) => {
      if (state.facility) {
        state.facility.push(action.payload);
      }
    },
    appendToRoomAmenities: (state, action: PayloadAction<string>) => {
      if (state.roomAmenities) {
        state.roomAmenities.push(action.payload);
      }
    },
    appendHomeStayPreference: (state, action: PayloadAction<string>) => {
      if (state.homeStayPreference) {
        state.homeStayPreference.push(action.payload);
      }
    },
    resetOrganizationData: () => initialState,
  },
});

// ✅ Export actions
export const {
  setOrganizationData,
  resetOrganizationData,
  appendToGallery,
  appendToFeature,
  appendToFacility,
  appendToRoomAmenities,
  appendToAmenityGallery,
  appendHomeStayPreference,
} = organizationSlice.actions;

// ✅ Export reducer
export default organizationSlice.reducer;
