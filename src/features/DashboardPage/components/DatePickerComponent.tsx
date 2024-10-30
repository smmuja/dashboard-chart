import { DatePickerData as data } from "@/features/DashboardPage/data";

type DatePickerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
};

export function DatePickerComponent(props: DatePickerProps) {
  const { startDate, endDate, onStartDateChange, onEndDateChange } = props;

  const formatDateToMonthYear = (date?: Date) =>
    date
      ? date.toLocaleString("default", { month: "long", year: "numeric" })
      : "";

  return (
    <>
      <select
        name=""
        id=""
        value={formatDateToMonthYear(startDate)}
        onChange={(e) => onStartDateChange(new Date(e.target.value))}
        className="p-3 m-3 rounded-lg"
      >
        {data.map((data) => (
          <option
            key={formatDateToMonthYear(data.month)}
            value={formatDateToMonthYear(data.month)}
            disabled={endDate && data.month > endDate}
          >
            {formatDateToMonthYear(data.month)}
          </option>
        ))}
      </select>
      <span>~</span>
      <select
        name=""
        id=""
        value={formatDateToMonthYear(endDate)}
        onChange={(e) => onEndDateChange(new Date(e.target.value))}
        className="p-3 m-3 rounded-lg"
      >
        {data.map((data) => (
          <option
            key={formatDateToMonthYear(data.month)}
            value={formatDateToMonthYear(data.month)}
            disabled={startDate && data.month < startDate}
          >
            {formatDateToMonthYear(data.month)}
          </option>
        ))}
      </select>
    </>
  );
}
