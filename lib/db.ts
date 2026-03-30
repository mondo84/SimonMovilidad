import {
  FuelAlertType,
  SensorType,
} from "@/modules/dashboard/types/SensorType";
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "iot-db-cache";
const STORE_POSITION = "positions";
const STORE_ALERT = "alerts";
const MAX = 50;

let dbInstance: Promise<IDBPDatabase> | null = null;

// 🔥 Inicialización segura (solo cliente)
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

  await db.add(STORE_POSITION, {
    ...position,
    createdAt: new Date(),
  });
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
export const saveAlerts = async (alerts: FuelAlertType) => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  const all = await getAlerts();

  if (all.length >= MAX) {
    await clearAlerts();
  }

  await db.add(STORE_ALERT, {
    ...alerts,
    createdAt: new Date(),
  });
};

export const getAlerts = async (): Promise<FuelAlertType[]> => {
  const dbPromise = getDB();
  if (!dbPromise) return [];

  const db = await dbPromise;
  return (await db.getAll(STORE_ALERT)) as FuelAlertType[];
};

export const clearAlerts = async () => {
  const dbPromise = getDB();
  if (!dbPromise) return;

  const db = await dbPromise;
  await db.clear(STORE_ALERT);
};
