import { playNote } from "../audio/synth";
import { actions } from "../event/actions";
import { useModel } from "../state/model";
import styles from "/src/App.module.css";

export default function Side() {
  const { model, setModel } = useModel();

  // const lines = model.project.song.chains[0].patterns[0].lines;
  // const linesActive = lines.map((line) => line.active);

  return (
    <div class={`${styles.side} ${styles.section}`}>
      <h2>side</h2>
      <div>
        key: [ <strong>{model.key.event?.key}</strong> ]
      </div>
      {/* <code>{JSON.stringify(linesActive, null, 2)}</code> */}
    </div>
  );
}
