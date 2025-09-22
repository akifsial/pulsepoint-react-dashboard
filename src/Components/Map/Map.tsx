import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZGlya3NlbnRhZ3VpYW0iLCJhIjoiY21mY3R3cDBwMDF4ejJscHN3dGh6MDh5byJ9.i2cpDQ1kCC5RlEzbwHR2nQ";

const Map = ({ onLocationSelect,defaultCenter=[10.4515, 51.1657] }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      // center: [-74.006, 40.7128], // New York coordinates
      center: defaultCenter,
      zoom: 10.12,
    });

    // Add marker at New York
    new mapboxgl.Marker()
      .setLngLat(defaultCenter)
      .addTo(mapRef.current);

    // Add Geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
      marker: false,
    });

    mapRef.current.addControl(geocoder);

    geocoder.on("result", (event) => {
      const { center, place_name } = event.result;

      setSelectedLocation({
        name: place_name,
        latitude: center[1],
        longitude: center[0],
      });

      mapRef.current.flyTo({ center, zoom: 12 });

      if (onLocationSelect) {
        onLocationSelect({
          name: place_name,
          latitude: center[1],
          longitude: center[0],
        });
      }

      // Add a marker at selected location
      new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div className="h-64 rounded-xl w-full" ref={mapContainerRef}></div>
    </div>
  );
};

export default Map;
