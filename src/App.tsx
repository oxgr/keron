import { createEffect, onMount } from "solid-js";
import styles from "/src/App.module.css";

import ModelProvider from "./state/ModelProvider";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { onMountInput, keyEffect } from "./event/key";
import { onMountAudio } from "./audio/init";

export default function App() {
  onMount(() => {
    onMountInput(document.body);
    onMountAudio(document.body);

    document.addEventListener(
      "click",
      () => document.body.requestFullscreen(),
      { once: true },
    );

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
