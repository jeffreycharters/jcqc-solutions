import { writable } from "svelte/store";

const initialSolutions = [
  { name: "Solution Name", prepDate: "YYYY-MM-DD" }
];

const savedSolutions = JSON.parse(localStorage.getItem("solutions"));
export const solutions = writable(savedSolutions || initialSolutions);
