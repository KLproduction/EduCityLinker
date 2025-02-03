"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export const autoComplete = async (input: string, sessionToken: string) => {
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY!,
        components: ["country:gb"],
        sessiontoken: sessionToken,
      },
      timeout: 1000,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGeometry = async (placeId: string) => {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY!,
      },
    });
    return response.data.result.geometry?.location;
  } catch (err) {
    console.log(err);
  }
};
