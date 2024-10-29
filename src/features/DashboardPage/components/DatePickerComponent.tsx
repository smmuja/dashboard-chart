import { DatePickerData as data } from "@/features/DashboardPage/data";

export function DatePickerComponent() {
  return (
    <>
      <select name="" id="" className="p-3 m-3 rounded-lg">
        {data.map((data) => (
          <option key={data.month} value={data.month}>
            {data.month}
          </option>
        ))}
      </select>
      <span>~</span>
      <select name="" id="" className="p-3 m-3 rounded-lg">
        {data.map((data) => (
          <option key={data.month} value={data.month}>
            {data.month}
          </option>
        ))}
      </select>
    </>
  );
}
