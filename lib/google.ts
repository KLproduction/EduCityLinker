"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
const ontarioBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(43.6532, -79.3832),
  new google.maps.LatLng(43.6532, -79.3832),
);
export const autoComplete = async (input: string) => {
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY!,
      },
    });

    return response.data.predictions;
  } catch (err) {
    console.log(err);
  }
};
