import { DashboardLayout } from "@/layouts";

export function Page404Component() {
  return (
    <>
      <DashboardLayout>
        <div className="h-screen flex flex-col text-center justify-center items-center">
          <p className="text-5xl text-gray-500">Nothing found</p>
        </div>
      </DashboardLayout>
    </>
  );
}
