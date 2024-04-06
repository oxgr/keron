import { Time } from "tone/build/esm/core/type/Units";
import { useAudioModel } from "./init";
import { PlaybackLine } from "./transport";

export function playNote(time: Time, playbackLine: PlaybackLine) {
  const { audio } = useAudioModel();

  const line = playbackLine.line;
  if (!line.note || !line.octave || !line.velocity || !line.instrument) return;

  const DURATION = "8n";
  const fullNote = line.note + line.octave;

  const instrumentEngine =
    audio.instrumentEngines[playbackLine.instrument.type];
  // console.log({ line, type: instrument.type });
  instrumentEngine.triggerAttackRelease(
    fullNote,
    DURATION,
    time,
    line.velocity,
  );
}
