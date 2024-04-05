import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { ViewMode, Model, NOTES, OCTAVES } from "../types";

const defaultModel = initModel();
const [model, setModel] = createStore(defaultModel);

export const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}

function initModel(): Model {
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
        line: 0,
        column: 0,
      },
      lineRange: [0, 16],
    },
    key: {
      active: false,
    },
    transport: {
      playbackActive: false,
    },
    bank: {
      instruments: [0, 1, 2],
    },
    project: {
      name: "ox",
      song: {
        tracks: [
          {
            chains: [1, 0],
          },
          {
            chains: [0],
          },
          {
            chains: [1, 2],
          },
          {
            chains: [3, 3, 3],
          },
        ],
      },
      bank: {
        samples: [],
        chains: [
          {
            phrases: [0, 1],
          },
          {
            phrases: [1, 0],
          },
          {
            phrases: [0, 0],
          },
          {
            phrases: [1, 1, 1, 1],
          },
        ],
        phrases: [
          {
            lines: [
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C#",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
            ],
          },
          {
            lines: [
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "C",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "E",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "B",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "D",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "B",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "B",
                // accidental: "b",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "F",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
              {
                note: "G",
                // accidental: "",
                octave: 4,
                velocity: 64,
                instrument: 1,
              },
            ],
          },
        ],
      },
    },
  };

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

  const numPhrases = 8;
  const numChains = 8;
  const numTracks = 8;

  defaultModel.project.bank.phrases = randArray(numPhrases, 1, () => ({
    lines: randArray(16, 1, () => ({
      note: NOTES[randInt(NOTES.length)],
      octave: OCTAVES[randInt(OCTAVES.length)],
      velocity: randInt(127),
      instrument: randInt(defaultModel.bank.instruments.length),
    })),
  }));

  defaultModel.project.song.tracks = randArray(8, 1, () => ({
    chains: randArray(4, 1, () => randInt(4)),
  }));

  // defaultModel.project.bank.tracks[0].chains[0].phrases[0].lines = Array(
  //   16,
  // ).fill(
  //   {
  //     active: false,
  //     note: "C-4",
  //     instrument: {
  //       type: "S01",
  //       table: {},
  //     },
  //   } as never,
  //   0,
  //   16,
  // );

  // console.log(defaultModel);
  return defaultModel;
}
