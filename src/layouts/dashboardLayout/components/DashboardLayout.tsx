import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <>
      <div className="flex flex-row p-3 m-3 gap-3">
        <Sidebar />
        <div className="w-4/6">{children}</div>
      </div>
    </>
  );
}
