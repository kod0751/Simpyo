export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatRangeLabel(checkIn: string, checkOut: string): string {
  const from = parseDateKey(checkIn);
  const to = parseDateKey(checkOut);
  return `${from.getMonth() + 1}.${from.getDate()} - ${to.getMonth() + 1}.${to.getDate()}`;
}
