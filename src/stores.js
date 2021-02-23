import { writable } from "svelte/store";

const initialSolutions = [
  { name: "ICPMS Rinse", prepDate: "2020-01-01" },
  { name: "ICPMS Diluent", prepDate: "2020-01-01" },
  { name: "ICPMS iSTD", prepDate: "2020-01-01" }
];

const savedSolutions = JSON.parse(localStorage.getItem("solutions"));
export const solutions = writable(savedSolutions || initialSolutions);
