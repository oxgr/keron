import { togglePlaybackPattern } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";
import { useModel } from "../state/model";
import { CursorMoveDirection, ViewMode } from "../types";
import { untrack } from "solid-js/web";

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
  togglePlaybackPattern: {
    label: "Toggle playback",
    desc: "Toggle playback of a pattern.",
    fn: togglePlaybackPattern,
  },
  playDefaultNote: {
    label: "Play default note",
    desc: "Plays a C4 note for 8n.",
    fn: () => playNote("C4", "8n", Tone.Transport.now()),
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
  prevViewMode: {
    label: "Previous view",
    desc: "Switch to the previous view mode.",
    fn: prevViewMode,
  },
  nextViewMode: {
    label: "Next view",
    desc: "Switch to the next view mode.",
    fn: nextViewMode,
  },
};

// function moveCursor(direction: CursorMoveDirection) {
//   const track = ( direction == CursorMoveDirection.Up || direction == CursorMoveDirection.Down ) ? "lines" : "columns"
//   const current = () => model.view.cursor
//
//   setModel(
//     "view",
//     "cursor",
//     untrack(() => model.view.cursor[target]),
//   );
// }

function prevViewMode() {
  setModel(
    "view",
    "mode",
    untrack(() => model.view.mode - 1),
  );
}

function nextViewMode() {
  setModel(
    "view",
    "mode",
    untrack(() => model.view.mode + 1),
  );
}
