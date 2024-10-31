import { DashboardLayout } from "@/layouts";

import {
  DatePickerComponent,
  ChartComponent,
} from "./DashboardPage/components";
import { useState } from "react";
import { DatePickerData } from "./DashboardPage/data";
import { MetricsCard } from "./DashboardPage/components/MetricsCard";
import { MetricsCardAside } from "./DashboardPage/components/MetricsCardAside";
import { formatMonthYear } from "@/utils";

export function DashboardPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    DatePickerData[0].month
  ); // default to first month
  const [endDate, setEndDate] = useState<Date | undefined>(
    DatePickerData[DatePickerData.length - 1].month
  ); // default to last month

  const [selectedData, setSelectedData] = useState<{
    total: number;
    view: number;
    click: number;
    timespent: number;
    month: Date;
  } | null>(null);

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
        <MetricsCard data={selectedData} />
        <div className="flex flex-row w-full bg-gray-100 rounded-xl mt-5 p-3">
          {/* <div className="flex flex-row w-full "> */}
          <ChartComponent
            setSelectedData={setSelectedData}
            startDate={startDate}
            endDate={endDate}
          />
          <div>
            <p>{formatMonthYear(selectedData?.month)}</p>

            <MetricsCardAside data={selectedData} />
          </div>
          {/* </div> */}
        </div>
      </DashboardLayout>
    </>
  );
}
