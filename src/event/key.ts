import { produce } from "solid-js/store";
import { useModel } from "../state/model";
import { keymap } from "./keymap";

/**
 * Initialise event listeners for keypresses
 */
export function onMountInput(element: HTMLElement) {
  const { setModel } = useModel();

  element.addEventListener("keydown", keyHandler);

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
  const { model, setModel } = useModel();
  const key = model.key.event?.key;
  if (key) {
    const action = keymap[key];
    if (action) action.fn({ model, setModel });
  }
}
