import phrase from "./View.module.css";
import styles from "../../App.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";

export default function ChainView() {
  const { model, setModel } = useModel();
  return (
    <div class="track">
      <div class={styles.mainTitle}>{model.project.active.phrase}</div>
      <For
        each={model.project.bank.phrases[model.project.active.phrase].lines}
      >
        {(line, index) => (
          <div
            class={`${phrase.line} ${index() === model.project.active.line ? phrase.lineActive : null}`}
          >
            <div class={phrase.linenr}>{index()}</div>
            <div class={phrase.note}>{line.note}</div>
          </div>
        )}
      </For>
    </div>
  );
}
