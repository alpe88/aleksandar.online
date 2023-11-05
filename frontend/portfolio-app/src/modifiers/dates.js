export function getMonthYear(dateString) {
  const [m, y] = dateString.split("/");
  return { month: parseInt(m) - 1, year: parseInt(y) };
}

export function getDate({ month, year }) {
  return new Date(year, month);
}
