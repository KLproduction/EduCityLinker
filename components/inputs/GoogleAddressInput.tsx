"use client";

import { autoComplete } from "@/lib/google";
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

type Props = {};

const GoogleAddressInput = (props: Props) => {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = useState("");
  const { setLocation } = useGoogleLocation();

  useEffect(() => {
    const fetchPredictions = async () => {
      const data = await autoComplete(input);

      setPredictions(data ?? []);
    };
    fetchPredictions();
  }, [input]);

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
                onSelect={() => {
                  setLocation(prediction);
                }}
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
