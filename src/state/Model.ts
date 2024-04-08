import { ViewMode, NOTES, OCTAVES, Project, View, LineFxRange } from "../types";
import { InstrumentTypes } from "../audio/types";
import { getEnumKeys } from "../ui/views/utils";

export class Model {
  view: View;
  project: Project;
  debug: any = false;

  constructor() {
    const DEFAULT_PROJECT_NAME = "~";
    this.view = {
      mode: ViewMode.Song,
      active: {
        track: 0,
        chain: 0,
        phrase: 0,
        line: 0,
        instrument: 0,
      },
      cursor: {
        line: 0,
        column: 0,
      },
      playhead: {
        track: 0,
        chain: 0,
        phrase: 0,
        line: 0,
        instrument: 0,
      },
      lineRange: [0, 16],
    };

    this.project = this._randomiseModelProject(
      { name: DEFAULT_PROJECT_NAME, bank: {}, song: {} } as Project,
      {
        numLineFxs: 16,
        numLines: 16,
        numPhrases: 8,
        numChains: 8,
        numTracks: 8,
        numInstruments: 8,
      },
    );

    // console.log(defaultModel);
    return this;
  }

  _randomiseModelProject(
    project: Project,
    {
      numLineFxs,
      numLines,
      numPhrases,
      numChains,
      numTracks,
      numInstruments,
    }: {
      numLineFxs: number;
      numLines: number;
      numPhrases: number;
      numChains: number;
      numTracks: number;
      numInstruments: number;
    },
  ): Project {
    const randInt = (range: number) => Math.floor(Math.random() * range);
    const prob = (factor: number) => Math.random() < factor;
    const randArray = (
      range: number,
      probFactor: number,
      elementFn: (v: any, i: number) => any,
    ) =>
      Array(range)
        .fill(0)
        .map((v, i) => {
          if (prob(probFactor)) return elementFn(v, i);
          return undefined;
        });

    console.log(InstrumentTypes);
    const instTypeKeys = getEnumKeys(InstrumentTypes);
    project.bank.instruments = randArray(numInstruments, 1, () => ({
      type: randInt(instTypeKeys.length),
      table: {},
    }));

    project.bank.phrases = randArray(numPhrases, 1, () => ({
      lines: randArray(numLines, 1, () => {
        const lineExists = prob(0.6);
        if (!lineExists) return {};
        const probFx = (probFactor: number) => {
          if (prob(probFactor))
            return { id: randInt(numLineFxs), val: randInt(LineFxRange.High) };
        };
        return {
          note: NOTES[randInt(NOTES.length)],
          octave: OCTAVES[randInt(OCTAVES.length)],
          velocity: randInt(127),
          instrument: randInt(numInstruments),
          fx1: probFx(0.6),
          fx2: probFx(0.6),
          fx3: probFx(0.6),
        };
      }),
    }));

    project.bank.chains = randArray(numChains, 1, () => ({
      phrases: randArray(numPhrases, 0.8, () => randInt(numPhrases)),
    }));

    project.song.tracks = randArray(numTracks, 1, () => ({
      chains: randArray(numChains, 0.6, () => randInt(numChains)),
    }));

    return project;
  }

  getTrack(id: number) {
    return this.project.song.tracks[id];
  }

  getChain(id: number) {
    return this.project.bank.chains[id];
  }

  getPhrase(id: number) {
    return this.project.bank.phrases[id];
  }

  getLine(id: number, phraseId: number) {
    return this.project.bank.phrases[phraseId].lines[id];
  }

  getInstrument(id: number) {
    return this.project.bank.instruments[id];
  }

  getActiveTrack() {
    return this.getTrack(this.view.active.track);
  }

  getActiveChain() {
    return this.getChain(this.view.active.chain);
  }

  getActivePhrase() {
    return this.getPhrase(this.view.active.phrase);
  }

  getActiveLine() {
    return this.getLine(this.view.active.line, this.view.active.phrase);
  }

  getActiveInstrument() {
    return this.getInstrument(this.view.active.instrument);
  }
}
