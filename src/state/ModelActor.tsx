import { createEffect } from "solid-js";
import { keymap } from "../event/keymap";
import { useModel } from "./model";

const { model, setModel } = useModel();

/**
 * Invisible components to enact actions based on keypresses.
 */
// export function KeyActor() {
// createEffect(
export const keyEffect = () => {
  const key = model.key.event?.key;
  if (key) {
    // console.log(`key pressed: [ ${key} ]`);
    const action = keymap[key];
    if (action) action.fn();
  }
};
// );
//   return <></>;
// }
