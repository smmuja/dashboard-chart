export function formatMonthYear(date?: Date): string | undefined {
  return date
    ? date.toLocaleString("default", { month: "long", year: "numeric" })
    : undefined;
}

export function formatMonthShort(date?: Date): string | undefined {
  return date ? date.toLocaleString("default", { month: "short" }) : undefined;
}
