import { onMount } from "solid-js";
import styles from "./App.module.css";

import ModelProvider from "./Model";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { initKeys } from "./events/key";
import { initAudio } from "./audio/init";

export default function App() {
  onMount(() => {
    initKeys();
  });

  return (
    <ModelProvider>
      <div class={styles.App} onclick={initAudio}>
        <Header />
        <Main />
        <Side />
      </div>
    </ModelProvider>
  );
}
