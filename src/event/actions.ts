import { togglePlaybackPhrase } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";
import { useModel } from "../state/model";
import { Cursor, CursorMoveDirection, ViewMode, Active } from "../types";
import { untrack } from "solid-js/web";
import { getActiveChain, getActiveTrack } from "../state/utils";
import { produce } from "solid-js/store";
import { getEnumValues } from "../ui/views/utils";

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
    fn: prevViewMode,
  },
  nextViewMode: {
    label: "Next view",
    desc: "Switch to the next view mode.",
    fn: nextViewMode,
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

  const getNewPos = (currPos: number, direction: CursorMoveDirection) => {
    const newPos =
      direction == CursorMoveDirection.Up ||
      direction == CursorMoveDirection.Left
        ? currPos - 1
        : currPos + 1;

    return newPos;
  };

  const updatePos = () => getNewPos(model.view.cursor[axis], direction);

  //dont update model if cursor pos is outside bounds
  const LINE_BOUNDS = 16;
  const COLUMN_BOUNDS = 8;
  const newPos = untrack(updatePos);
  if (
    newPos >= 0 &&
    ((axis == "line" && newPos < LINE_BOUNDS) ||
      (axis == "column" && newPos < COLUMN_BOUNDS))
  ) {
    setModel("view", "cursor", axis, newPos);
  }

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
    case ViewMode.Configuration:
    case ViewMode.Project:
    case ViewMode.Song:
      if (axis == "column")
        updateActiveModel("track", model.view.cursor.column);
      const newChain = getActiveTrack()?.chains?.[model.view.cursor.line] ?? 0;
      updateActiveModel("chain", newChain);
      break;

    case ViewMode.Chain:
      if (axis == "line")
        updateActiveModel(
          "phrase",
          getActiveChain()?.phrases?.[model.view.cursor.line] ?? 0,
        );
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

function setViewMode(index: () => number) {
  setModel(
    "view",
    produce((view) => {
      const givenIndex = untrack(index);
      const viewModeValues = getEnumValues(ViewMode);
      // round-robin value when we get to the edge

      const newIndex =
        givenIndex < 0
          ? viewModeValues.at(-1)
          : givenIndex > viewModeValues.at(-1)
            ? 0
            : givenIndex;
      view.mode = newIndex;
      // TODO: set this to a previously remembered cursor position per view
      view.cursor.line = 0;
      view.cursor.column = 0;
    }),
  );
}

function prevViewMode() {
  setViewMode(() => model.view.mode - 1);
}

function nextViewMode() {
  setViewMode(() => model.view.mode + 1);
}
