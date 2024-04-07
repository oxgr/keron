// import { Pattern, Sequence } from "tone";
// import { Transport } from "tone/build/esm/core/clock/Transport";
// import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument as AudioInstrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";
import * as Tone from "tone";

export type AudioModel = {
  ready: boolean;
  global: AudioGlobals;
  instrumentEngines: InstrumentEngines;
};

export type AudioGlobals = {
  transport: typeof Tone.Transport;
  destination: typeof Tone.Destination;
  sequence: Tone.Sequence;
};

export type InstrumentEngines = Record<
  InstrumentTypes,
  AudioInstrument<InstrumentOptions>
>;

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
