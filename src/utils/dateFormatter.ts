export function formatMonthYear(date?: Date): string | undefined {
  return date
    ? date.toLocaleString("default", { month: "long", year: "numeric" })
    : undefined;
}

export function formatMonthShort(date?: Date): string | undefined {
  return date ? date.toLocaleString("default", { month: "short" }) : undefined;
}

export function formatDateDay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const formattedDateParts = date
    .toLocaleDateString("en-GB", options)
    .split(" ");
  const weekday = formattedDateParts[0];
  const day = formattedDateParts[1];
  const month = formattedDateParts[2];

  return `${weekday}, ${day} ${month}`;
}
