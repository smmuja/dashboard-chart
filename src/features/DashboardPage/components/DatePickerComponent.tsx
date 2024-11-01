import { MetricsData as data } from "@/data";
import { formatMonthYear } from "@/utils";

type DatePickerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
};

export function DatePickerComponent(props: DatePickerProps) {
  const { startDate, endDate, onStartDateChange, onEndDateChange } = props;

  return (
    <>
      <select
        name=""
        id=""
        value={formatMonthYear(startDate)}
        onChange={(e) => onStartDateChange(new Date(e.target.value))}
        className="p-3 m-3 rounded-lg"
      >
        {data.map((data) => (
          <option
            key={formatMonthYear(data.month)}
            value={formatMonthYear(data.month)}
            disabled={endDate && data.month > endDate}
          >
            {formatMonthYear(data.month)}
          </option>
        ))}
      </select>
      <span>~</span>
      <select
        name=""
        id=""
        value={formatMonthYear(endDate)}
        onChange={(e) => onEndDateChange(new Date(e.target.value))}
        className="p-3 m-3 rounded-lg"
      >
        {data.map((data) => (
          <option
            key={formatMonthYear(data.month)}
            value={formatMonthYear(data.month)}
            disabled={startDate && data.month < startDate}
          >
            {formatMonthYear(data.month)}
          </option>
        ))}
      </select>
    </>
  );
}
