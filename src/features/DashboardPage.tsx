import { DashboardLayout } from "@/layouts";

import {
  DatePickerComponent,
  ChartComponent,
} from "./DashboardPage/components";
import { useState } from "react";
import { DatePickerData } from "./DashboardPage/data";
import { MetricsCard } from "./DashboardPage/components/MetricsCard";

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
        <div>
          <ChartComponent
            setSelectedData={setSelectedData}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </DashboardLayout>
    </>
  );
}
