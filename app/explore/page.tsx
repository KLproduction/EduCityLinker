"use client";
import MyGoogleMap from "@/components/GoogleMap";
import GoogleAddressInput from "@/components/inputs/GoogleAddressInput";
import TestGoogleMap from "@/components/TestGoogleMap";
import { autoComplete } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const ExplorePage = () => {
  return (
    <div className="mt-24 flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="h-full w-full text-2xl font-bold text-red-500">EXPLORE</h1>
      {/* <GoogleAddressInput /> */}

      <div className="h-full w-1/2">
        {/* <MyGoogleMap location={{ coordinates: [43.642693, -79.3871189] }} /> */}
        <TestGoogleMap />
        {/* <MyGoogleMap location={{ coordinates: [43.642693, -79.3871189] }} /> */}
      </div>
    </div>
  );
};

export default ExplorePage;
