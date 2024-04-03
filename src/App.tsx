import { onMount } from "solid-js";
import styles from "/src/App.module.css";

import ModelProvider from "./state/ModelProvider";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { initKeys } from "./event/key";
import { initAudio } from "./audio/init";
import { KeyActor } from "./event/KeyActor";
import { keyEffect } from "./state/ModelActor";
import { createEffect } from "solid-js";

export default function App() {
  // createEffect(keyEffect);
  onMount(() => {
    initKeys();
    initAudio();
    document.addEventListener("click", fullscreen, { once: true });
    function fullscreen() {
      document.body.requestFullscreen();
    }
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
