"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import L, { Marker as M } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const carIcon = new L.Icon({
  iconUrl: "/puntero.png",
  iconSize: [35, 35],
  iconAnchor: [16, 32],
});

export type NewPosition = {
  Lat: number;
  Long: number;
  FuelLevel: number;
  Temperature: number;
  VehicleId: string;
  Timestamp: string;
};

type LeafletMapProps = {
  message?: string;
  position: [number, number] | null;
};

const LeafletMap = ({ position, message }: LeafletMapProps) => {
  const markerRef = useRef<M>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [message]);

  return position ? (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "100%" }}
      key={message}
    >
      <ChangeView center={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={carIcon} ref={markerRef}>
        <Tooltip key={message} direction="top" offset={[0, -10]} permanent>
          {message ? (
            <div>
              <div>{message}</div>
              <div>{`Actual: Lat: ${position[0]}, Long: ${position[1]}`}</div>
            </div>
          ) : (
            <div>{`Actual: Lat: ${position[0]}, Long: ${position[1]}`}</div>
          )}
        </Tooltip>
      </Marker>
    </MapContainer>
  ) : (
    <>
      <span>Espere mientras llegan las coordenadas al mapa ...</span>
    </>
  );
};

export default LeafletMap;
