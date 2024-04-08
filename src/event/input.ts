import { produce, unwrap, createStore } from "solid-js/store";
import { useModel } from "../state/ModelProvider";
import { useInputModel } from "./InputModelProvider";
import { keymap, Modifiers } from "./keymap";

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
    // console.log(modifierBits, Modifiers[modifierBits]);

    if (event.type === "keydown") {
      const action = keymap[event.key];
      if (action) action.fn();
    }

    // const { model, setModel } = useModel();
    const { input, setInput } = useInputModel();
    setInput(
      produce((input) => {
        (input.key = event.key),
          (input.modifiers = {
            shift: false,
            option: false,
            edit: false,
          });
      }),
    );
  }
}
