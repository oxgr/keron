import * as Tone from "tone";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";
import { getActivePhrase } from "../state/utils";
import { Line, Model, Phrase, StoreTuple, ViewMode } from "../types";
import { createMemo } from "solid-js";
import { useAudioModel } from "./init";
import { useModel } from "../state/model";
import { SetStoreFunction } from "solid-js/store";

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlaybackPhrase() {
  const { model, setModel } = useModel();
  const { audio, setAudio } = useAudioModel();

  const transport = createMemo(() => audio.global.transport);

  const state = transport().state;
  console.log("playback:", state);

  if (state != "started") {
    console.log("playing...");
    const activePhrase = getActivePhrase();
    const linesWithTime = setupLines(activePhrase);
    // setAudio(
    //   "active",
    //
    // )
    const part = new Tone.Part(linePlaybackCallback, linesWithTime).start(0);

    transport().loop = true;
    transport().setLoopPoints(0, "1:0:0");
    transport().start();
  } else {
    console.log("pausing...");
    transport().stop();
    transport().loop = false;
    // Tone.Transport.pause();
  }
}

function setupLines(activePhrase: Phrase) {
  const lines = activePhrase.lines.map((line, index) => {
    return {
      ...line,
      time: "0:" + lineIndexToNotation(index),
    };
  });
  return lines;
}

function linePlaybackCallback(time: any, line: Line) {
  const { model, setModel } = useModel();
  const activeLineNumber = positionToLine(Tone.Transport.position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("view", "playhead", "line", activeLineNumber);
  }

  console.log(time);

  playNote(time, line);
}
