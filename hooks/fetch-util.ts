type RespSyncApp = {
  data: [];
  errors: [];
  message: "Historial sensor";
  status: 200;
  success: true;
  token: "";
};

export const syncApp = async (showInactive = true) => {
  try {
    const res = await fetch(
      `/api/dashboard/sync?showInactive=${showInactive}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) throw new Error("Error sincronizando app");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// const updateFromBackend = async () => {
//   try {
//     // Traer datos reales del backend
//     const backendData: SensorType[] = await fetchSensorDataFromBackend(
//       sessionData?.accessToken,
//     );
//     if (!backendData || backendData.length === 0) return;

//     // Guardar los datos en IndexedDB junto con los existentes
//     const cached = await getPositions();
//     const combined = [...cached, ...backendData];

//     await savePositions(combined);

//     // Actualizar estado React
//     const last = combined[combined.length - 1];
//     setPosition([last.Lat, last.Long]);
//     setSensorData(combined);
//   } catch (error) {
//     console.error("Error al sincronizar desde backend:", error);
//   }
// };
