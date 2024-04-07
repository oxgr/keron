// import { Pattern, Sequence } from "tone";
// import { Transport } from "tone/build/esm/core/clock/Transport";
// import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument as AudioInstrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";
import * as Tone from "tone";
import { Line } from "../types";

export type AudioModel = {
  ready: boolean;
  global: AudioGlobals;
  instrumentEngines: InstrumentEngines;
  active: AudioEventCollection;
};

export type AudioGlobals = {
  transport: typeof Tone.Transport;
  destination: typeof Tone.Destination;
};

export type InstrumentEngines = Record<
  InstrumentTypes,
  AudioInstrument<InstrumentOptions>
>;

export type AudioEventCollection = {
  table: Tone.Sequence;
  phrase: Tone.Sequence;
  chain: Tone.Sequence;
  song: Tone.Sequence;
};

export enum InstrumentTypes {
  Synth,
  Membrane,
  Pluck,
}

/**
 * Adapter to Tone.PlaybackState
 */
export const PlaybackState = {
  started: "started",
  stopped: "stopped",
  paused: "paused",
} as const;
