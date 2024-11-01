//
import { Line } from "react-chartjs-2";
import { useChart } from "@/hooks";
import { MetricsData } from "@/data";

type ChartComponentProps = {
  startDate?: Date;
  endDate?: Date;
  totalView: number[];
};

export function TimespentChartComponent({
  startDate,
  endDate,
}: ChartComponentProps) {
  const timeSpent = MetricsData.map((data) => data.timespent);

  const label = "Timespent chart";
  // const datasets = totalView;

  const { data, options } = useChart({
    startDate,
    endDate,
    label,
    datasets: timeSpent,
  });

  return (
    <>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
