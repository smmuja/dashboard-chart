import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  CategoryScale,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { DatePickerData } from "@/features/DashboardPage/data";
import { NumberFormatter } from "../utils/numberFormatter";

ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

export function ChartComponent() {
  // X - axis lable
  const labels = DatePickerData.map((data) => data.month.slice(0, 3));

  // Data displayed on chart
  const datasets = DatePickerData.map(
    // (data) => data.total.toLocaleString()
    (data) => data.total
  );

  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "Total number of crackers",
        data: datasets,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Axis configuration
  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        title: {
          display: false,
          text: "Total",
        },
        display: true,
        min: 10,
        ticks: {
          callback: (value: string | number) => {
            const numericValue =
              typeof value === "number" ? value : parseFloat(value);
            return NumberFormatter(numericValue);
          },
        },
      },
      x: {
        title: {
          display: false,
          text: "Month",
        },
        display: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const value = (context.parsed.y as number) || 0;
            return `Value: ${NumberFormatter(value)}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
