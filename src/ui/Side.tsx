import { playNote } from "../audio/synth";
import { actions } from "../events/actions";
import { useModel } from "../state/model";
import styles from "/src/App.module.css";

export default function Side() {
  const { model, setModel } = useModel();

  const buttonHandler = actions.playNote.fn;

  return (
    <div class={`${styles.side} ${styles.section}`}>
      <h2>side</h2>
      <div>
        key: [ <strong>{model.key.event?.key}</strong> ]
      </div>
      <button onclick={buttonHandler}>hi mom</button>
    </div>
  );
}
