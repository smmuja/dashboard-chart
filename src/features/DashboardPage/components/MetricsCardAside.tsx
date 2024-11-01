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

export function MetricsCardAside({ data }: SelectedDataCardProps) {
  const router = useRouter();

  const handleMetricClick = (metric: SelectedDataKeys) => {
    router.push({
      pathname: "/dashboard",
      query: { chart: metric },
    });
  };

  return (
    <>
      <div className="flex flex-col items-start gap-1 ">
        {metrics.map((metric) => {
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
              className={`bg-white m-1 p-2 rounded-xl flex flex-col justify-between gap-1`}
              onClick={() => handleMetricClick(metric.key as SelectedDataKeys)}
            >
              <p className="text-xs text-gray-500">{`Total number of ${metric.key}s`}</p>
              <p className="font-medium">{formattedValue}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
