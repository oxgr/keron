import * as Tone from "tone";
import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import { AudioModel } from "./types";

const defaultAudioModel = createDefaultAudioModel();
const [audio, setAudio] = createStore(defaultAudioModel);

export const AudioModelContext = createContext({ audio, setAudio });

export function useAudioModel() {
  return useContext(AudioModelContext);
}

export function onMountAudio(element: HTMLElement) {
  // TODO: Find a way to remove the other when one is triggered.
  element.addEventListener("click", enableAudioContext, { once: true });
  element.addEventListener("keydown", enableAudioContext, { once: true });
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

function createDefaultAudioModel(): AudioModel {
  const defaultAudioModel = {
    ready: false,
    global: {
      transport: Tone.Transport,
      destination: Tone.Destination,
    },

    instrumentEngines: [
      new Tone.Synth().toDestination(),
      new Tone.MembraneSynth().toDestination(),
      new Tone.PluckSynth().toDestination(),

      // TODO: Noise doesnt work with notes. Need to filter somehow
      // new Tone.NoiseSynth().toDestination(),
    ],
  };

  return defaultAudioModel;
}
