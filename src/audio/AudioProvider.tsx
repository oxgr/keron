import { ParentProps } from "solid-js";
import { AudioModelContext, useAudioModel } from "./init";

export default function ModelProvider(props: ParentProps) {
  const { audio, setAudio } = useAudioModel();

  return (
    <AudioModelContext.Provider value={{ audio, setAudio }}>
      {props.children}
    </AudioModelContext.Provider>
  );
}
