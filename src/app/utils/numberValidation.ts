export function isValidNumber(param: any): boolean {
  return typeof param === "number" && !Number.isNaN(param);
}
