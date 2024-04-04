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
  const instruments = [
    new Tone.MembraneSynth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.NoiseSynth().toDestination(),
    new Tone.PluckSynth().toDestination(),
  ];
  setModel("bank", "instruments", instruments);
}
