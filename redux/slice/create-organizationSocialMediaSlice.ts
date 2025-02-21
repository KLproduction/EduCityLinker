import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { socialMediaSchema } from "@/schemas"; // Adjust the path if needed
import { z } from "zod";

export type SocialMediaState = z.infer<typeof socialMediaSchema>;

const initialState: SocialMediaState = {
  facebook: "",
  instagram: "",
  website: "",
};

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    // ✅ Set social media data
    setSocialMediaData: (
      state,
      action: PayloadAction<Partial<SocialMediaState>>,
    ) => {
      return { ...state, ...action.payload };
    },

    // ✅ Reset social media data
    resetSocialMediaData: () => initialState,
  },
});

export const { setSocialMediaData, resetSocialMediaData } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
