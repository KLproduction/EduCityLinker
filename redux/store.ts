//this is our redux store
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import courseSlice, {
  setCourseData,
  resetCourseData,
} from "./slice/create-courseSlice";
import organizationSlice, {
  setOrganizationData,
  resetOrganizationData,
  appendToGallery,
  appendToFeature,
  appendToFacility,
  appendToRoomAmenities,
} from "./slice/create-organizationSlice";
import createEnrollmentSlice, {
  setEnrollmentData,
  resetEnrollmentRequestData,
} from "./slice/create-enrollmentRequestSlice";

import studentNationSlice from "./slice/create-organizationNationSlice";
import socialMediaSlice from "./slice/create-organizationSocialMediaSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  createCourse: courseSlice,
  organization: organizationSlice,
  studentNation: studentNationSlice,
  socialMedia: socialMediaSlice,
  createEnrollmentRequest: createEnrollmentSlice,
});
const persisConfig = {
  key: "root",
  storage,
  whitelist: ["createCourse", "organization", "studentNation", "socialMedia"],
};
const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//we export these type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//this useAppSelector has type definitions added
export const persistor = persistStore(store);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { setCourseData, resetCourseData };
export {
  setOrganizationData,
  resetOrganizationData,
  appendToGallery,
  appendToFeature,
  appendToFacility,
  appendToRoomAmenities,
};
