import { Time } from "tone/build/esm/core/type/Units";

export function lineIndexToNotation(index: number) {
  const beats = Math.floor(index * 0.25);
  const sixts = index % 4;
  return `${beats}:${sixts}`;
}

export function positionToLine(position: Time): number {
  const pos = position;
  const comps = pos.toString().split(":");
  const bars = Number(comps[0]);
  const beats = Number(comps[1]);
  const sixts = Number(comps[2].split(".")[0]);
  const line = bars * 16 + beats * 4 + sixts;

  console.log(bars, beats, sixts, ":", line);

  return line;
}
