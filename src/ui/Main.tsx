import { For, Match, Show, Switch, createEffect } from "solid-js";
import { useModel } from "../state/model";
import { ViewMode } from "../types";
import styles from "/src/App.module.css";
import PatternView from "./views/PatternView";
import ChainView from "./views/ChainView";

export default function Main() {
  const { model, setModel } = useModel();

  const viewMode = () => model.view.mode;

  return (
    <main class={`${styles.main} ${styles.section}`}>
      {/* <h2 class={styles.mainTitle}>{ViewMode[viewMode()].toUpperCase()}</h2> */}

      <Switch fallback={<div>Not Found</div>}>
        <Match when={ViewMode[model.view.mode] === "Chain"}>
          <ChainView />
        </Match>
        <Match when={ViewMode[model.view.mode] === "Pattern"}>
          <PatternView />
        </Match>
      </Switch>
    </main>
  );
}
