import { createEffect, onMount } from "solid-js";
import styles from "/src/App.module.css";

import ModelProvider from "./state/ModelProvider";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { initKeys, keyEffect } from "./event/key";
import { initAudio } from "./audio/init";

export default function App() {
  onMount(() => {
    initKeys();
    initAudio();
    const fullscreen = () => document.body.requestFullscreen();
    document.addEventListener("click", fullscreen, { once: true });

    createEffect(keyEffect);
  });

  return (
    <ModelProvider>
      <div class={styles.App}>
        <Header />
        <Main />
        <Side />
      </div>
    </ModelProvider>
  );
}
