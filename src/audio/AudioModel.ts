import * as Tone from "tone";
import { AudioGlobals, InstrumentEngines, InstrumentTypes } from "./types";

export class AudioModel {
  ready: boolean = false;
  global: AudioGlobals;
  instrumentEngines: InstrumentEngines;

  constructor() {
    this.global = {
      transport: Tone.getTransport(),
      destination: Tone.getDestination(),
      sequence: new Tone.Sequence(),
    };

    this.instrumentEngines = {
      [InstrumentTypes.Synth]: new Tone.Synth().toDestination(),
      [InstrumentTypes.Membrane]: new Tone.MembraneSynth().toDestination(),
      [InstrumentTypes.Pluck]: new Tone.PluckSynth().toDestination(),
    };
  }
}
