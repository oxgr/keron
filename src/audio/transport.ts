import * as Tone from "tone";
import { useModel } from "../state/model";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";
import { getPhrase } from "../state/utils";
import { ViewMode } from "../types";

const { model, setModel } = useModel();

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlaybackPhrase() {
  // console.log("toggling playback");
  //
  // setModel("transport", "playbackActive", (pb) => !pb);
  // const pbActive = model.transport.playbackActive;
  //

  const state = Tone.Transport.state;
  console.log("playback:", state);

  if (state != "started") {
    console.log("playing...");
    setupLoop();
    Tone.Transport.loop = true;
    Tone.Transport.setLoopPoints(0, "1:0:0");
    Tone.Transport.start();
  } else {
    console.log("pausing...");
    // setupLoop();
    // Tone.Transport.stop();
    Tone.Transport.pause();
  }
}

function setupLoop() {
  const activePhraseIndex = model.project.active.phrase;
  const activePhrase = getPhrase(activePhraseIndex);

  const lines = activePhrase.lines.map((line, index) => [
    "0:" + lineIndexToNotation(index),
    line.note,
  ]);
  const part = new Tone.Part(loopCallback, lines).start(0);
}

function loopCallback(time: any, note: any) {
  playNote(note, "8n", time);
  const activeLine = positionToLine(Tone.Transport.position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("project", "active", "line", activeLine);
    setModel("view", "cursor", "line", activeLine);
  }
}
