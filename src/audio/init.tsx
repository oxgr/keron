import * as Tone from "tone";

export function initAudio() {
  document.addEventListener(
    "onclick",
    async () => {
      await Tone.start();
      console.log("audio is ready");
    },
    { once: true },
  );
}
