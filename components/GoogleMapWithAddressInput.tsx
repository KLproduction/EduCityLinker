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
} from "./ui/command";
import { useGoogleLocation } from "@/hooks/create-course";
import { googleLat } from "./GoogleMapSimple";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCourseData } from "@/redux/slice/create-courseSlice";

const LIBRARIES: Library[] = ["marker"];

const GoogleMapWithAddressInput = () => {
  const dispatch = useAppDispatch();
  const {
    location: courseLocation,
    lat: courseLat,
    lng: courseLng,
  } = useAppSelector((state) => state.createCourse);

  const { location, setLocation, center, setCenter } = useGoogleLocation();

  // Local state for autocomplete input and predictions.
  const [input, setInput] = useState("");
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

  // set geometry to update the center.
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

    if (location?.place_id) {
      fetchGeometry(location.place_id);
    }
  }, [location, setCenter]);

  // --- Map Initialization and Updates ---

  // Initialize the map once when the API is loaded.
  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      // Use the provided center or fallback to default coordinates.
      const initialCenter = {
        lat: center?.location?.coordinates[0] ?? 51.4545,
        lng: center?.location?.coordinates[1] ?? -2.5879,
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

  const handleSelectLocation = (prediction: PlaceAutocompleteResult) => {
    setLocation(prediction);
    setInput(prediction.description);

    dispatch(
      setCourseData({
        location: prediction.description,
        lat: center?.location?.coordinates[0],
        lng: center?.location?.coordinates[1],
      }),
    );

    setSessionToken(generateSessionToken());
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
                onSelect={() => handleSelectLocation(prediction)}
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

export default GoogleMapWithAddressInput;
