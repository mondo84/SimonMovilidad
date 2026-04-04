export const syncApp = async (showInactive = true) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `/api/dashboard/sync?date=${date}&showInactive=${showInactive}`,
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
