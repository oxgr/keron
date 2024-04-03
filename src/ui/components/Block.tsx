import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";
import { emptyBlockString } from "../views/utils";

export default function Block({
  text = "",
  activeLine = () => false,
  activeColumn = () => false,
  pad = 2,
}: {
  text?: string | null;
  activeLine?: () => boolean;
  activeColumn?: () => boolean;
  pad?: number;
}) {
  const renderedText = text?.padStart(pad, "0") ?? emptyBlockString(pad);
  const setActiveLineClass = () => (activeLine() ? components.activeLine : "");
  const setActiveColumnClass = () =>
    activeColumn() ? components.activeColumn : "";

  return (
    <div
      class={`${components.block} ${setActiveLineClass()} ${setActiveColumnClass()}`}
    >
      {renderedText}
    </div>
  );
}
