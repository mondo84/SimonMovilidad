"use client";
import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from "chart.js";
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Map = dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const DashboardPage = () => {
  const [positions, setPositions] = useState<[]>([]);
  const [speedData, setSpeedData] = useState<[]>([]);
  const [fuelData, setFuelData] = useState<[]>([]);

  useEffect(() => {
    // const connection = new signalR.HubConnectionBuilder()
    //   //   .withUrl("http://localhost:5010/ws/alerts")
    //   .withUrl("http://localhost:5010/ws/alerts")
    //   .withAutomaticReconnect()
    //   .build();
    // connection.start().then(() => {
    //   console.log("SignalR conectado con Dashboard");
    // });
    // connection.on("LOCATION_UPDATE", (data) => {
    //   console.log("📡 data:", data);
    // Historial
    // setPositions((prev) => [...prev, data]);
    // setSpeedData((prev) => [...prev, data.speed].slice(-5)); // últimos 50
    // setFuelData((prev) => [...prev, data.fuel].slice(-5));
    // return () => {
    //   connection.stop();
    // };
    //});
  }, []);

  const createChartData = (label: string, data: number[]) => ({
    labels: ["10:00", "10:05", "10:10", "10:15", "10:20"],
    // labels: speedData.map((_, i) => `T${i}`),
    datasets: [
      {
        label: "Velocidad km/h",
        // data: speedData,
        data: [60, 75, 80, 70, 90],
        borderWidth: 2,
        tension: 0.3, // suaviza la línea
      },
    ],
  });

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-[calc(100vh-75px)] gap-1">
      <div className="border">
        {/* <div className="text-sm p-1">Localizacion del Vehiculo</div> */}
        <Map />
      </div>
      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Historial de Velocidad</div>
        <div className="flex-1 min-h-0">
          <Line
            className="w-full h-full"
            data={createChartData("Velocidad", speedData)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Registro Historico</div>
      </div>

      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Historial de Combustible</div>
        <div className="flex-1 min-h-0">
          <Line
            className="w-full h-full"
            data={createChartData("Combustible", speedData)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
