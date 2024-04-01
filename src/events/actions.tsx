import { playNote } from "../audio/synth";

export type Action = {
  label: string;
  desc: string;
  fn: Function;
};

export const actions: Record<string, Action> = {
  playNote: {
    label: "Play note",
    desc: "Plays a single note.",
    fn: playNote,
  },
};
