import { produce } from "solid-js/store";
import { untrack } from "solid-js/web";
import { getEnumValues } from "../../ui/views/utils";
import { useModel } from "../../state/ModelProvider";
import { ValueDirection, ViewMode } from "../../types";

const { model, setModel } = useModel();

export function moveViewMode(direction: ValueDirection) {
  setViewMode(() => model.view.mode + direction);
}

export function setViewMode(index: () => number) {
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
