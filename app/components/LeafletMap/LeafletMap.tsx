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
  // const session = useSession();
  // const [position, setPosition] = useState<[number, number]>([
  //   10.9243697, -74.797705,
  // ]);

  // useEffect(() => {
  //   const handleOffline = async () => {
  //     const cached = await getPositions();

  //     cached.forEach(({ Lat, Long }: SensorType) => {
  //       setPosition([Lat, Long]); // Pintar mapa con estado
  //     });
  //   };

  //   const handleOnline = async () => {
  //     const token = session.data?.accessToken ?? undefined;
  //     await syncPositions(token); // Sincronizar DB.
  //   };

  //   window.addEventListener("offline", handleOffline);
  //   window.addEventListener("online", handleOnline);

  //   return () => {
  //     window.removeEventListener("offline", handleOffline);
  //     window.removeEventListener("online", handleOnline);
  //   };
  // }, []);

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     //   .withUrl("http://localhost:5010/ws/alerts")
  //     .withUrl("http://localhost:5010/ws/alerts")
  //     .withAutomaticReconnect()
  //     .build();

  //   connection.start().then(() => {
  //     console.log("Conectado a SignalR...");
  //   });

  //   connection.on("LOCATION_UPDATE", async (position: SensorType[]) => {
  //     console.log("LOCALI: ", position);

  //     // await savePosition(position); // Save in chache.
  //     // setPosition([position.Lat, position.Long]);
  //     //  animateMove(position, [lat, lng], 1000);
  //   });

  //   return () => {
  //     connection.stop();
  //   };
  // }, [position]);

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
          {message
            ? message
            : `Actual: Lat: ${position[0]}, Long: ${position[1]}`}
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
