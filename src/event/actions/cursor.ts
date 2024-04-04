import { untrack } from "solid-js/web";
import { useModel } from "../../state/model";
import { getActiveChain, getActiveTrack } from "../../state/utils";
import { Active, Direction, ViewMode } from "../../types";

const { model, setModel } = useModel();

export function moveCursor(direction: Direction) {
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
      "view",
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
