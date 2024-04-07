import * as Tone from "tone";
import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import { AudioModel, InstrumentTypes } from "./types";
import { ViewMode } from "../types";
import { useModel } from "../state/init";
import { positionToLine } from "./utils";

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

  Tone.Transport.scheduleRepeat((time) => {
    audioEffect();
  }, "16n");
}

export function audioEffect() {
  const { model, setModel } = useModel();
  const { audio } = useAudioModel();
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

function createDefaultAudioModel(): AudioModel {
  const defaultAudioModel = {
    ready: false,
    global: {
      transport: Tone.getTransport(),
      destination: Tone.getDestination(),
      sequence: new Tone.Sequence(),
    },

    instrumentEngines: {
      [InstrumentTypes.Synth]: new Tone.Synth().toDestination(),
      [InstrumentTypes.Membrane]: new Tone.MembraneSynth().toDestination(),
      [InstrumentTypes.Pluck]: new Tone.PluckSynth().toDestination(),
    },
  };

  return defaultAudioModel;
}
