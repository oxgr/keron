import { togglePlaybackPattern } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";

export type Action = {
  label: string;
  desc: string;
  fn: Function;
};

/**
 * All possible actions that can be carried out.
 */
export const actions: Record<string, Action> = {
  togglePlaybackPattern: {
    label: "Toggle playback",
    desc: "Toggle playback of a pattern.",
    fn: togglePlaybackPattern,
  },
  playDefaultNote: {
    label: "Play default note",
    desc: "Plays a C4 note for 8n.",
    fn: () => playNote("C4", "8n"),
  },
  playNote: {
    label: "Play note",
    desc: "Plays a single note.",
    fn: playNote,
  },
  printTime: {
    label: "",
    desc: "",
    fn: () => console.log(Tone.Transport.progress),
  },
};
