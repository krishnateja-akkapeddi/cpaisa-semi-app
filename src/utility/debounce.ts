export const debounce = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
