"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options: any = {
  plugins: {
    legend: {
      position: "bottom",
      align: "center",
      labels: {
        font: {
          size: 14, // Set the font size
          weight: "bold", // Set the font weight
          lineHeight: 1.2,
        },
        color: "black", // Set the font color
        textAlign: "center",
        usePointStyle: true,
        padding: 20,
        pointStyle: "circle",

        point: {
          radius: 2,
        },
      },
    },
  },

  scales: {
    x: {
      display: false,
    },
  },
};
interface MyLineChartProps {
  bestFitness: number[];
  worstFitness: number[];
  meanFitness: number[];
  firstRecordsAmount: number;
}

const MyLineChart = ({
  bestFitness,
  worstFitness,
  meanFitness,
  firstRecordsAmount = 10,
}: MyLineChartProps) => {
  const showDots = firstRecordsAmount <= 25;
  return (
    <div className=" flex aspect-video w-full items-center justify-center">
      <Line
        options={options}
        data={{
          labels: new Array(firstRecordsAmount).fill("") || [],
          datasets: [
            {
              label: "Середня пристосованість індивідів",
              data: meanFitness,
              backgroundColor: "#eab308",
              borderColor: "#eab308",
              pointRadius: showDots ? 3 : 0,
            },
            {
              label: "Найбільш пристосований індивід",

              data: bestFitness,
              backgroundColor: "#22c55e",
              borderColor: "#22c55e",
              pointRadius: showDots ? 3 : 0,
            },
            {
              label: "Найменш пристосований індивід",

              data: worstFitness,
              backgroundColor: "#ef4444",
              borderColor: "#ef4444",
              pointRadius: showDots ? 3 : 0,
            },
          ],
        }}
      />
    </div>
  );
};

export default MyLineChart;
