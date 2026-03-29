import {
  FuelAlertType,
  NewPosition,
} from "@/app/components/LeafletMap/LeafletMap";
import { openDB } from "idb";

const DB_NAME = "iot-db-cache";
const STORE_POSITION = "positions";
const STORE_ALERT = "alerts";
const MAX = 50;

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_POSITION)) {
      db.createObjectStore(STORE_POSITION, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
    if (!db.objectStoreNames.contains(STORE_ALERT)) {
      db.createObjectStore(STORE_ALERT, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

// ===================== Position =============================
export const savePosition = async (position: NewPosition) => {
  const db = await dbPromise;
  const all = await getPositions();

  if (all.length >= MAX) {
    await clearPositions();
  }

  await db.add("positions", {
    ...position,
    createdAt: new Date(),
  });
};

export const getPositions = async () => {
  const db = await dbPromise;
  return (await db.getAll("positions")) as NewPosition[];
};

export const clearPositions = async () => {
  const db = await dbPromise;
  await db.clear("positions");
};

// ================= Alerts =================================
export const saveAlerts = async (alerts: FuelAlertType) => {
  const db = await dbPromise;
  const all = await getAlerts();

  if (all.length >= MAX) {
    await clearAlerts();
  }

  await db.add("alerts", {
    ...alerts,
    createdAt: new Date(),
  });
};

export const getAlerts = async () => {
  const db = await dbPromise;
  return await db.getAll("alerts");
};

export const clearAlerts = async () => {
  const db = await dbPromise;
  await db.clear("alerts");
};
