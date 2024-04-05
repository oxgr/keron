import * as Tone from "tone";
import { useModel } from "../state/model";

export function initAudio() {
  const { setModel } = useModel();

  async function startAudio() {
    await Tone.start();
    console.log("audio is ready");
    Tone.getDestination().volume.value = -30;
    const lowpass = new Tone.Filter(1000, "lowpass");
    const reverb = new Tone.Reverb();
    const compressor = new Tone.Compressor(-18);
    Tone.Destination.chain(lowpass, reverb, compressor);
  }

  // TODO: Find a way to remove the other when one is triggered.
  document.addEventListener("click", startAudio, { once: true });
  document.addEventListener("keydown", startAudio, { once: true });

  // add our instruments
  const instruments = [
    new Tone.MembraneSynth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.PluckSynth().toDestination(),
    // TODO: Noise doesnt work with notes. Need to filter somehow
    // new Tone.NoiseSynth().toDestination(),
  ];
  setModel("bank", "instruments", instruments);
}
