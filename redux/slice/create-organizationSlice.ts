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
  location: "",
  lat: 0,
  lng: 0,
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
    resetOrganizationData: () => initialState,
  },
});

// ✅ Export actions
export const {
  setOrganizationData,
  resetOrganizationData,
  appendToGallery,
  appendToFeature,
} = organizationSlice.actions;

// ✅ Export reducer
export default organizationSlice.reducer;
