import { DashboardLayout } from "@/layouts";

import {
  DatePickerComponent,
  ViewChartComponent,
} from "./DashboardPage/components";
import { useState } from "react";
import { DatePickerData } from "./DashboardPage/data";

export function ViewDashboardPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(
    DatePickerData[0].month
  ); // default to first month
  const [endDate, setEndDate] = useState<Date | undefined>(
    DatePickerData[DatePickerData.length - 1].month
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
          <ViewChartComponent
            startDate={startDate}
            endDate={endDate}
            totalView={[]}
          />
        </div>
      </DashboardLayout>
    </>
  );
}
