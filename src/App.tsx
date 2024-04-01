import styles from "./App.module.css";

import ModelProvider from "./Model";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Side from "./ui/Side";

import * as Tone from "tone";

export default function App() {
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

async function initAudio() {
  await Tone.start();
  console.log("audio is ready");
}
