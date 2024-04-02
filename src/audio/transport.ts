import * as Tone from "tone";
import { useModel } from "../state/model";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";

const { model, setModel } = useModel();

/**
 * Toggle the playback of a single pattern.
 */
export function togglePlaybackPattern() {
  // console.log("toggling playback");
  //
  // setModel("transport", "playbackActive", (pb) => !pb);
  // const pbActive = model.transport.playbackActive;
  //

  const state = Tone.Transport.state;
  console.log("playback:", state);

  if (state != "started") {
    setupLoop();
    Tone.Transport.loop = true;
    Tone.Transport.setLoopPoints(0, "1:0:0");
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
}

function setupLoop() {
  const activePatternIndex = model.project.active.pattern;
  const activePattern = model.project.bank.patterns[activePatternIndex];

  const lines = activePattern.lines.map((line, index) => [
    "0:" + lineIndexToNotation(index),
    line.note,
  ]);
  const part = new Tone.Part(loopCallback, lines).start(0);
}

function loopCallback(time: any, note: any) {
  playNote(note, "8n", time);
  const activeLine = positionToLine(Tone.Transport.position);
  setModel("project", "active", "line", activeLine);
}
