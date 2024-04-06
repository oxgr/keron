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
      let newValue,
        key: keyof Line = "note";

      switch (model.view.cursor.column) {
        case PhraseViewColumn.Note:
          switch (direction) {
            case Direction.Up:
            case Direction.Down:
              (() => {
                key = "note";
                const oldValue = untrack(() => getActiveLine()[key]);
                newValue = newValueFromRefArray(oldValue, NOTES, direction);
              })();
              break;

            case Direction.Left:
            case Direction.Right:
              (() => {
                key = "octave";
                const oldValue = untrack(() => getActiveLine()[key]);
                newValue = newValueFromRefArray(
                  oldValue,
                  OCTAVES,
                  XDirectionMap[direction],
                );
              })();
              break;
          }
          break;
        case PhraseViewColumn.Velocity:
          (() => {
            key = "velocity";
            const oldValue =
              (untrack(() => getActiveLine()[key]) as number) ?? 0;
            const VELOCITY_RANGE = 127;
            enum ChangeRate {
              Low = 1,
              High = 8,
            }
            let op = 0;
            switch (direction) {
              case Direction.Up:
                op = +ChangeRate.Low;
                break;
              case Direction.Down:
                op = -ChangeRate.Low;
                break;
              case Direction.Right:
                op = +ChangeRate.High;
                break;
              case Direction.Left:
                op = -ChangeRate.High;
                break;
            }
            const rawValue = clamp(oldValue + op, -1, VELOCITY_RANGE);
            newValue = rawValue === -1 ? undefined : rawValue;
          })();
          break;
        case PhraseViewColumn.Instrument:
          (() => {
            key = "instrument";
            const oldValue =
              (untrack(() => getActiveLine()[key]) as number) ?? 0;
            const range = model.project.bank.instruments.length;
            enum ChangeRate {
              Low = 1,
              High = 2,
            }
            let op = 0;
            switch (direction) {
              case Direction.Up:
                op = +ChangeRate.Low;
                break;
              case Direction.Down:
                op = -ChangeRate.Low;
                break;
              case Direction.Right:
                op = +ChangeRate.High;
                break;
              case Direction.Left:
                op = -ChangeRate.High;
                break;
            }
            const rawValue = clamp(oldValue + op, -1, range);
            newValue = rawValue === -1 ? undefined : rawValue;
          })();
          break;
        case PhraseViewColumn.FX1:
        case PhraseViewColumn.FX2:
        case PhraseViewColumn.FX3:
        default:
          return;
      }

      setModel(
        "project",
        "bank",
        "phrases",
        model.view.active.phrase,
        "lines",
        model.view.active.line,
        key,
        newValue,
      );
      break;

    case ViewMode.Instrument:
    case ViewMode.Table:
      break;
  }
}

function clamp(val: number, low: number, high: number): number {
  return Math.min(Math.max(val, low), high);
}

/**
 * @returns 0 if index is in bounds, -1 if under, 1 if over
 */
function indexDirectionAtBounds(
  index: number,
  array: readonly any[],
): Direction {
  if (index < 0) return Direction.Down;
  if (index >= array.length) return Direction.Up;
  return Direction.Neutral;
}

/**
 * Round robins index if it reaches the bounds of the array or clamps it instead if `clamp` is true.
 *
 * @returns the index if within bounds, index at opposite bound if exceeds them.
 */
function handleIndexAtBounds(
  index: number,
  array: readonly any[],
  opts: IndexFnOpts = {
    clamp: true,
    undefAllowed: false,
  },
) {
  const dirAtBounds = indexDirectionAtBounds(index, array);
  if (dirAtBounds == Direction.Down)
    return opts.undefAllowed ? -1 : opts.clamp ? 0 : array.length - 1;
  if (dirAtBounds == Direction.Up) return opts.clamp ? array.length - 1 : 0;
  return index;
}

type IndexFnOpts = { clamp?: boolean; undefAllowed?: boolean };

/**
 * @returns new index or -1 if `oldValue` does not exist in refArray
 */
function newIndexFromRefArray(
  oldValue: any,
  refArray: readonly (typeof oldValue)[],
  direction: Direction,
  opts: IndexFnOpts = { clamp: true, undefAllowed: false },
): number {
  const currIndex = refArray.findIndex((value) => value === oldValue);
  if (currIndex === -1 && direction === Direction.Down) return currIndex;

  const newIndex = currIndex + direction;
  return handleIndexAtBounds(newIndex, refArray, opts);
}

function newValueFromRefArray(
  oldValue: any,
  refArray: readonly any[],
  direction: ValueDirection,
): typeof oldValue | undefined {
  const newIndex = newIndexFromRefArray(oldValue, refArray, direction, {
    clamp: true,
    undefAllowed: true,
  });
  const newValue = refArray[newIndex];
  return newValue;
}
