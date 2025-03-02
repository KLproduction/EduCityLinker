import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import { enrollmentRequestSchema } from "@/schemas";

// Define TypeScript type from Zod schema
export type EnrollmentRequestState = z.infer<typeof enrollmentRequestSchema>;

// Define initial state
const initialState: EnrollmentRequestState = {
  firstName: "",
  sureName: "",
  contactNumber: "",
  emailAddress: "",
  startDate: new Date(),
  weeks: 1,
  airportTransfer: false,
  airportTransfersType: "",
  airportTransferPrice: 0,
  accommodationPrice: 0,
  accommodation: false,
  totalPrice: 0,
  createdAt: new Date(),
  status: "PENDING",
  centerConfirmed: false,
  centerConfirmationDate: null,
};

export const createEnrollmentSlice = createSlice({
  name: "enrollmentRequest",
  initialState,
  reducers: {
    setEnrollmentData: (
      state,
      action: PayloadAction<Partial<EnrollmentRequestState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    resetEnrollmentRequestData: () => initialState,
  },
});

export const { setEnrollmentData, resetEnrollmentRequestData } =
  createEnrollmentSlice.actions;

export default createEnrollmentSlice.reducer;
