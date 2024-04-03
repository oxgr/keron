import { ViewMode } from "../../types";

export function emptyBlockString(pad: number) {
  const EMPTY_MARKER = "-";
  return "".padStart(pad, EMPTY_MARKER);
}
export function fillArrayTo(
  array: any[] | undefined = [],
  length: number,
  opts: {
    pad: number;
    hex: boolean;
  } = {
    pad: 2,
    hex: true,
  },
): Array<string> {
  if (!array) return Array(length);

  const len = array.length;
  return [
    ...array.map((val) => (!!opts.hex ? toHexString(val) : val)),
    ...Array(length - len).fill(emptyBlockString(opts.pad)),
  ];
}

export function toHexString(val: number): string {
  return val.toString(16).toUpperCase();
}

export function getEnumKeys(target: any) {
  return getEnumObject("keys")(target);
}

export function getEnumValues(target: any) {
  return getEnumObject("values")(target);
}

function getEnumObject(type: "keys" | "values") {
  return (target: typeof ViewMode) =>
    Object[type](target).filter((e) =>
      type === "keys" ? isNaN(parseInt(e)) : !isNaN(parseInt(e)),
    );
}
