import * as Tone from "tone";
import { playNote } from "./synth";
import { lineIndexToNotation, positionToLine } from "./utils";
import { getActivePhrase } from "../state/utils";
import {
  Instrument,
  Line,
  Model,
  Phrase,
  StoreTuple,
  ViewMode,
} from "../types";
import { createMemo } from "solid-js";
import { useAudioModel } from "./init";
import { useModel } from "../state/model";
import { SetStoreFunction } from "solid-js/store";
import { Time } from "tone/build/esm/core/type/Units";

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlaybackPhrase() {
  const { model, setModel } = useModel();
  const { audio, setAudio } = useAudioModel();

  const transport = createMemo(() => audio.global.transport);

  const state = transport().state;
  console.log("playback:", state);

  const phrasePart = audio.active.phrase;

  if (state != "started") {
    console.log("playing...");
    addLinesToPart(phrasePart, model).start(0);
    phrasePart.callback = linePlaybackCallback;
    console.log(phrasePart);

    // setAudio(
    //   "active",
    //
    // )
    // const part = new Tone.Part(linePlaybackCallback, linesWithTime).start(0);

    transport().loop = true;
    transport().setLoopPoints(0, "1:0:0");
    transport().start();
  } else {
    console.log("pausing...");
    transport().stop();
    transport().loop = false;
    phrasePart.clear();
    // Tone.Transport.pause();
  }
}

export type PlaybackLine = { line: Line; time: Time; instrument: Instrument };

function addLinesToPart(part: Tone.Part, model: Model): Tone.Part {
  const activePhrase = getActivePhrase();
  const lines = activePhrase.lines
    .map((line, index) => {
      return {
        line,
        time: ("0:" + lineIndexToNotation(index)) as Time,
        instrument: model.project.bank.instruments[line.instrument],
      };
    })
    .forEach((l) => {
      part.add(l);
      return l;
    });
  return part;
}

function linePlaybackCallback(time: any, playbackLine: PlaybackLine) {
  const { model, setModel } = useModel();
  const activeLineNumber = positionToLine(Tone.Transport.position);
  if (model.view.mode == ViewMode.Phrase) {
    setModel("view", "playhead", "line", activeLineNumber);
  }

  // console.log(time);

  playNote(time, playbackLine);
}
