import { MetricsData as data } from "@/data";
import { formatMonthYear } from "@/utils";
import { GoCalendar } from "react-icons/go";

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
      <div className="flex flex-row justify-end">
        <div className="flex flex-row items-center justify-end border rounded-xl border-gray-400 px-3 m-3 w-fit">
          <p>Range: </p>
          <div className="flex flex-row items-center px-3">
            <GoCalendar />
            <select
              name=""
              id=""
              value={formatMonthYear(startDate)}
              onChange={(e) => onStartDateChange(new Date(e.target.value))}
              className="p-3 m-3 rounded-lg bg-white "
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
              className="p-3 m-3 rounded-lg bg-white "
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
          </div>
        </div>
      </div>
    </>
  );
}
