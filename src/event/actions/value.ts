import { untrack } from "solid-js/web";
import { useModel } from "../../state/model";
import { getActiveLine } from "../../state/utils";
import {
  Direction,
  Line,
  NOTES,
  OCTAVES,
  PhraseViewColumn,
  ValueDirection,
  ViewMode,
  XDirectionMap,
} from "../../types";

const { model, setModel } = useModel();

export function moveValue(direction: Direction) {
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
            const currIndex = refArray.findIndex((value) => value === oldValue);
            if (currIndex === -1) return currIndex;

            const newIndex = currIndex + direction;
            return handleIndexAtBounds(newIndex, refArray, {
              clamp: opts.clamp,
            });
          };

          const moveNoteValue = (
            key: keyof Line,
            refArray: readonly any[],
            direction: ValueDirection,
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
              model.view.active.phrase,
              "lines",
              model.view.active.line,
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
              moveNoteValue("octave", OCTAVES, XDirectionMap[direction]);
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
}
