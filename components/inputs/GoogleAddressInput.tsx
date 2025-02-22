"use client";

import { autoComplete, getGeometry } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useGoogleLocation } from "@/hooks/create-course";
import { googleLat } from "../GoogleMapSimple";
import { v4 } from "uuid";

type Props = {};

const GoogleAddressInput = (props: Props) => {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = useState("");
  const { location, setLocation, setCenter } = useGoogleLocation();

  const generateSessionToken = (): string => {
    return v4();
  };

  const [sessionToken, setSessionToken] = useState<string>(
    generateSessionToken(),
  );

  useEffect(() => {
    const fetchPredictions = async () => {
      const data = await autoComplete(input, sessionToken);

      setPredictions(data?.predictions ?? []);
    };
    if (input.length >= 3) {
      fetchPredictions();
    }
  }, [input, sessionToken]);

  useEffect(() => {
    const fetchGeometry = async (placeId: string) => {
      const data = await getGeometry(placeId);

      if (data) {
        setCenter({
          location: {
            coordinates: [data.lat, data.lng],
          },
        } as googleLat);
      }
    };
    fetchGeometry(location?.place_id ?? "");
  }, [location]);

  const handleSelectLocation = (prediction: PlaceAutocompleteResult) => {
    setLocation(prediction);
    const city = prediction.description.split(",").slice(-2)[0];
    console.log("city", city);
    setInput(prediction.description);

    setSessionToken(generateSessionToken());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16 p-8">
      <Command>
        <CommandInput
          className="w-[500px]"
          placeholder="What is the location?"
          value={input}
          onValueChange={(e) => setInput(e)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Locations">
            {predictions.map((prediction) => (
              <CommandItem
                key={prediction.place_id}
                onSelect={() => handleSelectLocation(prediction)}
              >
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default GoogleAddressInput;
