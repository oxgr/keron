import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { ViewMode, Model, NOTES, OCTAVES, Bank, Project } from "../types";
import { InstrumentTypes } from "../audio/types";
import { getEnumKeys } from "../ui/views/utils";

const defaultModel = createDefaultModel();
const [model, setModel] = createStore(defaultModel);

export const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}

function createDefaultModel(): Model {
  const defaultModel: Model = {
    view: {
      mode: ViewMode.Song,
      active: {
        track: 0,
        chain: 0,
        phrase: 0,
        line: 0,
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
      },
      lineRange: [0, 16],
    },
    key: {
      active: false,
    },
    project: {
      name: "~",
      song: {
        tracks: [],
      },
      bank: {
        samples: [],
        chains: [],
        phrases: [],
        instruments: [],
      },
    },
  };

  defaultModel.project = randomiseModelProject(defaultModel.project, {
    numLines: 16,
    numPhrases: 8,
    numChains: 8,
    numTracks: 8,
    numInstruments: 8,
  });

  // console.log(defaultModel);
  return defaultModel;
}

function randomiseModelProject(
  project: Project,
  {
    numLines,
    numPhrases,
    numChains,
    numTracks,
    numInstruments,
  }: {
    numLines: number;
    numPhrases: number;
    numChains: number;
    numTracks: number;
    numInstruments: number;
  },
): Project {
  const randInt = (range = 1) => Math.floor(Math.random() * range);
  const prob = (factor = 0.5) => Math.random() < factor;
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
      if (!lineExists)
        return {
          note: undefined,
          octave: undefined,
          velocity: undefined,
          instrument: undefined,
        };
      return {
        note: NOTES[randInt(NOTES.length)],
        octave: OCTAVES[randInt(OCTAVES.length)],
        velocity: randInt(127),
        instrument: randInt(numInstruments),
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
