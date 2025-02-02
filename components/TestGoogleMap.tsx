"use client";

import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const LIBRARY: Library[] = ["places", "marker"]; // Only include needed libraries

const TestGoogleMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [place, selectedPlace] = useState("");

  // Using a ref to store the marker allows us to update it without recreating it.
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARY,
  });

  const mapRef = useRef<HTMLDivElement | null>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement | null>(null);

  // 1. Initialize the map and autocomplete once when the API is loaded.
  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      // Create the map
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 51.4545, lng: -2.5879 },
        zoom: 17,
        mapId: "MAP_ID",
      };
      const gMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(gMap);

      // Set up the autocomplete with UK bounds
      const ukBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.837982, -10.854492),
        new google.maps.LatLng(59.360249, 1.768921),
      );

      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
        {
          bounds: ukBounds,
          fields: ["geometry", "formatted_address", "name"],
          componentRestrictions: { country: "gb" },
        },
      );
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded, map]);

  // 2. Listen for changes from the autocomplete and update the marker/center accordingly.
  useEffect(() => {
    if (autoComplete && map) {
      const listener = autoComplete.addListener("place_changed", () => {
        const location = autoComplete.getPlace();
        selectedPlace(location.formatted_address as string);

        const geometry = location.geometry?.location;
        if (geometry) {
          // Update the map center
          map.setCenter(geometry);

          // Create the marker if it doesn't exist; otherwise, update its position.
          if (markerRef.current) {
            markerRef.current.position = geometry;
          } else {
            markerRef.current = new google.maps.marker.AdvancedMarkerElement({
              map: map,
              position: geometry,
              title: location.name || "Marker",
            });
          }
        }
      });

      // Clean up the listener when the component unmounts or dependencies change.
      return () => {
        listener.remove();
      };
    }
  }, [autoComplete, map]);

  return (
    <div className="flex flex-col space-y-4">
      <Input ref={placeAutoCompleteRef} />
      <Label>{place}</Label>

      {isLoaded ? (
        <div
          className="mt-12"
          style={{ width: "100%", height: "400px" }}
          ref={mapRef}
        ></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestGoogleMap;
