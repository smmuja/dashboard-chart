import { ReactNode } from "react";
import { DashboardHeader, Sidebar } from "@/layouts/dashboardLayout/components";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <>
      <div className="flex flex-row p-3 m-3 gap-3">
        <Sidebar />
        <div className="lg:w-4/6">
          <div>
            <DashboardHeader />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
