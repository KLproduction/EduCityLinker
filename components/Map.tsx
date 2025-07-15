"use client";

import { useEffect, useRef } from "react";
import { useJsApiLoader, type Libraries } from "@react-google-maps/api";

const LIBRARIES: Libraries = ["places"];

interface GoogleMapProps {
  lat: number;
  lng: number;
  className?: string;
}

const GoogleMap = ({ lat, lng, className }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  // Initialize the map once when the API is loaded.
  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      const initialCenter = { lat, lng };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 15,
      });

      markerRef.current = new google.maps.Marker({
        map: mapInstanceRef.current,
        position: initialCenter,
        title: "Location Marker",
      });
    }
  }, [isLoaded, lat, lng]);

  // Update the map center and marker position if lat or lng props change.
  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCenter = { lat, lng };
      mapInstanceRef.current.setCenter(newCenter);
      if (markerRef.current) {
        markerRef.current.setPosition(newCenter);
      }
    }
  }, [lat, lng]);

  return isLoaded ? (
    <div
      ref={mapRef}
      style={{ height: "300px", width: "100%" }}
      className={className}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default GoogleMap;
