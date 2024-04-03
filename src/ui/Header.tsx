import { isString } from "tone";
import { useModel } from "../state/model";
import { ViewMode } from "../types";
import styles from "/src/App.module.css";
import { For } from "solid-js";

export default function Header() {
  const { model, setModel } = useModel();

  const views = Object.keys(ViewMode).filter((e) => isNaN(parseInt(e)));

  return (
    <header class={`${styles.header} ${styles.section}`}>
      {/* <h2>header</h2> */}
      <div class={styles.tabs}>
        <For each={views}>
          {(view, index) => (
            <div
              class={`${view} ${index() === model.view.mode ? styles.viewActive : null}`}
            >
              {view.substring(0, 4).toLowerCase()}
            </div>
          )}
        </For>
      </div>
    </header>
  );
}
