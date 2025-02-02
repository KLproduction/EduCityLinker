"use client";

import { useGoogleLocation } from "@/hooks/create-course";
import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MyGoogleMap = () => {
  const [center, setCenter] = useState<string>("");
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { location } = useGoogleLocation();

  useEffect(() => {
    if (location) {
      setCenter(location.place_id);
      console.log("MapLocation", location);
    }
  }, [location]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const position = {
        lat: 43.642693,
        lng: -79.3871189,
      };

      //init marker
      const { Marker } = (await loader.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      //map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: "MAP_ID",
      };

      //setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      //setup marker
      const marker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  return <div ref={mapRef} style={{ height: "500px" }} />;
};

export default MyGoogleMap;
