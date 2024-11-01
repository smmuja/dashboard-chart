import { minuteSecondFormat, NumberFormatter } from "@/utils";
import { useRouter } from "next/router";

const metrics = [
  { label: "Total Cackers", key: "cracker" },
  { label: "Total Views", key: "view" },
  { label: "Total Clicks", key: "click" },
  { label: "Total Timespent", key: "timespent" },
];

type SelectedData = {
  cracker: number | null;
  view: number | null;
  click: number | null;
  timespent: number | null;
};

type SelectedDataKeys = keyof SelectedData;

type SelectedDataCardProps = {
  data: SelectedData | null;
};

export function MetricsCard({ data }: SelectedDataCardProps) {
  const router = useRouter();

  const handleMetricClick = (metric: SelectedDataKeys) => {
    router.push({
      pathname: "/dashboard",
      query: { chart: metric },
    });
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const isActive = router.query.chart === metric.key;

          const value =
            metric.key === "cracker"
              ? data?.cracker
              : data?.[metric.key as SelectedDataKeys];

          const formattedValue =
            metric.key === "timespent" && value !== null
              ? minuteSecondFormat(value ?? 0)
              : value !== null
              ? NumberFormatter(value ?? 0)
              : null;
          return (
            <div
              key={metric.key}
              className={`${
                isActive ? "bg-indigo-100" : "bg-gray-100"
              }  p-5 rounded-xl hover:cursor-pointer`}
              onClick={() => handleMetricClick(metric.key as SelectedDataKeys)}
            >
              <p>{metric.label}</p>
              {/* <p>{data?.total}</p>
              <p>{data?.view}</p>
              <p>{data?.click}</p>
              <p>{data?.timespent}</p> */}
              <p>{formattedValue}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
