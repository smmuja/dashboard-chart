import { minuteSecondFormat, NumberFormatter } from "@/utils";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";

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

  const getIcon = (key: string) => {
    switch (key) {
      case "cracker":
        return <FiTarget />;
      case "view":
        return <FaEye />;
      case "click":
        return <FaArrowPointer />;
      case "timespent":
        return <LuClock4 />;
      default:
        return null;
    }
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
                isActive
                  ? "bg-gradient-to-b from-violet-200 via-violet-100 to-gray-100z"
                  : "bg-gray-100"
              } shadow-md p-5 gap-5 rounded-xl hover:cursor-pointer flex flex-col justify-between`}
              onClick={() => handleMetricClick(metric.key as SelectedDataKeys)}
            >
              <p className="text-sm text-gray-700">{metric.label}</p>
              <div className="flex flex-row justify-between">
                <p className="font-semibold">{formattedValue}</p>
                <div
                  className={`${
                    isActive
                      ? "bg-white text-black "
                      : "bg-gray-300 text-white "
                  }w-fit p-3 rounded-xl`}
                >
                  {getIcon(metric.key)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
