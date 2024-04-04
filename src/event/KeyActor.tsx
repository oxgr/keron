import { createEffect } from "solid-js";
import { keymap } from "./keymap";
import { useModel } from "../state/model";

const { model } = useModel();

/**
 * Invisible component to enact actions based on keypresses.
 */
export function KeyActor() {
  createEffect(() => {
    const key = model.key.event?.key;
    if (key) {
      const action = keymap[key];
      if (action) action.fn();
    }
  });
  return <></>;
}
