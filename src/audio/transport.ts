import { PlaybackState } from "./types";
import { Bank, Instrument, Line } from "../types";
import { useAudioModel } from "./AudioModelProvider";
import { useModel } from "../state/ModelProvider";
import { Time } from "tone/build/esm/core/type/Units";
import { ViewMode } from "../types";
import { playNote } from "./synth";
import * as Tone from "tone";
import { untrack } from "solid-js/web";

export type LineEvent = { line: Line; instrument: Instrument } | null;

/**
 * Toggle the playback of depending on the view mode.
 */
export function togglePlayback(viewMode: ViewMode) {
  const { model } = useModel();
  const { audio, setAudio } = useAudioModel();

  const array = (() => {
    switch (viewMode) {
      case ViewMode.Chain:
        return model.getActiveChain().phrases;
      case ViewMode.Phrase:
        return model.getActivePhrase().lines;
      default:
        return [];
    }
  })();

  const loopPoints = untrack(() => {
    const bank = model.project.bank;
    const [events, interval, loopPoints] = eventsGenerator(
      viewMode,
      array,
      bank,
    );
    audio.global.sequence.dispose();
    console.log(model.view.mode, events);
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
    // transport.pause();
    transport.stop();
    transport.loop = false;
  }

  const postState = transport.state;
  console.log("playback:", postState);
  if (postState !== PlaybackState.started) audio.global.sequence.clear();

  // cleanupCallback(postState);
  return postState;
}

function eventsGenerator(
  sequence: ViewMode,
  array: any[],
  bank: Bank,
): [any[], Time, [Time, Time]] {
  switch (sequence) {
    case ViewMode.Chain: {
      const interval = "1n";
      const loopPoints: [Time, Time] = [0, "16:0:0"];

      const events = Array(16)
        .fill(0)
        .map((_, subdivIndex) => {
          const subPhraseIndex = array[subdivIndex];
          const subPhrase = bank.phrases[subPhraseIndex];
          // console.log({ subdivIndex, phraseIndex, activePhrase });
          if (!subPhrase) return null;
          const [phraseEvents] = eventsGenerator(
            ViewMode.Phrase,
            subPhrase.lines,
            bank,
          );
          return phraseEvents;
        });

      console.log(events);
      return [events, interval, loopPoints];
    }
    case ViewMode.Phrase: {
      const interval = "16n";
      const loopPoints: [Time, Time] = [0, "1:0:0"];

      const instruments = bank.instruments;
      const events = array.map((line) => ({
        line,
        instrument: instruments[line.instrument],
      }));

      return [events, interval, loopPoints];
    }
    default:
      return [[], "1n" as Time, [0, 0] as [Time, Time]];
  }
}

function linePlaybackCallback(time: any, lineEvent: LineEvent) {
  playNote(time, lineEvent);
}
