import * as Tone from "tone";
import { playNote } from "./synth";
import { Instrument, Line } from "../types";
import { createMemo } from "solid-js";
import { useAudioModel, audioEffect } from "./init";
import { useModel } from "../state/init";
import { Time } from "tone/build/esm/core/type/Units";
import { Model } from "../state/Model";
import { lineToPosition } from "./utils";

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlaybackPhrase() {
  const { model } = useModel();
  const { audio } = useAudioModel();

  const transport = createMemo(() => audio.global.transport);

  const state = transport().state;
  console.log("playback:", state);

  const phrasePart = audio.active.phrase;

  if (state != "started") {
    console.log("playing...");

    addLinesToPart(phrasePart, model).start(0);
    phrasePart.callback = linePlaybackCallback;

    // Start playback on cursor
    //
    // const startPoint = lineIndexToNotation(
    //   untrack(() => model.view.cursor.line),
    // );
    // // transport().start().position = startPoint;

    transport().loop = true;
    transport().setLoopPoints(0, "1:0:0");
    transport().start();
  } else {
    console.log("pausing...");
    // Tone.Transport.pause();
    transport().stop();
    transport().loop = false;
    phrasePart.clear();
  }
}

export type PlaybackLine = { line: Line; time: Time; instrument: Instrument };

function addLinesToPart(part: Tone.Part, model: Model): Tone.Part {
  const activePhrase = model.getActivePhrase();
  const lines = activePhrase.lines
    .map((line, index) => {
      return {
        line,
        time: lineToPosition(index) as Time,
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
  // console.log(time);
  audioEffect();

  playNote(time, playbackLine);
}
