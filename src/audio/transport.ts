import { PlaybackState } from "./types";
import { Active, Instrument, Line, Phrase } from "../types";
import { useAudioModel, audioEffect } from "./init";
import { useModel } from "../state/init";
import { Time } from "tone/build/esm/core/type/Units";
import { lineToPosition } from "./utils";
import { Model } from "../state/Model";
import { ViewMode } from "../types";
import { playNote } from "./synth";
import * as Tone from "tone";
import { untrack } from "solid-js/web";

export function setupPlaybackPhrase() {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const phraseSeq = audio.global.sequence;

  const activePhrase = model.getActivePhrase();
  const instruments = model.project.bank.instruments;
  phraseSeq.events = makePhraseEvents(activePhrase, instruments);
  phraseSeq.start(0);

  return (postState: keyof typeof PlaybackState) => {
    if (postState !== PlaybackState.started) phraseSeq.clear();
  };
}

export function setupPlaybackChain() {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const chainSeq = audio.global.sequence;

  const activeChain = model.getActiveChain();
  const instruments = model.project.bank.instruments;

  chainSeq.events = Array(16)
    .fill(0)
    .map((_, subdivIndex) => {
      const phraseIndex = activeChain.phrases[subdivIndex];
      const activePhrase = model.getPhrase(phraseIndex);
      console.log({ subdivIndex, phraseIndex, activePhrase });
      if (!activePhrase) return null;
      return makePhraseEvents(activePhrase, instruments);
    });
  console.log(chainSeq.events);
  chainSeq.start(0);

  // const state = togglePlayback();
  return (postState: keyof typeof PlaybackState) => {
    if (postState !== PlaybackState.started) chainSeq.clear();
  };
}

function eventsGenerator(
  sequence: ViewMode,
  model: Model,
): [(LineEvent | (LineEvent[] | LineEvent[][]))[], Time, [Time, Time]] {
  switch (sequence) {
    case ViewMode.Chain: {
      const interval = "1n";
      const loopPoints: [Time, Time] = [0, "16:0:0"];

      const activeChain = model.getActiveChain();
      const instruments = model.project.bank.instruments;

      const events = Array(16)
        .fill(0)
        .map((_, subdivIndex) => {
          const phraseIndex = activeChain.phrases[subdivIndex];
          const activePhrase = model.getPhrase(phraseIndex);
          console.log({ subdivIndex, phraseIndex, activePhrase });
          if (!activePhrase) return null;
          return makePhraseEvents(activePhrase, instruments);
        });

      return [events, interval, loopPoints];
    }
    case ViewMode.Phrase: {
      const loopPoints: [Time, Time] = [0, "1:0:0"];
      const interval = "16n";

      const activePhrase = model.getActivePhrase();
      const instruments = model.project.bank.instruments;

      const events = makePhraseEvents(activePhrase, instruments);
      return [events, interval, loopPoints];
    }
    default:
      return [[], "1n" as Time, [0, 0] as [Time, Time]];
  }
}

/**
 * Toggle the playback of depending on the view mode.
 */
export function togglePlayback(viewMode: ViewMode) {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const loopPoints = untrack(() => {
    const [events, interval, loopPoints] = eventsGenerator(viewMode, model);
    audio.global.sequence.dispose();
    setAudio(
      "global",
      "sequence",
      new Tone.Sequence(linePlaybackCallback, events, interval),
    );
    return loopPoints;
  });
  audio.global.sequence.start(0);

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
  if (postState !== PlaybackState.started) audio.global.sequence.clear();

  // cleanupCallback(postState);
  return postState;
}

export type LineEvent = { line: Line; instrument: Instrument } | null;

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

function linePlaybackCallback(time: any, lineEvent: LineEvent) {
  playNote(time, lineEvent);
}
