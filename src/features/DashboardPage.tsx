import { DashboardLayout } from "@/layouts";

import {
  DatePickerComponent,
  ChartComponent,
} from "./DashboardPage/components";

export function DashboardPage() {
  return (
    <>
      <DashboardLayout>
        <div>
          <DatePickerComponent />
        </div>
        <div>
          <ChartComponent />
        </div>
      </DashboardLayout>
    </>
  );
}
