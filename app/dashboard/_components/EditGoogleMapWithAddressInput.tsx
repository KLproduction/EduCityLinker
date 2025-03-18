"use client";

import { useEffect, useRef, useState } from "react";
import { autoComplete, getGeometry } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { v4 } from "uuid";
import {
  useAppDispatch,
  useAppSelector,
  setOrganizationData,
} from "@/redux/store";
import { googleLat } from "@/components/GoogleMapSimple";
import { useEditOrganization } from "@/hooks/create-organization";

const LIBRARIES: Library[] = ["marker"];
type Props = {
  centerLocation: string;
  centerLat: number;
  centerLng: number;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setLocation: (location: string) => void;
};
const EditGoogleMapWithAddressInput = ({
  centerLocation,
  centerLat,
  centerLng,
  setLat,
  setLng,
  setLocation,
}: Props) => {
  console.log(centerLocation, centerLat, centerLng);

  const [location, setLocalLocation] = useState<PlaceAutocompleteResult | null>(
    null,
  );

  const [center, setCenter] = useState<googleLat | null>(null);

  // Local state for autocomplete input and predictions.
  const [input, setInput] = useState(centerLocation ?? "");
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);

  // Refs to hold the map container, map instance, and marker.
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Load the Google Maps API.
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  // --- Autocomplete Logic ---

  const generateSessionToken = (): string => {
    return v4();
  };

  const [sessionToken, setSessionToken] = useState<string>(
    generateSessionToken(),
  );

  // Get predictions
  useEffect(() => {
    const fetchPredictions = async () => {
      const data = await autoComplete(input, generateSessionToken());
      setPredictions(data?.predictions ?? []);
    };

    if (input.length >= 3) {
      fetchPredictions();
    }
  }, [input, sessionToken]);

  // Initialize the map once when the API is loaded.
  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      // Use the provided center or fallback to default coordinates.
      const initialCenter = {
        lat: center?.location?.coordinates[0] ?? centerLat ?? 51.4545,
        lng: center?.location?.coordinates[1] ?? centerLng ?? -2.5879,
      };

      // Create the map.
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 15,
        // Optionally include a mapId if needed.
        // mapId: "MAP_ID",
      });

      // Create the marker at the initial position.
      markerRef.current = new google.maps.Marker({
        map: mapInstanceRef.current,
        position: initialCenter,
        title: "Location Marker",
      });
    }
  }, [isLoaded]);

  // Update the map center and marker position whenever the center changes.
  useEffect(() => {
    if (mapInstanceRef.current && center?.location?.coordinates) {
      const newCenter = {
        lat: center.location.coordinates[0],
        lng: center.location.coordinates[1],
      };

      // Update the map's center.
      mapInstanceRef.current.setCenter(newCenter);

      // Update the marker's position.
      if (markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  }, [center]);

  const handleSelectLocation = async (
    prediction: PlaceAutocompleteResult,
    placeId: string,
  ) => {
    const data = await getGeometry(placeId);

    if (data) {
      const newCenter = {
        lat: data.lat,
        lng: data.lng,
      };

      // ✅ Update state first
      setCenter({
        location: {
          coordinates: [newCenter.lat, newCenter.lng],
        },
      } as googleLat);

      // ✅ Wait for state update using a timeout to ensure React updates state before dispatch
      setTimeout(() => {
        setLat(data.lat); // ✅ Update lat in parent
        setLng(data.lng); // ✅ Update lng in parent
        setLocation(prediction.description); // ✅ Update location in parent
      }, 100); // Delay dispatch slightly to allow state update

      setLocalLocation(prediction);
      setInput(prediction.description);
      setSessionToken(generateSessionToken());
    } else {
      console.error("Failed to fetch location coordinates.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {/* Autocomplete Input Section */}
      <Command>
        <CommandInput
          className="w-full"
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
                onSelect={() =>
                  handleSelectLocation(prediction, prediction.place_id)
                }
              >
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      {/* Map Container */}
      {isLoaded ? (
        <div ref={mapRef} className="h-[300px] w-full" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditGoogleMapWithAddressInput;
