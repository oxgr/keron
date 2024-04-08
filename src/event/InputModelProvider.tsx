import { ParentProps } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { InputModel } from "./InputModel";

const defaultAudioModel = new InputModel();
const [input, setInput] = createStore(defaultAudioModel);
const InputModelContext = createContext({ input, setInput });

export function useInputModel() {
  return useContext(InputModelContext);
}

export default function InputModelProvider(props: ParentProps) {
  const { input, setInput } = useInputModel();

  return (
    <InputModelContext.Provider value={{ input, setInput }}>
      {props.children}
    </InputModelContext.Provider>
  );
}
