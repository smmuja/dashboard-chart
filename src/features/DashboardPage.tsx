import { DashboardLayout } from "@/layouts";

import {
  DatePickerComponent,
  ChartComponent,
} from "./DashboardPage/components";
import { useState } from "react";
import { MetricsData } from "@/data";
import { MetricsCard } from "./DashboardPage/components/MetricsCard";
import { MetricsCardAside } from "./DashboardPage/components/MetricsCardAside";
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
        <MetricsCard data={cumulativeData} />
        <div className="flex flex-row w-full bg-gray-100 rounded-xl mt-5 p-3">
          {/* <div className="flex flex-row w-full "> */}
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
          {/* </div> */}
        </div>
      </DashboardLayout>
    </>
  );
}
