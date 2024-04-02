import pattern from "./View.module.css";
import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";

export default function ChainView() {
  const { model, setModel } = useModel();
  return (
    <div class="track">
      <h2 class={styles.mainTitle}>{model.project.active.pattern}</h2>
      <For
        each={model.project.bank.patterns[model.project.active.pattern].lines}
      >
        {(line, index) => (
          <div
            class={`${pattern.line} ${index() === model.project.active.line ? pattern.lineActive : null}`}
          >
            <div class={pattern.linenr}>{index()}</div>
            <div class={pattern.note}>{line.note}</div>
          </div>
        )}
      </For>
    </div>
  );
}