import { produce, createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";
import { useModel } from "../state/init";
import { InputModel } from "./InputModel";
import { keymap, Modifiers } from "./keymap";

const defaultAudioModel = new InputModel();
const [audio, setAudio] = createStore(defaultAudioModel);

export const AudioModelContext = createContext({ audio, setAudio });

export function useAudioModel() {
  return useContext(AudioModelContext);
}

/**
 * Initialise event listeners for keypresses
 */
export function onMountInput(element: HTMLElement) {
  element.addEventListener("keydown", keyHandler);
  element.addEventListener("keyup", keyHandler);

  function keyHandler(event: KeyboardEvent) {
    const { type, code, shiftKey } = event;

    // set modifier values to bits that correspond with the Modifiers enum
    const modActive = {
      shift: shiftKey ? 1 : 0,
      option: event.key === "a" ? 2 : 0,
      edit: false ? 4 : 0,
    };

    // sum to get bits of active modifiers state
    const modifierBits = modActive.shift + modActive.option + modActive.edit;
    console.log(modifierBits, Modifiers[modifierBits]);

    if (event.type === "keydown") {
      const action = keymap[event.key];
      if (action) action.fn();
    }

    const { setModel } = useModel();
    setModel(
      "debug",
      produce((debug: {}) => ({
        ...debug,
        input: {
          key: event.key,
          modifiers: {
            shift: false,
            option: false,
            edit: false,
          },
        },
      })),
    );
  }
}
