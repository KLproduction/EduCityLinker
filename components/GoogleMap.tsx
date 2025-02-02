"use client";

import { Library, Loader } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

type Props = {
  location: {
    coordinates: [number, number];
  };
};

const containerStyle = {
  width: "100%",
  height: "500px", // Ensure the map container has height
};

const MyGoogleMap = ({ location }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const libs: Library[] = ["places", "maps", "marker"];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      const initMap = async () => {
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        // Map options
        const mapOptions: google.maps.MapOptions = {
          center: {
            lat: location.coordinates[0],
            lng: location.coordinates[1],
          },
          zoom: 15,
          mapId: "MAP_ID", // Replace "MAP_ID" with your actual mapId or remove it if unused
        };

        // Initialize the map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        // Add a marker
        new Marker({
          map: map,
          position: {
            lat: location.coordinates[0],
            lng: location.coordinates[1],
          },
        });
      };

      initMap();
    }
  }, [isLoaded, location]);

  return (
    <>
      {isLoaded ? (
        <div ref={mapRef} style={containerStyle} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MyGoogleMap;
