import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { View, Model } from "../types";
import { Synth } from "tone";

const defaultModel = initModel();
const [model, setModel] = createStore(defaultModel);

export const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}

function initModel(): Model {
  const defaultModel: Model = {
    view: View.Pattern,
    key: {
      active: false,
    },
    transport: {
      playbackActive: false,
    },
    project: {
      name: "ox",
      song: {
        chains: [
          {
            patterns: [
              {
                lines: [
                  {
                    active: false,
                    note: "C4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
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
