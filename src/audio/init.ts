import * as Tone from "tone";
import { useModel } from "../state/model";
import { produce } from "solid-js/store";

export function initAudio() {
  async function startAudio() {
    await Tone.start();
    console.log("audio is ready");
  }

  // TODO: Find a way to remove the other when one is triggered.
  document.addEventListener("click", startAudio, { once: true });
  document.addEventListener("keydown", startAudio, { once: true });

  Tone.Transport.scheduleRepeat((time) => {
    const pos = Tone.Transport.position;
    // console.log("time is:", pos);
    const comps = pos.toString().split(":");
    const bars = Number(comps[0]);
    const beats = Number(comps[1]);
    const sixts = Number(comps[2].split(".")[0]);
    // console.log(bars, beats, sixteenth);
    const activeLine = beats * 4 + sixts;
    // console.log(line);
    const { setModel } = useModel();
    setModel(
      "project",
      "song",
      "chains",
      0,
      "patterns",
      0,
      "lines",
      produce((lines) => lines.map((line) => (line.active = false))),
    );
    setModel(
      "project",
      "song",
      "chains",
      0,
      "patterns",
      0,
      "lines",
      activeLine,
      "active",
      true,
    );
  }, "16n");

  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints(0, "1m");
}
