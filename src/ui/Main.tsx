import { For, Match, Show, Switch } from "solid-js";
import { useModel } from "../state/model";
import { ViewMode } from "../types";
import styles from "/src/App.module.css";
import PatternView from "./views/Pattern";

export default function Main() {
  const { model, setModel } = useModel();

  return (
    <main class={`${styles.main} ${styles.section}`}>
      <h2>main - {ViewMode[model.view.mode]}</h2>

      <Switch fallback={<div>Not Found</div>}>
        <Match when={ViewMode[model.view.mode] === "Pattern"}>
          <PatternView />
        </Match>
      </Switch>
    </main>
  );
}
