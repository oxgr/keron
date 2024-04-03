import { ParentProps } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";
import Block from "./Block";

export default function Column({
  headerText = "",
  headerPad = 2,
  active = () => false,
  children,
}: ParentProps & {
  headerText?: string;
  headerPad?: number;
  active?: () => boolean;
}) {
  const setActiveColumnClass = () => (active() ? components.activeColumn : "");

  return (
    <div class={`${components.column} ${setActiveColumnClass()}`}>
      <div class={`${components.columnHeader}`}>
        <Block
          text={headerText}
          pad={headerPad}
          activeColumn={active}
          // activeLine={() => true}
        ></Block>
      </div>
      <div class={components.columnBody}>{children}</div>
    </div>
  );
}
