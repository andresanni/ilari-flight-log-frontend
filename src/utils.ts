import { Weather, Visibility } from "./types";

//predicates
const isWeather = (input: string): input is Weather => {
  return Object.values(Weather)
    .map((value) => value.toString())
    .includes(input);
};
const isVisibility = (input: string): input is Visibility => {
  return Object.values(Visibility)
    .map((value) => value.toString())
    .includes(input);
};
const isString = (input: unknown): input is string => {
  return typeof input === "string" || input instanceof String;
};

//parsers
export const parseWeather = (value: unknown): Weather => {
  if (!(isString(value) && isWeather(value))) {
    throw new Error("Invalid weather");
  }
  return value;
};
export const parseVisibility = (value: unknown): Visibility => {
  if (!(isString(value) && isVisibility(value))) {
    throw new Error("Invalid visibility");
  }
  return value;
};

