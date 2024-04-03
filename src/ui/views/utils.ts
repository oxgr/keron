export function emptyBlockString(pad: number) {
  const EMPTY_MARKER = "-";
  return "".padStart(pad, EMPTY_MARKER);
}
export function fillArrayTo(
  array: any[] | undefined = [],
  length: number,
  pad: number = 2,
): Array<string> {
  if (!array) return Array(length);

  const len = array.length;
  return [
    ...array.map((val) => toHexString(val)),
    ...Array(length - len).fill(emptyBlockString(pad)),
  ];
}

export function toHexString(val: number): string {
  return val.toString(16).toUpperCase();
}
