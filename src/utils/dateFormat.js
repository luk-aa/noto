export function getFormattedDateParts(dateInput = new Date()) {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = date.getFullYear();

  return { day, month, year };
}
