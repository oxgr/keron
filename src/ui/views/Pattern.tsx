import pattern from "./Pattern.module.css";
import { For } from "solid-js";
import { useModel } from "../../state/model";

export default function PatternView() {
  const { model, setModel } = useModel();
  return (
    <div class="track">
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
