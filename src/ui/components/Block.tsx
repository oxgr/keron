import components from "/src/ui/components/Components.module.css";
import { emptyBlockString } from "../views/utils";

export default function Block({
  text = "",
  activeLine = () => false,
  playheadLine = () => false,
  activeColumn = () => false,
  pad = 2,
  empty = false,
}: {
  text?: string | number | null;
  activeLine?: () => boolean;
  playheadLine?: () => boolean;
  activeColumn?: () => boolean;
  pad?: number;
  empty?: boolean;
}) {
  const renderedText = (() => {
    if (text == null) return emptyBlockString(pad);
    if (typeof text !== "string") text = text.toString();
    return text.padStart(pad, "0");
  })();

  const condClassFn =
    (cond: () => boolean, cssClass: CSSModuleClasses[string]) => () =>
      cond() ? cssClass : "";

  const setEmptyClass = condClassFn(() => empty, components.empty);
  const setActiveLineClass = condClassFn(activeLine, components.activeLine);
  const setPlayheadLineClass = condClassFn(
    playheadLine,
    components.playheadLine,
  );
  const setActiveColumnClass = condClassFn(
    activeColumn,
    components.activeColumn,
  );

  return (
    <div
      class={`${components.block}  ${setEmptyClass()} ${setActiveLineClass()} ${setPlayheadLineClass()} ${setActiveColumnClass()}`}
    >
      {renderedText}
    </div>
  );
}
