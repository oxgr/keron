import { playNote } from "../audio/synth";
import { actions } from "../event/actions";
import { useModel } from "../state/model";
import styles from "/src/App.module.css";

export default function Side() {
  const { model, setModel } = useModel();

  // const lines = model.project.song.chains[0].patterns[0].lines;
  // const linesActive = lines.map((line) => line.active);

  const key = () => {
    const key = model.key.event?.key;
    return key == " " ? "Space" : key;
  };

  return (
    <div class={`${styles.side} ${styles.section}`}>
      <h2>side</h2>
      <div class={styles.sideContent}>
        <div>key:</div>
        <div>
          [ <strong>{key()}</strong> ]
        </div>

        <div>line:</div>
        <div>
          [{" "}
          <strong>
            {(() => model.project.active.line)()},
            {(() => model.view.cursor.line)()}
          </strong>{" "}
          ]
        </div>
      </div>
      {/* <code>{JSON.stringify(linesActive, null, 2)}</code> */}
    </div>
  );
}
