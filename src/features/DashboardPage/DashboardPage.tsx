import { DashboardLayout } from "@/layouts";

import { DatePickerComponent, ChartComponent } from "./components";
import { useState } from "react";
import { MetricsData } from "@/data";
import { MetricsCard } from "./components/MetricsCard";
import { MetricsCardAside } from "./components/MetricsCardAside";
import { formatMonthYear } from "@/utils";

export function DashboardPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    MetricsData[0].month
  ); // default to first month
  const [endDate, setEndDate] = useState<Date | undefined>(
    MetricsData[MetricsData.length - 1].month
  ); // default to last month

  const [selectedData, setSelectedData] = useState<{
    cracker: number;
    view: number;
    click: number;
    timespent: number;
    month: Date;
  } | null>(null);

  const cumulativeData = MetricsData.reduce(
    (acc, dataItem) => {
      const month = dataItem.month;
      if (
        (!startDate || month >= startDate) &&
        (!endDate || month <= endDate)
      ) {
        return {
          cracker: acc.cracker + dataItem.cracker,
          view: acc.view + dataItem.view,
          click: acc.click + dataItem.click,
          timespent: acc.timespent + dataItem.timespent,
        };
      }
      return acc;
    },
    { cracker: 0, view: 0, click: 0, timespent: 0 }
  );

  const previousData = MetricsData.reduce(
    (acc, dataItem) => {
      const month = dataItem.month;
      if (startDate && month < startDate) {
        return {
          cracker: acc.cracker + dataItem.cracker,
          view: acc.view + dataItem.view,
          click: acc.click + dataItem.click,
          timespent: acc.timespent + dataItem.timespent,
        };
      }
      return acc;
    },
    { cracker: 0, view: 0, click: 0, timespent: 0 }
  );

  const calculatePercentageChange = (current: number, previous: number) =>
    previous > 0 ? ((current - previous) / previous) * 100 : null;

  const percentageChange = {
    cracker: calculatePercentageChange(
      cumulativeData.cracker,
      previousData.cracker
    ),
    view: calculatePercentageChange(cumulativeData.view, previousData.view),
    click: calculatePercentageChange(cumulativeData.click, previousData.click),
    timespent: calculatePercentageChange(
      cumulativeData.timespent,
      previousData.timespent
    ),
  };

  return (
    <>
      <DashboardLayout>
        <div>
          <DatePickerComponent
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>
        <MetricsCard
          data={cumulativeData}
          percentageChange={percentageChange}
        />
        <div className="flex flex-row w-full bg-gray-100 rounded-xl mt-5 p-3">
          <ChartComponent
            setSelectedData={setSelectedData}
            startDate={startDate}
            endDate={endDate}
          />
          <div>
            <p>
              {selectedData?.month
                ? formatMonthYear(selectedData?.month)
                : "Month Year"}
            </p>

            <MetricsCardAside data={selectedData} />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
