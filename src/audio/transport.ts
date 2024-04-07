import { AudioEventCollection, PlaybackState } from "./types";
import { Active, Instrument, Line, Phrase } from "../types";
import { useAudioModel, audioEffect } from "./init";
import { useModel } from "../state/init";
import { Time } from "tone/build/esm/core/type/Units";
import { lineToPosition } from "./utils";

export function setupPlaybackPhrase() {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const phrasePart = audio.active.phrase;

  const activePhrase = model.getActivePhrase();
  const instruments = model.project.bank.instruments;
  phrasePart.events = makePhraseEvents(activePhrase, instruments);
  phrasePart.start(0);
  // const state = togglePlayback();
  //
  // if (state !== PlaybackState.started) phrasePart.clear();

  return (postState: keyof typeof PlaybackState) => {
    if (postState !== PlaybackState.started) phrasePart.clear();
  };
}

export function setupPlaybackChain() {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const chainSeq = audio.active.chain;

  const activeChain = model.getActiveChain();
  const instruments = model.project.bank.instruments;

  chainSeq.events = activeChain.phrases.map((phraseIndex) => {
    const activePhrase = model.getPhrase(phraseIndex);
    if (!activePhrase) return [];
    return makePhraseEvents(activePhrase, instruments);
  });
  console.log(chainSeq.events);
  chainSeq.start(0);

  // const state = togglePlayback();
  return (postState: keyof typeof PlaybackState) => {
    if (postState !== PlaybackState.started) chainSeq.clear();
  };
}

/**
 * Toggle the playback of a single phrase.
 */
export function togglePlayback(sequence: keyof AudioEventCollection) {
  const { audio } = useAudioModel();

  let loopPoints: [Time, Time] = [0, 0];
  const cleanupCallback = (() => {
    switch (sequence) {
      case "chain":
        loopPoints = [0, "16:0:0"];
        return setupPlaybackChain();
      case "phrase":
        loopPoints = [0, "1:0:0"];
        return setupPlaybackPhrase();
      default:
        return () => {};
    }
  })();

  const transport = audio.global.transport;

  const preState = transport.state;

  if (preState != PlaybackState.started) {
    // Start playback on cursor
    //
    // const startPoint = lineIndexToNotation(
    //   untrack(() => model.view.cursor.line),
    // );
    // // transport.start().position = startPoint;

    transport.loop = true;
    transport.setLoopPoints(loopPoints[0], loopPoints[1]);
    transport.start();
  } else {
    transport.pause();
    // transport.stop();
    transport.loop = false;
  }

  const postState = transport.state;
  console.log("playback:", postState);
  cleanupCallback(postState);
  return postState;
}

export type LineEvent = { line: Line; instrument: Instrument };

function makePhraseEvents(
  activePhrase: Phrase,
  instruments: Instrument[],
): LineEvent[] {
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
