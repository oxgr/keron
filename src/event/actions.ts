import { togglePlaybackPhrase } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";
import { useModel } from "../state/model";
import { Cursor, CursorMoveDirection, ViewMode, Active } from "../types";
import { untrack } from "solid-js/web";
import { getActiveTrack } from "../state/utils";

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
  togglePlaybackPhrase: {
    label: "Toggle playback",
    desc: "Toggle playback of a phrase.",
    fn: togglePlaybackPhrase,
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
  moveCursorLeft: {
    label: "Move cursor left",
    desc: "Move the cursor to the left",
    fn: () => moveCursor(CursorMoveDirection.Left),
  },
  moveCursorRight: {
    label: "Move cursor Right",
    desc: "Move the cursor to the Right",
    fn: () => moveCursor(CursorMoveDirection.Right),
  },
  moveCursorUp: {
    label: "Move cursor Up",
    desc: "Move the cursor to the Up",
    fn: () => moveCursor(CursorMoveDirection.Up),
  },
  moveCursorDown: {
    label: "Move cursor Down",
    desc: "Move the cursor to the Down",
    fn: () => moveCursor(CursorMoveDirection.Down),
  },
};

function moveCursor(direction: CursorMoveDirection) {
  const axis =
    direction == CursorMoveDirection.Up || direction == CursorMoveDirection.Down
      ? "line"
      : "column";

  const updatePos = (currPos: number, direction: CursorMoveDirection) => {
    const newPos =
      direction == CursorMoveDirection.Up ||
      direction == CursorMoveDirection.Left
        ? currPos - 1
        : currPos + 1;

    return newPos;
  };

  const newPos = () => updatePos(model.view.cursor[axis], direction);

  setModel("view", "cursor", axis, untrack(newPos));

  const updateActiveModel = (prop: keyof Active, value: any) => {
    // if (!value) return;
    setModel(
      "project",
      "active",
      prop,
      untrack(() => value),
    );
  };

  switch (model.view.mode) {
    case ViewMode.Settings:
    case ViewMode.Project:
    case ViewMode.Song:
      if (axis == "column")
        updateActiveModel("track", model.view.cursor.column);
      const newChain = getActiveTrack()?.chains?.[model.view.cursor.line] ?? 0;
      updateActiveModel("chain", newChain);
      break;

    case ViewMode.Chain:
      if (axis == "line") updateActiveModel("phrase", model.view.cursor.line);
      if (axis == "column") updateActiveModel("track", model.view.cursor.line);
      break;

    case ViewMode.Phrase:
      if (axis == "line") updateActiveModel("line", model.view.cursor.line);
      // if (axis == "column") alterActiveModel("track", model.view.cursor.line);
      break;

    case ViewMode.Instrument:
    case ViewMode.Table:
  }
}

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
