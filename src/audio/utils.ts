import { Time } from "tone/build/esm/core/type/Units";

export function lineToPosition(index: number) {
  const bars = Math.floor(index / 16);
  const beats = Math.floor(index / 4);
  const sixts = index % 4;

  const position = `${bars}:${beats}:${sixts}`;
  return position;
}

export function positionToLine(position: Time): number {
  const pos = position;
  const comps = pos.toString().split(":");
  const bars = Number(comps[0]);
  const beats = Number(comps[1]);
  const sixts = Number(comps[2].split(".")[0]);
  const line = bars * 16 + beats * 4 + sixts;

  return line;
}
