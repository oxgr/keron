import * as Tone from "tone";
import { ViewMode } from "../types";
import { useModel } from "../state/ModelProvider";
import { useAudioModel } from "./AudioModelProvider";
import { positionToLine } from "./utils";

export function onMountAudio(element: HTMLElement) {
  // TODO: Find a way to remove the other when one is triggered.
  element.addEventListener("click", enableAudioContext, { once: true });
  element.addEventListener("keydown", enableAudioContext, { once: true });

  Tone.Transport.scheduleRepeat((time) => {
    audioEffect();
  }, "16n");
}

export function audioEffect() {
  const { model, setModel } = useModel();
  const { audio, setAudio } = useAudioModel();

  const transport = audio.global.transport;
  const position = transport.position;
  const activeLineNumber = positionToLine(position);
  // console.log(activeLineNumber, position);
  const playheadLine = (() => {
    switch (model.view.mode) {
      case ViewMode.Phrase:
        return activeLineNumber;
      case ViewMode.Chain:
        return Math.floor(activeLineNumber / 16);
      default:
        return 0;
    }
  })();

  setAudio("global", "position", position);
  setModel("view", "playhead", "line", playheadLine);
}

async function enableAudioContext() {
  const { audio, setAudio } = useAudioModel();

  await Tone.start();
  setAudio("ready", true);
  console.log("audio is ready");

  const lowpass = new Tone.Filter(1000, "lowpass");
  const reverb = new Tone.Reverb();
  const compressor = new Tone.Compressor(-18);
  audio.global.destination.chain(lowpass, reverb, compressor);
  audio.global.destination.volume.value = -30;
}
