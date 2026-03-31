export type SensorType = {
  Active: boolean;
  FuelLevel: number;
  Lat: number;
  Long: number;
  Speed: number;
  Temperature: number;
  Timestamp: string;
  Vehicle_id: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};

export type FuelAlertType = {
  vehicleId: string;
  remainingHours: number;
};

// export type AlarmReqType = {
//   Vehicle_id: string;
//   Message: string;
//   Active: true;
//   CreatedAt: string;
// };

export type AlarmReqType = {
  vehicleId: string;
  date: string;
  showInactive: boolean;
};
