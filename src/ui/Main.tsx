import { For, Match, Show, Switch } from "solid-js";
import { useModel } from "../state/model";
import { View } from "../types";
import styles from "/src/App.module.css";
import PatternView from "./views/Pattern";

export default function Main() {
  const { model, setModel } = useModel();

  return (
    <main class={`${styles.main} ${styles.section}`}>
      <h2>main - {View[model.view]}</h2>

      <Switch fallback={<div>Not Found</div>}>
        <Match when={View[model.view] === "Pattern"}>
          <PatternView />
        </Match>
      </Switch>
    </main>
  );
}
