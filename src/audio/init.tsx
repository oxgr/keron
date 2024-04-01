import * as Tone from "tone";

export async function initAudio() {
  await Tone.start();
  console.log("audio is ready");
}
