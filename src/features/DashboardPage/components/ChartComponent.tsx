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
import { DatePickerData } from "../data";
import { formatMonthShort, formatMonthYear, NumberFormatter } from "@/utils";

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
};

export function ChartComponent({ startDate, endDate }: ChartComponentProps) {
  const startMonth = startDate ? formatMonthYear(startDate) : undefined;

  const endMonth = endDate ? formatMonthYear(endDate) : undefined;

  const filteredData = DatePickerData.filter((dataItem) => {
    const formattedDataMonth = formatMonthYear(dataItem.month);

    const currentIndex = DatePickerData.findIndex((item) => {
      const formattedItemMonth = formatMonthYear(item.month);

      return formattedItemMonth === formattedDataMonth;
    });

    const startIndex =
      startMonth !== undefined
        ? DatePickerData.findIndex(
            (item) => formatMonthYear(item.month) === startMonth
          )
        : -1; // Default to -1 if startMonth is undefined

    const endIndex =
      endMonth !== undefined
        ? DatePickerData.findIndex(
            (item) => formatMonthYear(item.month) === endMonth
          )
        : DatePickerData.length;

    return currentIndex >= startIndex && currentIndex <= endIndex;
  });

  // X - axis lable
  const labels = filteredData.map((data) => {
    return formatMonthShort(data.month);
  });

  // Data displayed on chart
  const datasets = filteredData.map((data) => data.total);

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
