import * as Tone from "tone";
import { useModel } from "../state/model";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";
import { getLine, getPhrase } from "../state/utils";
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
    Tone.Transport.stop();
    // Tone.Transport.pause();
  }
}

function setupLoop() {
  const activePhraseIndex = model.project.active.phrase;
  const activePhrase = getPhrase(activePhraseIndex);

  const lines = activePhrase.lines.map((line, index) => {
    const { note, accidental, octave, velocity } = line;
    const fullNote = note + accidental + octave;
    return {
      time: "0:" + lineIndexToNotation(index),
      note: fullNote,
      velocity,
    };
  });
  const part = new Tone.Part(loopCallback, lines).start(0);
}

function loopCallback(time: any, value: any) {
  const activeLineNumber = positionToLine(Tone.Transport.position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("project", "active", "line", activeLineNumber);
    setModel("view", "cursor", "line", activeLineNumber);
  }

  const { note, velocity } = value;
  const { instrument } = getLine(activeLineNumber, model.project.active.phrase);
  playNote({ note, duration: "8n", time, velocity, instrument });
}
