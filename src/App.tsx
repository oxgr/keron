import { onMount } from "solid-js";
import styles from "/src/App.module.css";

import ModelProvider from "./state/ModelProvider";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { initKeys } from "./event/key";
import { initAudio } from "./audio/init";
import { KeyActor } from "./event/KeyActor";

export default function App() {
  onMount(() => {
    initKeys();
    initAudio();
    const fullscreen = () => document.body.requestFullscreen();
    document.addEventListener("click", fullscreen, { once: true });
  });

  return (
    <ModelProvider>
      <KeyActor></KeyActor>
      <div class={styles.App}>
        <Header />
        <Main />
        <Side />
      </div>
    </ModelProvider>
  );
}
