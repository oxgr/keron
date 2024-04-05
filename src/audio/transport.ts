import * as Tone from "tone";
import { useModel } from "../state/model";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";
import { getActivePhrase, getLine, getPhrase } from "../state/utils";
import { Phrase, ViewMode } from "../types";
import { produce } from "solid-js/store";
import { createEffect, createRenderEffect, onCleanup } from "solid-js";

const { model, setModel } = useModel();

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlaybackPhrase() {
  const state = Tone.Transport.state;
  console.log("playback:", state);

  if (state != "started") {
    console.log("playing...");
    // createRenderEffect(() => {
    const activePhrase = getActivePhrase();
    const lines = setupLines(activePhrase);
    const part = new Tone.Part(loopCallback, lines).start(0);
    //   onCleanup(() => part.dispose());
    // });
    Tone.Transport.loop = true;
    Tone.Transport.setLoopPoints(0, "1:0:0");
    Tone.Transport.start();
  } else {
    console.log("pausing...");
    Tone.Transport.stop();
    Tone.Transport.loop = false;
    // Tone.Transport.pause();
  }
}

function setupLines(activePhrase: Phrase) {
  const lines = activePhrase.lines.map((line, index) => {
    const { note, octave, velocity, instrument } = line;
    const fullNote = note + octave;
    return {
      time: "0:" + lineIndexToNotation(index),
      note: fullNote,
      velocity,
      instrument,
    };
  });
  return lines;
}

function loopCallback(time: any, value: any) {
  const activeLineNumber = positionToLine(Tone.Transport.position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("view", "playhead", "line", activeLineNumber);
  }

  if (value.instrument === undefined) return;

  const { note, velocity, instrument } = value;
  // const {  } = getLine(activeLineNumber, model.view.active.phrase);
  playNote({ note, duration: "8n", time, velocity, instrument });
}
