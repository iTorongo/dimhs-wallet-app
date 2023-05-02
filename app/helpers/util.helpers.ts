import { format, parse } from "date-fns";

export enum DateFormats {
  SHORT_DAY_MONTH_YEAR = "dd MMM yy",
  DAY_MONTH_YEAR = "dd MMMM yyyy",
  MONTH_DAY_YEAR = "MMMM dd yyyy",
  YEAR_MONTH_DAY = "yyyy-MM-dd",
  DAYNAME_DAY_MONTH_YEAR = "EEEE dd MMM yyyy",
  ISO = "yyyy-MM-dd'T'HH:mm:ss",
}

export enum TimeFormats {
  SHORT = "HH:mm",
}

export enum DateTimeFormats {
  TIME_DAY_MONTH_YEAR = "HH:mm:ss, dd MMMM yyyy",
  TIME_MONTH_DAY_YEAR = "HH:mm, MMMM dd, yyyy",
  DAY_MONTH_YEAR_TIME = "dd MMMM yyyy, HH:mm",
}

export const capitalizeFirstLetter = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formattedDateTime = (
  value: string,
  displayFormat:
    | DateTimeFormats
    | DateFormats
    | TimeFormats = DateTimeFormats.TIME_DAY_MONTH_YEAR
): string => {
  const parsedTime = new Date(value);
  return value && format(parsedTime, displayFormat);
};

export const getSchemaDetailsFromId = (str: string) => {
  const arr = str.split(":");
  return arr;
};
