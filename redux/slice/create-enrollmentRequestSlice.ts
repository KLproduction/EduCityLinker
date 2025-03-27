import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import { enrollmentRequestSchema } from "@/schemas";

// Define TypeScript type from Zod schema
export type EnrollmentRequestState = z.infer<typeof enrollmentRequestSchema>;

const getNextMondayAfterSevenDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7); // Move forward 7 days

  // Find the next Monday (1 = Monday, 0 = Sunday, ..., 6 = Saturday)
  while (futureDate.getDay() !== 1) {
    futureDate.setDate(futureDate.getDate() + 1);
  }

  return futureDate;
};

const initialState: EnrollmentRequestState = {
  firstName: "",
  sureName: "",
  contactNumber: "",
  emailAddress: "",
  startDate: getNextMondayAfterSevenDays(),
  weeks: 1,
  airportTransfer: false,
  airportTransfersType: "",
  airportTransferPrice: 0,
  accommodationPrice: 0,
  coursePrice: 0,
  accommodation: false,
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
