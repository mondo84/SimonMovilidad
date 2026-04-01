import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { LineType } from "@/modules/dashboard/types/LineType";
ChartJS.register(...registerables);

type LineCharJsType = {
  speedData: LineType[];
  label?: string;
  lineColor?: string;
  fill?: boolean;
};

const LineCharJs = ({
  speedData,
  label,
  lineColor = "rgb(75, 114, 192)",
  fill = false,
}: LineCharJsType) => {
  const createChartDataSpeed = (label: string, chartPoints: LineType[]) => ({
    labels: chartPoints.map((p) => p.label),
    datasets: [
      {
        label,
        data: chartPoints.map((p) => p.value),
        borderWidth: 2,
        tension: 0.3, // suaviza la línea
        borderColor: lineColor,
        fill,
      },
    ],
  });

  return (
    <>
      <Line
        className="w-full h-full"
        data={createChartDataSpeed(label ?? "", speedData)}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </>
  );
};

export default LineCharJs;
