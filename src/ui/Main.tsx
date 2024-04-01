import { useModel } from "../Model";
import styles from "/src/App.module.css";
import * as Tone from "tone";

export default function Main() {
  const { model, setModel } = useModel();

  const buttonHandler = async () => {
    console.log("playing audio...");
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
  };

  return (
    <main class={`${styles.main} ${styles.section}`}>
      <div>main</div>
      <div>key pressed: {model.key.event?.key}</div>
      <button onclick={buttonHandler}>hi mom</button>
    </main>
  );
}
