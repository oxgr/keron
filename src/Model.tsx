import { ParentProps, createContext, onMount, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { View, Model } from "./types";

const defaultModel = initModel();
const [model, setModel] = createStore(defaultModel);
const ModelContext = createContext({ model, setModel });

export default function ModelProvider(props: ParentProps) {
  onMount(() => {
    document.addEventListener("keydown", keyHandler);

    function keyHandler(event: KeyboardEvent) {
      console.log(event);
      setModel(
        "key",
        produce((key) => {
          key.active = true;
          key.event = event;
        }),
      );
    }
  });

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
