import { Match, Switch } from "solid-js";
import { useModel } from "../state/model";
import { ViewMode } from "../types";
import styles from "/src/App.module.css";
import ProjectView from "./views/ProjectView";
import SongView from "./views/SongView";
import ChainView from "./views/ChainView";
import PhraseView from "./views/PhraseView";
import InstrumentView from "./views/InstrumentView";

export default function Main() {
  const { model } = useModel();

  return (
    <main class={`${styles.main} ${styles.section}`}>
      <Switch fallback={<div>Not Found</div>}>
        <Match when={model.view.mode === ViewMode.Configuration}>
          <ProjectView />
        </Match>
        <Match when={model.view.mode === ViewMode.Project}>
          <ProjectView />
        </Match>
        <Match when={model.view.mode === ViewMode.Song}>
          <SongView />
        </Match>
        <Match when={model.view.mode === ViewMode.Chain}>
          <ChainView />
        </Match>
        <Match when={model.view.mode === ViewMode.Phrase}>
          <PhraseView />
        </Match>
        <Match when={model.view.mode === ViewMode.Instrument}>
          <InstrumentView />
        </Match>
      </Switch>
    </main>
  );
}
