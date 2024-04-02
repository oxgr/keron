import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { View, Model } from "../types";

const defaultModel = initModel();
const [model, setModel] = createStore(defaultModel);

export const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}

function initModel(): Model {
  return {
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
                    note: "C-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "C-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "E-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "F-4",
                    instrument: {
                      type: "S01",
                      table: {},
                    },
                  },
                  {
                    active: false,
                    note: "G-4",
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
}
