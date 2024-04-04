import { produce } from "solid-js/store";
import { useModel } from "../state/model";
import { keymap } from "./keymap";

const { model, setModel } = useModel();

/**
 * Initialise event listeners for keypresses
 */
export function initKeys() {
  document.addEventListener("keydown", keyHandler);

  function keyHandler(event: KeyboardEvent) {
    setModel(
      "key",
      produce((key) => {
        key.active = true;
        key.event = event;
      }),
    );
  }
}

/**
 * Invisible component to enact actions based on keypresses.
 */
export function keyEffect() {
  const key = model.key.event?.key;
  if (key) {
    const action = keymap[key];
    if (action) action.fn();
  }
}
