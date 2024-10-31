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

import { DatePickerData } from "@/features/DashboardPage/data";
import { NumberFormatter } from "@/utils";

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

type ChartComponentProps = {
  startDate?: Date;
  endDate?: Date;
  label?: string;
  datasets: number[] | string[];
};

export function useChart({
  startDate,
  endDate,
  datasets,
  label,
}: ChartComponentProps) {
  const startMonth = startDate
    ? startDate.toLocaleString("default", { month: "long", year: "numeric" })
    : undefined;
  const endMonth = endDate
    ? endDate.toLocaleString("default", { month: "long", year: "numeric" })
    : undefined;

  const filteredData = DatePickerData.filter((dataItem) => {
    const formattedDataMonth = dataItem.month.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const currentIndex = DatePickerData.findIndex((item) => {
      // Format item.month to a string for comparison
      const formattedItemMonth = item.month.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      return formattedItemMonth === formattedDataMonth; // Add this return statement
    });

    const startIndex =
      startMonth !== undefined
        ? DatePickerData.findIndex(
            (item) =>
              item.month.toLocaleString("default", {
                month: "long",
                year: "numeric",
              }) === startMonth
          )
        : -1; // Default to -1 if startMonth is undefined

    const endIndex =
      endMonth !== undefined
        ? DatePickerData.findIndex(
            (item) =>
              item.month.toLocaleString("default", {
                month: "long",
                year: "numeric",
              }) === endMonth
          )
        : DatePickerData.length;

    return currentIndex >= startIndex && currentIndex <= endIndex;
  });

  // X - axis lable

  const labels = filteredData.map((data) => {
    return data.month.toLocaleString("default", { month: "short" });
  });

  // Data displayed on chart
  // const datasets = filteredData.map((data) => data.total);

  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: label,
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

  return {
    data,
    options,
    filteredData,
  };
}
