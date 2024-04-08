import { ParentProps } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { AudioModel } from "./AudioModel";

const defaultAudioModel = new AudioModel();
const [audio, setAudio] = createStore(defaultAudioModel);
const AudioModelContext = createContext({ audio, setAudio });

export function useAudioModel() {
  return useContext(AudioModelContext);
}

export default function AudioModelProvider(props: ParentProps) {
  const { audio, setAudio } = useAudioModel();

  return (
    <AudioModelContext.Provider value={{ audio, setAudio }}>
      {props.children}
    </AudioModelContext.Provider>
  );
}
