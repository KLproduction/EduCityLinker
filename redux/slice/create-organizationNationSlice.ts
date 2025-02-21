import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nationalitySchema } from "@/schemas"; // Adjust the import path as needed
import { z } from "zod";

export type organizationNationSliceState = z.infer<typeof nationalitySchema>;

const initialState: organizationNationSliceState[] = [];

const studentNationSlice = createSlice({
  name: "studentNation",
  initialState,
  reducers: {
    addStudentNation: (
      state,
      action: PayloadAction<organizationNationSliceState>,
    ) => {
      state.push(action.payload);
    },

    updateStudentNation: (
      state,
      action: PayloadAction<{
        index: number;
        data: Partial<organizationNationSliceState>;
      }>,
    ) => {
      const { index, data } = action.payload;
      if (state[index]) {
        state[index] = { ...state[index], ...data };
      }
    },

    removeStudentNation: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },

    resetStudentNationData: () => initialState,
  },
});

export const {
  addStudentNation,
  updateStudentNation,
  removeStudentNation,
  resetStudentNationData,
} = studentNationSlice.actions;

export default studentNationSlice.reducer;
