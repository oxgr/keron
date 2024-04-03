import { ParentProps } from "solid-js";
import components from "/src/ui/components/Components.module.css";
import styles from "/src/App.module.css";

export default function Column({
  text,
  active = () => false,
  children,
}: ParentProps & {
  text?: string;
  active?: () => boolean;
}) {
  const renderedText = text ? text.padStart(2, "0") : "";
  const setActiveClass = () => (active() ? styles.active : "");

  return (
    <div class={`${components.column} `}>
      <div class={`${components.columnHeader} ${setActiveClass()}`}>
        {renderedText}
      </div>
      <div class={components.columnBody}>{children}</div>
    </div>
  );
}
