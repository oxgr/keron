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
      cursor: {
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
      active: {
        track: 0,
        chain: 0,
        phrase: 0,
        line: 0,
      },
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
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
            ],
          },
          {
            lines: [
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "C4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "E4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "B4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "D4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "B4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "Bb4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "F4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
              },
              {
                note: "G4",
                velocity: 64,
                instrument: {
                  id: 1,
                  table: {},
                },
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

  console.log(defaultModel);
  return defaultModel;
}
