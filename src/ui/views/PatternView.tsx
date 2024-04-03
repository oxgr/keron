import pattern from "./View.module.css";
import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";
import Line from "../components/Line";

export default function PatternView() {
  const { model, setModel } = useModel();
  return (
    <div class="track">
      <div class={styles.mainTitle}>{model.project.active.pattern}</div>
      <For
        each={model.project.bank.patterns[model.project.active.pattern].lines}
      >
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
