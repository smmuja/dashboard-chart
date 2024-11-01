import { DashboardLayout } from "@/layouts";

import { DatePickerComponent } from "../DashboardPage/components";
import { useState } from "react";
import { MetricsData } from "@/data";
import { TimespentChartComponent } from "../DashboardPage/components";

export function CrackerPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    MetricsData[0].month
  ); // default to first month
  const [endDate, setEndDate] = useState<Date | undefined>(
    MetricsData[MetricsData.length - 1].month
  ); // default to last month

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
        <div>
          <TimespentChartComponent
            startDate={startDate}
            endDate={endDate}
            totalView={[]}
          />
        </div>
      </DashboardLayout>
    </>
  );
}
