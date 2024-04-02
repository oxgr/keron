import * as Tone from "tone";
import { useModel } from "../state/model";
import { produce } from "solid-js/store";
import { Seconds } from "tone/build/esm/core/type/Units";
import { playNote } from "./synth";

export function initAudio() {
  const { model, setModel } = useModel();

  async function startAudio() {
    await Tone.start();
    console.log("audio is ready");
  }

  // TODO: Find a way to remove the other when one is triggered.
  document.addEventListener("click", startAudio, { once: true });
  document.addEventListener("keydown", startAudio, { once: true });

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  setModel("synth", synth);

  Tone.Transport.scheduleRepeat(loopCallback, "16n");

  Tone.Transport.loop = true;
  Tone.Transport.setLoopPoints(0, "1m");
}

function loopCallback() {
  const pos = Tone.Transport.position;
  // console.log("time is:", pos);
  const comps = pos.toString().split(":");
  const bars = Number(comps[0]);
  const beats = Number(comps[1]);
  const sixts = Number(comps[2].split(".")[0]);
  // console.log(bars, beats, sixteenth);
  const activeLine = beats * 4 + sixts;
  // console.log(line);

  const { model, setModel } = useModel();
  setModel(
    "project",
    "song",
    "chains",
    0,
    "patterns",
    0,
    "lines",
    produce((lines) =>
      lines.map((line, index) => (line.active = index === activeLine)),
    ),
  );

  const noteToPlay =
    model.project.song.chains[0].patterns[0].lines[activeLine].note;
  playNote(noteToPlay, "8n");
}
