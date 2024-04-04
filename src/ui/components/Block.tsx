import components from "/src/ui/components/Components.module.css";
import { emptyBlockString } from "../views/utils";

export default function Block({
  text = "",
  activeLine = () => false,
  activeColumn = () => false,
  pad = 2,
  empty = false,
}: {
  text?: string | null;
  activeLine?: () => boolean;
  activeColumn?: () => boolean;
  pad?: number;
  empty?: boolean;
}) {
  const renderedText = text?.padStart(pad, "0") ?? emptyBlockString(pad);
  const setActiveLineClass = () => (activeLine() ? components.activeLine : "");
  const setActiveColumnClass = () =>
    activeColumn() ? components.activeColumn : "";
  const setEmptyClass = () => (empty ? components.empty : "");

  return (
    <div
      class={`${components.block} ${setEmptyClass()} ${setActiveLineClass()} ${setActiveColumnClass()}`}
    >
      {renderedText}
    </div>
  );
}
