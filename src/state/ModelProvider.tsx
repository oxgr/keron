import { ParentProps } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Model } from "./Model";

const defaultModel: Model = new Model();
const [model, setModel] = createStore(defaultModel);
const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}

export default function ModelProvider(props: ParentProps) {
  const { model, setModel } = useModel();

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {props.children}
    </ModelContext.Provider>
  );
}
