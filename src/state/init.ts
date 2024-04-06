import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Model } from "./Model";

// const defaultModel = createDefaultModel();
const defaultModel: Model = new Model();
const [model, setModel] = createStore(defaultModel);

export const ModelContext = createContext({ model, setModel });

export function useModel() {
  return useContext(ModelContext);
}
