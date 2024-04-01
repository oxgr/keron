import { ParentProps, createContext, onMount, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { View, Model } from "../types";

const defaultModel = initModel();
const [model, setModel] = createStore(defaultModel);
const ModelContext = createContext({ model, setModel });

export default function ModelProvider(props: ParentProps) {
  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {props.children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  return useContext(ModelContext);
}

function initModel(): Model {
  return {
    view: View.Settings,
    key: {
      active: false,
    },
  };
}
