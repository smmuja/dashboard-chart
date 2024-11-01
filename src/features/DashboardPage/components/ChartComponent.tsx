import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  CategoryScale,
  ChartOptions,
  ChartData,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { DatePickerData } from "../data";
import { formatMonthShort, formatMonthYear, NumberFormatter } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/router";

ChartJS.register(
  LineElement,
  BarElement,
  BarController,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

type SelectedDataProps = {
  cracker: number | null;
  view: number | null;
  click: number | null;
  timespent: number | null;
  month: Date;
};

type ChartComponentProps = {
  startDate?: Date;
  endDate?: Date;
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      cracker: number;
      view: number;
      click: number;
      timespent: number;
      month: Date;
    } | null>
  >;
};

export function ChartComponent({
  startDate,
  endDate,
  setSelectedData,
}: ChartComponentProps) {
  const router = useRouter();

  const selectedMetric =
    (router.query.chart as keyof SelectedDataProps) || "cracker"; // default to cracker when no metric card selected

  const [clickedPointIndex, setClickedPointIndex] = useState<number | null>(
    null
  );

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
  // const lineData = filteredData.map((data) => data.total);

  // to show metrics conditionally based on metrics card clicked
  const lineData = filteredData.map((data) => data[selectedMetric] as number);

  const barData = lineData.map((value, index) =>
    index === clickedPointIndex ? value : null
  );

  const data: ChartData<"line" | "bar"> = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        type: "line" as const,
        label: `Total number of ${selectedMetric}s`,
        data: lineData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(52,152,219,0.4)",
        pointBackgroundColor: (context: { dataIndex: number }) => {
          return context.dataIndex === clickedPointIndex
            ? "rgb(100, 100, 255)" // Color for clicked point
            : "rgb(75, 192, 192)"; // Default color
        },
        pointBorderColor: "rgb(75, 192, 192)",
        pointHoverBackgroundColor: "rgb(255, 99, 132)",
        pointRadius: (context: { dataIndex: number }) => {
          return context.dataIndex === clickedPointIndex ? 8 : 4;
        },
      },
      {
        type: "bar" as const,
        label: "Clicked Point (Bar)",
        data: barData as (number | null)[],
        backgroundColor: "rgba(100, 100, 255, 0.5)",
        // borderColor: "rgb(255, 99, 132)",
        borderColor: "transparent",
        borderRadius: 25,
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  // Axis configuration
  const options: ChartOptions<"line" | "bar"> = {
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
    onClick: (event, elements) => {
      if (elements.length) {
        const index = elements[0].index;
        setClickedPointIndex((prevIndex) =>
          prevIndex === index ? null : index
        );

        const dataItem = filteredData[index];
        if (dataItem) {
          setSelectedData(dataItem);
        } else {
          setSelectedData(null);
        }
      }
    },
  };

  return (
    <>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Chart type="line" data={data} options={options} />
      </div>
    </>
  );
}
