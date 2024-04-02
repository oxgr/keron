import { produce } from "solid-js/store";
import { useModel } from "../state/model";

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
