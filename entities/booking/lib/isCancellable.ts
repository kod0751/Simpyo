export function isCancellable(checkIn: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkInDate = new Date(checkIn);
  checkInDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return diffDays >= 2;
}
