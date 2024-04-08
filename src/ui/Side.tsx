import { useModel } from "../state/ModelProvider";
import { useAudioModel } from "../audio/AudioModelProvider";
import { useInputModel } from "../event/InputModelProvider";
import styles from "/src/App.module.css";

export default function Side() {
  const { model } = useModel();
  const { input } = useInputModel();
  const { audio } = useAudioModel();

  // const lines = model.project.song.chains[0].phrases[0].lines;
  // const linesActive = lines.map((line) => line.active);

  return (
    <div class={`${styles.side} ${styles.section}`}>
      {/* <h2>side</h2> */}
      <div class={styles.sideContent}>
        {debug("input", () => input)}
        {debug("cursor", () => model.view.cursor)}
        {debug("playhead", () => model.view.playhead)}
        {debug("transportPos", () => audio.global.position)}
        {debug("active", () => model.view.active)}
        {debug("activeLine", () => model.getActiveLine())}
        {/* {debug("linesInPhrase", () => */}
        {/*   getActivePhrase().lines.map((v, i) => ({ ...v, index: i })), */}
        {/* )} */}
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
