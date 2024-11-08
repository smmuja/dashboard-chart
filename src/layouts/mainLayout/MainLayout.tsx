import { ReactNode } from "react";
import { Sidebar } from "@/layouts/components";

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <>
      <div className="flex flex-row p-3 m-3 gap-3">
        <Sidebar />
        <div className="md:w-4/6">{children}</div>
      </div>
    </>
  );
}
