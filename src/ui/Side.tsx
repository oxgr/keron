import { playNote } from "../audio/synth";
import { actions } from "../event/actions";
import { useModel } from "../state/model";
import styles from "/src/App.module.css";

export default function Side() {
  const { model, setModel } = useModel();

  // const lines = model.project.song.chains[0].phrases[0].lines;
  // const linesActive = lines.map((line) => line.active);

  const key = () => {
    const key = model.key.event?.key;
    return key == " " ? "Space" : key;
  };

  return (
    <div class={`${styles.side} ${styles.section}`}>
      {/* <h2>side</h2> */}
      <div class={styles.sideContent}>
        {debug("key", () => model.key.event?.key)}
        {debug("active", () => model.view.cursor)}
        {debug("active", () => model.project.active)}
      </div>
    </div>
  );
}

function debug(label: string, fn: Function) {
  return (
    <pre>
      <b>{label}: </b>
      {JSON.stringify(fn(), null, 2)}
    </pre>
  );
}
