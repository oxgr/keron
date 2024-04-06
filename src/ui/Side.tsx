import { useModel } from "../state/init";
import { useAudioModel } from "../audio/init";
import styles from "/src/App.module.css";

export default function Side() {
  const { model, setModel } = useModel();
  const { audio, setAudio } = useAudioModel();

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
        {debug("cursor", () => model.view.cursor)}
        {debug("playhead", () => model.view.playhead)}
        {debug("transportPos", () => audio.global.transport.position)}
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
