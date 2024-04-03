import { ParentProps } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";
import Block from "./Block";

export default function Column({
  text,
  active = () => false,
  children,
}: ParentProps & {
  text?: string;
  active?: () => boolean;
}) {
  const renderedText = text ? text.padStart(2, "0") : "";
  const setActiveColumnClass = () => (active() ? components.activeColumn : "");

  return (
    <div class={`${components.column} ${setActiveColumnClass()}`}>
      <div class={`${components.columnHeader}`}>
        <Block
          text={renderedText}
          activeColumn={active}
          // activeLine={() => true}
        ></Block>
      </div>
      <div class={components.columnBody}>{children}</div>
    </div>
  );
}
