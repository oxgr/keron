import { ParentProps } from "solid-js";
import { ModelContext, useModel } from "./init";

export default function ModelProvider(props: ParentProps) {
  const { model, setModel } = useModel();

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {props.children}
    </ModelContext.Provider>
  );
}
