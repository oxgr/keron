import { PlaybackState } from "./types";
import { Instrument, Line, Phrase } from "../types";
import { useAudioModel, audioEffect } from "./init";
import { useModel } from "../state/init";
import { Time } from "tone/build/esm/core/type/Units";
import { lineToPosition } from "./utils";

export function togglePlaybackPhrase() {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const phrasePart = audio.active.phrase;

  const activePhrase = model.getActivePhrase();
  const instruments = model.project.bank.instruments;
  phrasePart.events = makePhraseEvents(activePhrase, instruments);
  phrasePart.start(0);
  const state = togglePlayback();
  if (state !== PlaybackState.Started) phrasePart.clear();
}

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlayback() {
  const { audio } = useAudioModel();

  const transport = audio.global.transport;

  const preState = transport.state;

  if (preState != PlaybackState.Started) {
    // Start playback on cursor
    //
    // const startPoint = lineIndexToNotation(
    //   untrack(() => model.view.cursor.line),
    // );
    // // transport.start().position = startPoint;

    transport.loop = true;
    transport.setLoopPoints(0, "1:0:0");
    transport.start();
  } else {
    // Tone.Transport.pause();
    transport.stop();
    transport.loop = false;
  }

  const postState = transport.state;
  console.log("playback:", postState);
  return postState;
}

export type PlaybackLine = { line: Line; instrument: Instrument };

function makePhraseEvents(
  activePhrase: Phrase,
  instruments: Instrument[],
): PlaybackLine[] {
  // TODO: phrase sequence only gets updated on playback because map returns a new array
  const sequenceEvents = activePhrase.lines.map((line, index) => {
    const time = lineToPosition(index) as Time;

    return {
      line,
      instrument: instruments[line.instrument],
    };
  });
  return sequenceEvents;
}
