import { togglePlaybackPhrase } from "../audio/transport";
import { playNote } from "../audio/synth";
import * as Tone from "tone";
import { useModel } from "../state/model";
import {
  Cursor,
  Direction,
  ViewMode,
  Active,
  PhraseViewColumn,
  NOTES,
  OCTAVES,
  Line,
  InlineDirection,
} from "../types";
import { untrack } from "solid-js/web";
import {
  getActiveChain,
  getActiveLine,
  getActivePhrase,
  getActiveTrack,
} from "../state/utils";
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

function moveCursor(direction: Direction) {
  const axis =
    direction == Direction.Up || direction == Direction.Down
      ? "line"
      : "column";

  const getNewPos = (currPos: number, direction: Direction) => {
    const newPos =
      direction == Direction.Up || direction == Direction.Left
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

function moveValue(direction: Direction) {
  const activeValue = (() => {
    switch (model.view.mode) {
      case ViewMode.Configuration:
      case ViewMode.Project:
      case ViewMode.Song:
      case ViewMode.Chain:
        break;

      case ViewMode.Phrase:
        switch (model.view.cursor.column) {
          case PhraseViewColumn.Note:
            /**
             * @returns 0 if index is in bounds, -1 if under, 1 if over
             */
            const indexDirectionAtBounds = (
              index: number,
              array: readonly any[],
            ): Direction => {
              if (index < 0) return Direction.Down;
              if (index >= array.length) return Direction.Up;
              return Direction.Neutral;
            };

            /**
             * Round robins index if it reaches the bounds of the array or clamps it instead if `clamp` is true.
             *
             * @returns the index if within bounds, index at opposite bound if exceeds them.
             */
            const handleIndexAtBounds = (
              index: number,
              array: readonly any[],
              opts = { clamp: false },
            ) => {
              const dirAtBounds = indexDirectionAtBounds(index, array);
              if (dirAtBounds == Direction.Down)
                return opts.clamp ? 0 : array.length - 1;
              if (dirAtBounds == Direction.Up)
                return opts.clamp ? array.length - 1 : 0;
              return index;
            };

            /**
             * @returns new index or -1 if `oldValue` does not exist in refArray
             */
            const newIndexFromRefArray = (
              oldValue: any,
              refArray: readonly (typeof oldValue)[],
              direction: Direction,
              opts = { clamp: false },
            ): number => {
              const currIndex = refArray.findIndex(
                (value) => value === oldValue,
              );
              if (currIndex === -1) return currIndex;

              const newIndex = currIndex + direction;
              return handleIndexAtBounds(newIndex, refArray, {
                clamp: opts.clamp,
              });
            };

            const moveNoteValue = (
              key: keyof Line,
              refArray: readonly any[],
              direction: Direction,
            ) => {
              const oldValue = untrack(() => getActiveLine()[key]);

              const newIndex = newIndexFromRefArray(
                oldValue,
                refArray,
                direction,
              );

              setModel(
                "project",
                "bank",
                "phrases",
                model.project.active.phrase,
                "lines",
                model.project.active.line,
                key,
                refArray[newIndex],
              );
            };

            switch (direction) {
              case Direction.Up:
              case Direction.Down:
                moveNoteValue("note", NOTES, direction);
                break;

              case Direction.Left:
              case Direction.Right:
                moveNoteValue("octave", OCTAVES, InlineDirection[direction]);
                break;
            }

            break;
          case PhraseViewColumn.Velocity:
          case PhraseViewColumn.Instrument:
          case PhraseViewColumn.FX1:
          case PhraseViewColumn.FX2:
          case PhraseViewColumn.FX3:
        }
        break;

      case ViewMode.Instrument:
      case ViewMode.Table:
        break;
    }
  })();
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
