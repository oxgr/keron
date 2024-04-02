import * as Tone from "tone";
import { useModel } from "../state/model";

/**
 * Toggle the playback of a single pattern.
 */
export function togglePlaybackPattern() {
  const { model, setModel } = useModel();
  console.log("toggling playback");

  setModel("transport", "playbackActive", (pb) => !pb);
  const pbActive = model.transport.playbackActive;

  console.log("playback:", pbActive);

  if (!!pbActive) {
    loopPlayback();
  } else {
    Tone.Transport.stop();
  }
}

export function loopPlayback() {
  console.log("bpm:", Tone.Transport.bpm.value);
  Tone.Transport.start();
}
