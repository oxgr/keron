import * as Tone from "tone";
import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import { AudioModel, InstrumentTypes } from "./types";
import { ViewMode } from "../types";
import { useModel } from "../state/init";
import { positionToLine } from "./utils";
import { playNote } from "./synth";
import { LineEvent } from "./transport";

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

  // Tone.Transport.scheduleRepeat((time) => {
  //   console.log(time);
  // }, "16n");
}

export function audioEffect() {
  const { model, setModel } = useModel();
  const { audio } = useAudioModel();
  const transport = audio.global.transport;
  const position = transport.position;
  const activeLineNumber = positionToLine(position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("view", "playhead", "line", activeLineNumber);
  }
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
    },

    instrumentEngines: {
      [InstrumentTypes.Synth]: new Tone.Synth().toDestination(),
      [InstrumentTypes.Membrane]: new Tone.MembraneSynth().toDestination(),
      [InstrumentTypes.Pluck]: new Tone.PluckSynth().toDestination(),
    },

    active: {
      table: new Tone.Sequence(linePlaybackCallback, [], "16n"),
      phrase: new Tone.Sequence(linePlaybackCallback, [], "16n"),
      chain: new Tone.Sequence(linePlaybackCallback, [], "1m"),
      song: new Tone.Sequence(linePlaybackCallback, [], "16m"),
    },
  };

  return defaultAudioModel;
}

function linePlaybackCallback(time: any, lineEvent: LineEvent) {
  console.log(time);
  audioEffect();
  playNote(time, lineEvent);
}
