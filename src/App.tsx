import { createEffect, onMount } from "solid-js";
import styles from "/src/App.module.css";

import ModelProvider from "./state/ModelProvider";
import AudioModelProvider from "./audio/AudioModelProvider";
import InputModelProvider from "./audio/AudioModelProvider";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import { onMountInput } from "./event/input";
import { onMountAudio, audioEffect } from "./audio/init";

export default function App() {
  onMount(() => {
    onMountInput(document.body);
    onMountAudio(document.body);

    document.addEventListener(
      "click",
      () => document.body.requestFullscreen(),
      { once: true },
    );

    // createEffect(keyEffect);
    createEffect(audioEffect);
  });

  // while it seems that providers don't restrict
  // access to stores depending on if an element is its child,
  // this layout underlines the structure of the data flow.
  //
  // Audio and Input only interact with the Model.
  // state of Model determines the View.
  return (
    <ModelProvider>
      <AudioModelProvider>
        <InputModelProvider>
          {/* Gamepad emulation buttons go here */}
        </InputModelProvider>
      </AudioModelProvider>

      <div role="main" class={styles.App}>
        <Header />
        <Main />
        <Side />
      </div>
    </ModelProvider>
  );
}
