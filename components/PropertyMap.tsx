"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import { type PropertyType } from "@/models/Property";
import { type SerializableObjectType } from "@/utils/convertToObjext";
import { useEffect, useState } from "react";
import { getCoordinates } from "@/app/actions/getCoordinates";
import "maplibre-gl/dist/maplibre-gl.css";

const PropertyMap = ({
  property,
}: {
  property: SerializableObjectType<PropertyType>;
}) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await getCoordinates(
          `${property.location?.street} ${property.location?.city} ${property.location?.state} ${property.location?.zipcode}`
        );
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const coord = res.results[0].geometry;
        setLat(coord.lat);
        setLng(coord.lng);
        setViewPort((prev) => ({
          ...prev,
          latitude: coord.lat,
          longitude: coord.lng,
        }));
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, [property]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (geocodeError) {
    return <h3 className="text-xl">No location data found.</h3>;
  }
  if (lat === null || lng === null) {
    return <h3 className="text-xl">No coordinates available.</h3>;
  }
  return (
    <div className="map-container" style={{ width: "100%", height: "500px" }}>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=KbBUrh3QwyZrPT5kJGe8`}
      >
        <Marker longitude={lng} latitude={lat} />
      </Map>
    </div>
  );
};

export default PropertyMap;
