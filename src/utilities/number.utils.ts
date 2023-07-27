const ConvertToPersianCurrency = (value: number) =>
  value.toLocaleString("fa-IR");

const convertToPersianNumber = (value: number) =>
  value.toLocaleString("fa-IR", { useGrouping: false }).toString().replace(/٫/g, ".");

export { ConvertToPersianCurrency, convertToPersianNumber };
