import { Transport } from "tone/build/esm/core/clock/Transport";
import { Destination } from "tone/build/esm/core/context/Destination";
import {
  Instrument as AudioInstrument,
  InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";

export type AudioModel = {
  ready: boolean;
  global: AudioGlobals;
  instrumentEngines: InstrumentEngines;
};

export type AudioGlobals = {
  transport: Transport;
  destination: Destination;
};

export type InstrumentEngines = Array<AudioInstrument<InstrumentOptions>>;

export enum InstrumentTypes {
  Synth,
  MembraneSynth,
  PluckSynth,
}
