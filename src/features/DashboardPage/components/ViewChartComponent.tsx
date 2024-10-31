//
import { Line } from "react-chartjs-2";
import { useChart } from "@/hooks";
import { DatePickerData } from "../data";

type ChartComponentProps = {
  startDate?: Date;
  endDate?: Date;
  totalView: number[];
};

export function ViewChartComponent({
  startDate,
  endDate,
}: ChartComponentProps) {
  const totalView = DatePickerData.map((data) => data.view);

  const label = "View chart";
  // const datasets = totalView;

  const { data, options } = useChart({
    startDate,
    endDate,
    label,
    datasets: totalView,
  });

  return (
    <>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
}
