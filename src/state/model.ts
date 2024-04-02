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
      mode: ViewMode.Pattern,
      cursor: {
        position: {},
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
        chain: 0,
        pattern: 0,
        line: 0,
      },
      song: {
        chains: [0],
      },
      bank: {
        samples: [],
        chains: [
          {
            patterns: [0],
          },
        ],
        patterns: [
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

  // defaultModel.project.song.chains[0].patterns[0].lines = Array(16).fill(
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
