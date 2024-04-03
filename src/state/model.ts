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
      mode: ViewMode.Phrase,
      cursor: {
        line: 0,
        column: 0,
      },
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
        tracks: [0],
      },
      bank: {
        samples: [],
        tracks: [
          {
            chains: [0],
          },
        ],
        chains: [
          {
            phrases: [0],
          },
        ],
        phrases: [
          {
            lines: [
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
            ],
          },
          {
            lines: [
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "C4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "E4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "F4",
                instrument: {
                  type: "S01",
                  table: {},
                },
              },
              {
                note: "G4",
                instrument: {
                  type: "S01",
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
