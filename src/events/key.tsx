import { produce } from "solid-js/store";
import { createEffect } from "solid-js";
import { useModel } from "../state/model";
import { keymap } from "./keymap";

const { model, setModel } = useModel();

export function initKeys() {
  document.addEventListener("keydown", keyHandler);

  function keyHandler(event: KeyboardEvent) {
    // console.log(event);
    setModel(
      "key",
      produce((key) => {
        key.active = true;
        key.event = event;
      }),
    );
  }
}

export function KeyActor() {
  createEffect(() => {
    const key = model.key.event?.key;
    if (key) {
      console.log(key);
      const action = keymap[key];
      if (action) action.fn();
    }
  });

  return <></>;
}
