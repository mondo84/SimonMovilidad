import { clearPositions, getPositions } from "@/lib/db";
import { SensorType } from "@/modules/dashboard/types/SensorType";

export const syncPositions = async () => {
  const positions: SensorType[] = await getPositions();
  if (!positions.length) return;

  const payload = positions.map((p) => ({
    vehicleId: p.Vehicle_id ?? "DEV-XXXX",
    latitude: p.Lat ?? 0,
    longitude: p.Long ?? 0,
    fuelLevel: p.FuelLevel ?? 0,
    speed: p.Speed ?? 0,
    temperature: p.Temperature ?? 0,
    timestamp: p.Timestamp ?? new Date().toISOString(),
    active: p.Active ?? true,
  }));

  try {
    const res = await fetch("/api/dashboard/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Error sincronizando posiciones");

    await clearPositions();
    alert("Sincronizada DB");
  } catch (err) {
    console.error(err);
  }
};
