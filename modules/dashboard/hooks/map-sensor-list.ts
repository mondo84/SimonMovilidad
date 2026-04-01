import { SensorType } from "../types/SensorType";

type PropertyType = "FuelLevel" | "Speed";

export const sensorListMap = (
  sensorList: SensorType[],
  property: PropertyType,
) => {
  return (
    sensorList.map((s) => ({
      value: s[property],
      label: new Date(s.Timestamp).toISOString().slice(11, 16),
    })) ?? []
  );
};
