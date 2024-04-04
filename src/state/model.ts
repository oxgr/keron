import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { ViewMode, Model } from "../types";

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
      instruments: [],
    },
    project: {
      name: "ox",
      song: {
        tracks: [0, 1, 2, 3],
      },
      bank: {
        samples: [],
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

  // defaultModel.project.song.chains[0].phrases[0].lines = Array(16).fill(
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
