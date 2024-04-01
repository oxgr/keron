import { useModel } from "../state/model";
import styles from "/src/App.module.css";
import * as Tone from "tone";

export default function Main() {
  const { model, setModel } = useModel();

  return (
    <main class={`${styles.main} ${styles.section}`}>
      <h2>main</h2>
    </main>
  );
}
