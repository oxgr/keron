import * as Tone from "tone";
import { useModel } from "../state/model";

export function initAudio() {
  const { setModel } = useModel();

  async function startAudio() {
    await Tone.start();
    console.log("audio is ready");
  }

  // TODO: Find a way to remove the other when one is triggered.
  document.addEventListener("click", startAudio, { once: true });
  document.addEventListener("keydown", startAudio, { once: true });

  // add our instruments
  const synth = new Tone.Synth().toDestination();
  setModel("bank", "instruments", (ins) => [...ins, synth]);
}
