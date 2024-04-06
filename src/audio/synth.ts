import { Time } from "tone/build/esm/core/type/Units";
import { Line } from "../types";
import { useAudioModel } from "./init";

export function playNote(time: Time, line: Line) {
  const { audio } = useAudioModel();

  const { note, octave, velocity, instrument } = line;
  if (!note || !octave || !velocity || !instrument) return;

  const DURATION = "8n";
  const fullNote = note + octave;

  audio.instrumentEngines[instrument].triggerAttackRelease(
    fullNote,
    DURATION,
    time,
    velocity,
  );
}
