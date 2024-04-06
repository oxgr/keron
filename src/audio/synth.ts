import { Time } from "tone/build/esm/core/type/Units";
import { Line } from "../types";
import { useAudioModel } from "./init";
import { InstrumentTypes } from "./types";
import { useModel } from "../state/model";

export function playNote(time: Time, line: Line) {
  const { audio } = useAudioModel();
  const { model, setModel } = useModel();

  if (!line.note || !line.octave || !line.velocity || !line.instrument) return;

  const DURATION = "8n";
  const fullNote = line.note + line.octave;

  const instrument = model.project.bank.instruments[line.instrument];
  const instrumentEngine = audio.instrumentEngines[instrument.type];
  console.log({ line, type: instrument.type });
  instrumentEngine.triggerAttackRelease(
    fullNote,
    DURATION,
    time,
    line.velocity,
  );
}
