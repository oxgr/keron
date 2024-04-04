import { togglePlaybackPhrase } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";
import { useModel } from "../state/model";
import { Direction, ValueDirection } from "../types";
import { moveCursor } from "./actions/cursor";
import { moveValue } from "./actions/value";
import { moveViewMode } from "./actions/view";

export type Action = {
  label: string;
  desc: string;
  fn: Function;
};

const { model, setModel } = useModel();

/**
 * All possible actions that can be carried out.
 */
export const actions: Record<string, Action> = {
  printTime: {
    label: "",
    desc: "",
    fn: () => console.log(Tone.Transport.progress),
  },
  prevViewMode: {
    label: "Previous view",
    desc: "Switch to the previous view mode.",
    fn: () => moveViewMode(ValueDirection.Down),
  },
  nextViewMode: {
    label: "Next view",
    desc: "Switch to the next view mode.",
    fn: () => moveViewMode(ValueDirection.Up),
  },
  playDefaultNote: {
    label: "Play default note",
    desc: "Plays a C4 note for 8n.",
    fn: () =>
      playNote({
        note: "C4",
        duration: "8n",
        time: Tone.Transport.now(),
        velocity: 100,
        instrument: { id: 1, table: {} },
      }),
  },
  playNote: {
    label: "Play note",
    desc: "Plays a single note.",
    fn: playNote,
  },
  togglePlaybackPhrase: {
    label: "Toggle playback",
    desc: "Toggle playback of a phrase.",
    fn: togglePlaybackPhrase,
  },
  moveCursorLeft: {
    label: "Move cursor left",
    desc: "Move the cursor to the left",
    fn: () => moveCursor(Direction.Left),
  },
  moveCursorRight: {
    label: "Move cursor Right",
    desc: "Move the cursor to the Right",
    fn: () => moveCursor(Direction.Right),
  },
  moveCursorUp: {
    label: "Move cursor Up",
    desc: "Move the cursor to the Up",
    fn: () => moveCursor(Direction.Up),
  },
  moveCursorDown: {
    label: "Move cursor Down",
    desc: "Move the cursor to the Down",
    fn: () => moveCursor(Direction.Down),
  },
  moveValueDown: {
    label: "Move value down",
    desc: "Move the active value down.",
    fn: () => moveValue(Direction.Down),
  },
  moveValueUp: {
    label: "Move value up",
    desc: "Move the active value up.",
    fn: () => moveValue(Direction.Up),
  },
  moveValueLeft: {
    label: "Move value Left",
    desc: "Move the active value Left.",
    fn: () => moveValue(Direction.Left),
  },
  moveValueRight: {
    label: "Move value Right",
    desc: "Move the active value Right.",
    fn: () => moveValue(Direction.Right),
  },
};
