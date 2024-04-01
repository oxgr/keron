import { produce } from "solid-js/store";
import { useModel } from "../state/model";

export function initKeys() {
  const { model, setModel } = useModel();

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
