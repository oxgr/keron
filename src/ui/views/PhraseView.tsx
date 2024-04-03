import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";
import Line from "../components/Line";
import { getActivePhrase } from "../../state/utils";

export default function PhraseView() {
  const { model, setModel } = useModel();
  return (
    <div class="track">
      <div class={styles.mainTitle}>{model.project.active.phrase}</div>
      <For each={getActivePhrase().lines}>
        {(line, index) => (
          <Line
            line={line}
            index={index}
            active={() => index() === model.project.active.line}
          ></Line>
        )}
      </For>
    </div>
  );
}
