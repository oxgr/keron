import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";

export default function Block({
  text,
  activeLine = () => false,
  activeColumn = () => false,
}: {
  text: string;
  activeLine?: () => boolean;
  activeColumn?: () => boolean;
}) {
  const renderedText = text.padStart(2, "0");
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
