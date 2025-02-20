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
  distanceOfAmenities: 0,
  amenityGallery: [],
  location: "",
  lat: 51.4545,
  lng: -2.5879,
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
} = organizationSlice.actions;

// ✅ Export reducer
export default organizationSlice.reducer;
