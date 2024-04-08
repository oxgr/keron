import { useModel } from "../state/ModelProvider";
import { ViewMode } from "../types";
import styles from "/src/App.module.css";
import { For } from "solid-js";

export default function Header() {
  const { model, setModel } = useModel();

  const views = Object.keys(ViewMode).filter((e) => isNaN(parseInt(e)));
  const renderViewTabText = (viewText: string) =>
    viewText.substring(0, 4).toLowerCase();

  return (
    <header class={`${styles.header} ${styles.section}`}>
      <div class={styles.tabs}>
        <For each={views}>
          {(viewText, index) => (
            <div
              class={`${viewText} ${index() === model.view.mode ? styles.viewActive : null}`}
            >
              {renderViewTabText(viewText)}
            </div>
          )}
        </For>
      </div>
    </header>
  );
}
