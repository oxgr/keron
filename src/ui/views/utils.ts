const EMPTY_VALUE = "--";

export function fillArrayTo(
  array: any[] | undefined = [],
  length: number,
): string[] {
  if (!array) return Array(length).fill(EMPTY_VALUE);

  const len = array.length;
  return [
    ...array.map((val) => toHexString(val)),
    ...Array(length - len).fill("--"),
  ];
}

export function toHexString(val: number): string {
  return val?.toString(16).toUpperCase() ?? EMPTY_VALUE;
}
