import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCourseSchema } from "@/schemas";
import { z } from "zod";

// ✅ Infer type from Zod schema
export type CourseState = z.infer<typeof createCourseSchema>;

// ✅ Ensure correct type for initialState
const initialState: CourseState = {
  category: "",
  location: "",
  lat: undefined,
  lng: undefined,
  courseLevels: "",
  ageGroups: "",
  maxStudents: 1,
  durationWeeks: 1,
  price: 1,
  imageSrc: "",
  title: "",
  description: "",
};

// ✅ Use CourseState for TypeScript safety
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseData: (state, action: PayloadAction<Partial<CourseState>>) => {
      return { ...state, ...action.payload };
    },
    resetCourseData: () => initialState,
  },
});

// ✅ Export actions
export const { setCourseData, resetCourseData } = courseSlice.actions;

// ✅ Export reducer
export default courseSlice.reducer;
