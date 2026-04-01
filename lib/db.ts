import {
  AlarmRespType,
  FuelAlertType,
  SensorType,
} from "@/modules/dashboard/types/SensorType";
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "iot-db-cache";
const STORE_POSITION = "positions";
const STORE_ALERT = "alerts";
const MAX = 50;

let dbInstance: Promise<IDBPDatabase> | null = null;

const getDB = () => {
  if (typeof window === "undefined") {
    return null; // evita SSR
  }

  if (!dbInstance) {
    dbInstance = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_POSITION)) {
          db.createObjectStore(STORE_POSITION, {
            keyPath: "id",
          });
        }
        if (!db.objectStoreNames.contains(STORE_ALERT)) {
          db.createObjectStore(STORE_ALERT, {
            keyPath: "id",
          });
        }
      },
    });
  }

  return dbInstance;
};

// ===================== Position =============================
export const savePosition = async (position: SensorType) => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  const all = await getPositions();

  if (all.length >= MAX) {
    await clearPositions();
  }

  const objToSave = {
    ...position,
    id: position.id || crypto.randomUUID(),
    createdAt: position.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.put(STORE_POSITION, objToSave);
};

export const getPositions = async (): Promise<SensorType[]> => {
  const dbPromise = getDB();
  if (!dbPromise) return [];

  const db = await dbPromise;
  return (await db.getAll(STORE_POSITION)) as SensorType[];
};

export const clearPositions = async () => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  await db.clear(STORE_POSITION);
};

// ================= Alerts =================================
export const saveAlerts = async (alerts: AlarmRespType) => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  const all = await getAlerts();

  if (all.length >= MAX) {
    await clearAlerts();
  }

  const objToSave = {
    ...alerts,
    id: alerts.Id || crypto.randomUUID(),
    createdAt: alerts.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.put(STORE_ALERT, objToSave);
};

export const getAlerts = async (): Promise<AlarmRespType[]> => {
  const dbPromise = getDB();
  if (!dbPromise) return [];

  const db = await dbPromise;
  return (await db.getAll(STORE_ALERT)) as AlarmRespType[];
};

export const clearAlerts = async () => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  await db.clear(STORE_ALERT);
};
